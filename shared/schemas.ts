import { z } from 'zod';

// ==========================================
// 1. Zod Enums & Type Extraction
// ==========================================
export const JobStatusSchema = z.enum([
  'WISHLIST',
  'APPLIED',
  'OA_TEST',
  'INTERVIEW_HR',
  'INTERVIEW_USER',
  'OFFERING',
  'ACCEPTED',
  'REJECTED',
  'GHOSTED',
]);
export type JobStatus = z.infer<typeof JobStatusSchema>;

export const JobTypeSchema = z.enum([
  'FULL_TIME',
  'CONTRACT',
  'PART_TIME',
  'FREELANCE',
  'INTERNSHIP',
]);
export type JobType = z.infer<typeof JobTypeSchema>;

export const WorkModeSchema = z.enum([
  'REMOTE',
  'HYBRID',
  'ONSITE',
]);
export type WorkMode = z.infer<typeof WorkModeSchema>;

export const PrioritySchema = z.enum([
  'LOW',
  'MEDIUM',
  'HIGH',
]);
export type Priority = z.infer<typeof PrioritySchema>;

// ==========================================
// 2. Base Shape for Job Application DTO
// ==========================================
const baseJobShape = {
  companyName: z.string().min(1, 'Nama perusahaan wajib diisi'),
  roleTitle: z.string().min(1, 'Posisi/Jabatan wajib diisi'),
  jobType: JobTypeSchema,
  workMode: WorkModeSchema,
  location: z.string().nullable().optional(),
  status: JobStatusSchema.default('APPLIED'),
  priority: PrioritySchema.default('MEDIUM'),
  salaryMin: z.number().nullable().optional(),
  salaryMax: z.number().nullable().optional(),
  currency: z.string().default('IDR'),
  jobUrl: z.string().url('URL lowongan tidak valid').or(z.literal('')).nullable().optional(),
  cvVersion: z.string().nullable().optional(),
  appliedDate: z.string().nullable().optional(),
  followUpDate: z.string().nullable().optional(),
  contactPerson: z.string().nullable().optional(),
  contactChannel: z.string().nullable().optional(),
  notes: z.string().nullable().optional(),
};

// ==========================================
// 3. Payload Validation Schemas (DTOs)
// ==========================================
export const CreateJobSchema = z.object(baseJobShape).refine(
  (data) => {
    if (data.salaryMin != null && data.salaryMax != null) {
      return data.salaryMax >= data.salaryMin;
    }
    return true;
  },
  {
    message: 'Gaji maksimal harus lebih besar atau sama dengan gaji minimal',
    path: ['salaryMax'],
  }
);
export type CreateJobDTO = z.infer<typeof CreateJobSchema>;

export const UpdateJobSchema = z.object({
  companyName: z.string().min(1).optional(),
  roleTitle: z.string().min(1).optional(),
  jobType: JobTypeSchema.optional(),
  workMode: WorkModeSchema.optional(),
  location: z.string().nullable().optional(),
  status: JobStatusSchema.optional(),
  priority: PrioritySchema.optional(),
  salaryMin: z.number().nullable().optional(),
  salaryMax: z.number().nullable().optional(),
  currency: z.string().optional(),
  jobUrl: z.string().url().or(z.literal('')).nullable().optional(),
  cvVersion: z.string().nullable().optional(),
  appliedDate: z.string().nullable().optional(),
  followUpDate: z.string().nullable().optional(),
  contactPerson: z.string().nullable().optional(),
  contactChannel: z.string().nullable().optional(),
  notes: z.string().nullable().optional(),
  positionOrder: z.number().int().min(0).optional(),
}).refine(
  (data) => {
    if (data.salaryMin != null && data.salaryMax != null) {
      return data.salaryMax >= data.salaryMin;
    }
    return true;
  },
  {
    message: 'Gaji maksimal harus lebih besar atau sama dengan gaji minimal',
    path: ['salaryMax'],
  }
);
export type UpdateJobDTO = z.infer<typeof UpdateJobSchema>;

export const MoveJobSchema = z.object({
  toStatus: JobStatusSchema,
  positionOrder: z.number().int().min(0),
  note: z.string().optional(),
});
export type MoveJobDTO = z.infer<typeof MoveJobSchema>;

export const CreateTimelineNoteSchema = z.object({
  note: z.string().min(1, 'Catatan timeline tidak boleh kosong'),
});
export type CreateTimelineNoteDTO = z.infer<typeof CreateTimelineNoteSchema>;

export const JobFilterQuerySchema = z.object({
  search: z.string().optional(),
  status: JobStatusSchema.optional(),
  workMode: WorkModeSchema.optional(),
  jobType: JobTypeSchema.optional(),
  priority: PrioritySchema.optional(),
});
export type JobFilterQueryDTO = z.infer<typeof JobFilterQuerySchema>;
