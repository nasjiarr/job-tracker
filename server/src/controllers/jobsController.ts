import { Request, Response } from 'express';
import prisma from '../prisma';
import {
  CreateJobDTO,
  UpdateJobDTO,
  MoveJobDTO,
  CreateTimelineNoteDTO,
  JobFilterQueryDTO,
} from '@shared/schemas';
import {
  JobApplicationDTO,
  ApplicationTimelineDTO,
  JobsListResponseDTO,
  DashboardMetricsDTO,
  ApiResponse,
  JobStatus,
  JobType,
  WorkMode,
  Priority,
} from '@shared/types';
import { Prisma } from '@prisma/client';

type PrismaJobWithTimelines = Prisma.JobApplicationGetPayload<{
  include: { timelines: true };
}>;

const mapTimelineToDTO = (timeline: {
  id: number;
  jobApplicationId: number;
  fromStatus: string | null;
  toStatus: string;
  note: string | null;
  eventDate: Date;
}): ApplicationTimelineDTO => ({
  id: timeline.id,
  jobApplicationId: timeline.jobApplicationId,
  fromStatus: timeline.fromStatus as JobStatus | null,
  toStatus: timeline.toStatus as JobStatus,
  note: timeline.note,
  eventDate: timeline.eventDate.toISOString(),
});

const mapJobToDTO = (job: PrismaJobWithTimelines): JobApplicationDTO => ({
  id: job.id,
  companyName: job.companyName,
  roleTitle: job.roleTitle,
  jobType: job.jobType as JobType,
  workMode: job.workMode as WorkMode,
  location: job.location,
  status: job.status as JobStatus,
  priority: job.priority as Priority,
  salaryMin: job.salaryMin,
  salaryMax: job.salaryMax,
  currency: job.currency,
  jobUrl: job.jobUrl,
  cvVersion: job.cvVersion,
  appliedDate: job.appliedDate ? job.appliedDate.toISOString() : null,
  followUpDate: job.followUpDate ? job.followUpDate.toISOString() : null,
  contactPerson: job.contactPerson,
  contactChannel: job.contactChannel,
  notes: job.notes,
  positionOrder: job.positionOrder,
  createdAt: job.createdAt.toISOString(),
  updatedAt: job.updatedAt.toISOString(),
  timelines: job.timelines ? job.timelines.map(mapTimelineToDTO) : [],
});

export const getJobs = async (
  req: Request<Record<string, never>, ApiResponse<JobsListResponseDTO>, never, JobFilterQueryDTO>,
  res: Response<ApiResponse<JobsListResponseDTO>>
): Promise<void> => {
  try {
    const { search, status, workMode, jobType, priority } = req.query;

    const where: Prisma.JobApplicationWhereInput = {};

    if (status) {
      where.status = status;
    }
    if (workMode) {
      where.workMode = workMode;
    }
    if (jobType) {
      where.jobType = jobType;
    }
    if (priority) {
      where.priority = priority;
    }
    if (search && search.trim() !== '') {
      const trimmed = search.trim();
      where.OR = [
        { companyName: { contains: trimmed } },
        { roleTitle: { contains: trimmed } },
        { location: { contains: trimmed } },
      ];
    }

    // Ambil data jobs yang terfilter
    const jobs = await prisma.jobApplication.findMany({
      where,
      orderBy: [
        { positionOrder: 'asc' },
        { updatedAt: 'desc' },
      ],
      include: {
        timelines: {
          orderBy: { eventDate: 'desc' },
        },
      },
    });

    // Hitung Dashboard Metrics di level global/seluruh database
    const allJobs = await prisma.jobApplication.findMany({
      include: {
        timelines: true,
      },
    });

    const activeStatuses: JobStatus[] = ['WISHLIST', 'APPLIED', 'OA_TEST', 'INTERVIEW_HR', 'INTERVIEW_USER', 'OFFERING'];
    const totalActive = allJobs.filter((j) => activeStatuses.includes(j.status as JobStatus)).length;

    // Interview rate: berapa % dari yang sudah diaplikasikan (bukan wishlist) mencapai interview/offer/accepted
    const appliedJobs = allJobs.filter((j) => j.status !== 'WISHLIST');
    const interviewJobs = appliedJobs.filter((j) => {
      const reachedStatus: JobStatus[] = ['INTERVIEW_HR', 'INTERVIEW_USER', 'OFFERING', 'ACCEPTED'];
      const hasReachedInCurrent = reachedStatus.includes(j.status as JobStatus);
      const hasReachedInTimeline = j.timelines.some((t) =>
        ['INTERVIEW_HR', 'INTERVIEW_USER', 'OFFERING', 'ACCEPTED'].includes(t.toStatus)
      );
      return hasReachedInCurrent || hasReachedInTimeline;
    });

    const interviewRate = appliedJobs.length > 0
      ? Math.round((interviewJobs.length / appliedJobs.length) * 1000) / 10
      : 0;

    // Pending follow-ups: active jobs dengan followUpDate <= akhir hari ini
    const endOfToday = new Date();
    endOfToday.setHours(23, 59, 59, 999);

    const pendingFollowUps = allJobs.filter((j) => {
      if (!activeStatuses.includes(j.status as JobStatus)) return false;
      if (!j.followUpDate) return false;
      return new Date(j.followUpDate) <= endOfToday;
    }).length;

    const offeringsCount = allJobs.filter((j) => ['OFFERING', 'ACCEPTED'].includes(j.status)).length;

    const metrics: DashboardMetricsDTO = {
      totalActive,
      interviewRate,
      pendingFollowUps,
      offeringsCount,
    };

    res.json({
      success: true,
      data: {
        jobs: jobs.map(mapJobToDTO),
        metrics,
      },
    });
  } catch (error) {
    console.error('Error in getJobs:', error);
    res.status(500).json({
      success: false,
      message: 'Gagal mengambil data lowongan pekerjaan',
      data: { jobs: [], metrics: { totalActive: 0, interviewRate: 0, pendingFollowUps: 0, offeringsCount: 0 } },
    });
  }
};

export const getJobById = async (
  req: Request<{ id: string }, ApiResponse<JobApplicationDTO | null>>,
  res: Response<ApiResponse<JobApplicationDTO | null>>
): Promise<void> => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      res.status(400).json({
        success: false,
        message: 'ID lowongan tidak valid',
        data: null,
      });
      return;
    }

    const job = await prisma.jobApplication.findUnique({
      where: { id },
      include: {
        timelines: {
          orderBy: { eventDate: 'desc' },
        },
      },
    });

    if (!job) {
      res.status(404).json({
        success: false,
        message: 'Data lamaran pekerjaan tidak ditemukan',
        data: null,
      });
      return;
    }

    res.json({
      success: true,
      data: mapJobToDTO(job),
    });
  } catch (error) {
    console.error('Error in getJobById:', error);
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan pada server',
      data: null,
    });
  }
};

export const createJob = async (
  req: Request<Record<string, never>, ApiResponse<JobApplicationDTO>, CreateJobDTO>,
  res: Response<ApiResponse<JobApplicationDTO>>
): Promise<void> => {
  try {
    const body = req.body;

    const result = await prisma.$transaction(async (tx) => {
      // Hitung positionOrder tertinggi pada status tersebut
      const highestOrder = await tx.jobApplication.aggregate({
        where: { status: body.status },
        _max: { positionOrder: true },
      });
      const positionOrder = (highestOrder._max.positionOrder ?? -1) + 1;

      const created = await tx.jobApplication.create({
        data: {
          companyName: body.companyName,
          roleTitle: body.roleTitle,
          jobType: body.jobType,
          workMode: body.workMode,
          location: body.location ?? null,
          status: body.status,
          priority: body.priority,
          salaryMin: body.salaryMin ?? null,
          salaryMax: body.salaryMax ?? null,
          currency: body.currency || 'IDR',
          jobUrl: body.jobUrl ?? null,
          cvVersion: body.cvVersion ?? null,
          appliedDate: body.appliedDate ? new Date(body.appliedDate) : null,
          followUpDate: body.followUpDate ? new Date(body.followUpDate) : null,
          contactPerson: body.contactPerson ?? null,
          contactChannel: body.contactChannel ?? null,
          notes: body.notes ?? null,
          positionOrder,
          timelines: {
            create: {
              fromStatus: null,
              toStatus: body.status,
              note: body.notes ? `Lamaran dibuat: ${body.notes}` : 'Lamaran pekerjaan baru ditambahkan ke tracker',
              eventDate: new Date(),
            },
          },
        },
        include: {
          timelines: {
            orderBy: { eventDate: 'desc' },
          },
        },
      });

      return created;
    });

    res.status(201).json({
      success: true,
      message: 'Lamaran pekerjaan berhasil dibuat',
      data: mapJobToDTO(result),
    });
  } catch (error) {
    console.error('Error in createJob:', error);
    res.status(500).json({
      success: false,
      message: 'Gagal membuat data lamaran pekerjaan',
      data: null as never,
    });
  }
};

export const updateJob = async (
  req: Request<{ id: string }, ApiResponse<JobApplicationDTO>, UpdateJobDTO>,
  res: Response<ApiResponse<JobApplicationDTO>>
): Promise<void> => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      res.status(400).json({
        success: false,
        message: 'ID lowongan tidak valid',
        data: null as never,
      });
      return;
    }

    const existing = await prisma.jobApplication.findUnique({
      where: { id },
      include: { timelines: true },
    });

    if (!existing) {
      res.status(404).json({
        success: false,
        message: 'Data lamaran pekerjaan tidak ditemukan',
        data: null as never,
      });
      return;
    }

    const body = req.body;
    const isStatusChanged = body.status && body.status !== existing.status;

    const result = await prisma.$transaction(async (tx) => {
      // Jika status berubah, hitung position order baru
      let nextPositionOrder = body.positionOrder;
      if (isStatusChanged && nextPositionOrder === undefined) {
        const highestOrder = await tx.jobApplication.aggregate({
          where: { status: body.status },
          _max: { positionOrder: true },
        });
        nextPositionOrder = (highestOrder._max.positionOrder ?? -1) + 1;
      }

      const updateData: Prisma.JobApplicationUpdateInput = {};
      if (body.companyName !== undefined) updateData.companyName = body.companyName;
      if (body.roleTitle !== undefined) updateData.roleTitle = body.roleTitle;
      if (body.jobType !== undefined) updateData.jobType = body.jobType;
      if (body.workMode !== undefined) updateData.workMode = body.workMode;
      if (body.location !== undefined) updateData.location = body.location;
      if (body.status !== undefined) updateData.status = body.status;
      if (body.priority !== undefined) updateData.priority = body.priority;
      if (body.salaryMin !== undefined) updateData.salaryMin = body.salaryMin;
      if (body.salaryMax !== undefined) updateData.salaryMax = body.salaryMax;
      if (body.currency !== undefined) updateData.currency = body.currency;
      if (body.jobUrl !== undefined) updateData.jobUrl = body.jobUrl;
      if (body.cvVersion !== undefined) updateData.cvVersion = body.cvVersion;
      if (body.appliedDate !== undefined) {
        updateData.appliedDate = body.appliedDate ? new Date(body.appliedDate) : null;
      }
      if (body.followUpDate !== undefined) {
        updateData.followUpDate = body.followUpDate ? new Date(body.followUpDate) : null;
      }
      if (body.contactPerson !== undefined) updateData.contactPerson = body.contactPerson;
      if (body.contactChannel !== undefined) updateData.contactChannel = body.contactChannel;
      if (body.notes !== undefined) updateData.notes = body.notes;
      if (nextPositionOrder !== undefined) updateData.positionOrder = nextPositionOrder;

      if (isStatusChanged) {
        await tx.applicationTimeline.create({
          data: {
            jobApplicationId: id,
            fromStatus: existing.status,
            toStatus: body.status!,
            note: body.notes ? `Status diubah: ${body.notes}` : `Status diperbarui menjadi ${body.status}`,
            eventDate: new Date(),
          },
        });
      }

      const updated = await tx.jobApplication.update({
        where: { id },
        data: updateData,
        include: {
          timelines: {
            orderBy: { eventDate: 'desc' },
          },
        },
      });

      return updated;
    });

    res.json({
      success: true,
      message: 'Lamaran pekerjaan berhasil diperbarui',
      data: mapJobToDTO(result),
    });
  } catch (error) {
    console.error('Error in updateJob:', error);
    res.status(500).json({
      success: false,
      message: 'Gagal memperbarui lamaran pekerjaan',
      data: null as never,
    });
  }
};

export const moveJob = async (
  req: Request<{ id: string }, ApiResponse<JobApplicationDTO>, MoveJobDTO>,
  res: Response<ApiResponse<JobApplicationDTO>>
): Promise<void> => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      res.status(400).json({
        success: false,
        message: 'ID lowongan tidak valid',
        data: null as never,
      });
      return;
    }

    const { toStatus, positionOrder, note } = req.body;

    const existing = await prisma.jobApplication.findUnique({
      where: { id },
    });

    if (!existing) {
      res.status(404).json({
        success: false,
        message: 'Data lamaran pekerjaan tidak ditemukan',
        data: null as never,
      });
      return;
    }

    const isStatusChanged = existing.status !== toStatus;

    const result = await prisma.$transaction(async (tx) => {
      if (isStatusChanged) {
        await tx.applicationTimeline.create({
          data: {
            jobApplicationId: id,
            fromStatus: existing.status,
            toStatus,
            note: note || `Dipindahkan dari ${existing.status} ke ${toStatus}`,
            eventDate: new Date(),
          },
        });
      }

      const updated = await tx.jobApplication.update({
        where: { id },
        data: {
          status: toStatus,
          positionOrder,
        },
        include: {
          timelines: {
            orderBy: { eventDate: 'desc' },
          },
        },
      });

      return updated;
    });

    res.json({
      success: true,
      message: `Posisi lamaran berhasil diperbarui ke ${toStatus}`,
      data: mapJobToDTO(result),
    });
  } catch (error) {
    console.error('Error in moveJob:', error);
    res.status(500).json({
      success: false,
      message: 'Gagal memindahkan posisi lamaran pekerjaan',
      data: null as never,
    });
  }
};

export const addTimelineNote = async (
  req: Request<{ id: string }, ApiResponse<ApplicationTimelineDTO>, CreateTimelineNoteDTO>,
  res: Response<ApiResponse<ApplicationTimelineDTO>>
): Promise<void> => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      res.status(400).json({
        success: false,
        message: 'ID lowongan tidak valid',
        data: null as never,
      });
      return;
    }

    const existing = await prisma.jobApplication.findUnique({
      where: { id },
    });

    if (!existing) {
      res.status(404).json({
        success: false,
        message: 'Data lamaran pekerjaan tidak ditemukan',
        data: null as never,
      });
      return;
    }

    const created = await prisma.applicationTimeline.create({
      data: {
        jobApplicationId: id,
        fromStatus: existing.status,
        toStatus: existing.status,
        note: req.body.note,
        eventDate: new Date(),
      },
    });

    res.status(201).json({
      success: true,
      message: 'Catatan timeline berhasil ditambahkan',
      data: mapTimelineToDTO(created),
    });
  } catch (error) {
    console.error('Error in addTimelineNote:', error);
    res.status(500).json({
      success: false,
      message: 'Gagal menambahkan catatan timeline',
      data: null as never,
    });
  }
};

export const deleteJob = async (
  req: Request<{ id: string }, ApiResponse<{ id: number }>>,
  res: Response<ApiResponse<{ id: number }>>
): Promise<void> => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      res.status(400).json({
        success: false,
        message: 'ID lowongan tidak valid',
        data: null as never,
      });
      return;
    }

    const existing = await prisma.jobApplication.findUnique({
      where: { id },
    });

    if (!existing) {
      res.status(404).json({
        success: false,
        message: 'Data lamaran pekerjaan tidak ditemukan',
        data: null as never,
      });
      return;
    }

    await prisma.jobApplication.delete({
      where: { id },
    });

    res.json({
      success: true,
      message: 'Lamaran pekerjaan berhasil dihapus',
      data: { id },
    });
  } catch (error) {
    console.error('Error in deleteJob:', error);
    res.status(500).json({
      success: false,
      message: 'Gagal menghapus lamaran pekerjaan',
      data: null as never,
    });
  }
};
