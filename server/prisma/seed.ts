import { PrismaClient } from '@prisma/client';
import { JobStatus, JobType, WorkMode, Priority } from '@shared/schemas';

const prisma = new PrismaClient();

interface SeedJobData {
  companyName: string;
  roleTitle: string;
  jobType: JobType;
  workMode: WorkMode;
  location: string;
  status: JobStatus;
  priority: Priority;
  salaryMin: number;
  salaryMax: number;
  currency: string;
  jobUrl: string;
  cvVersion: string;
  appliedDate: string | null;
  followUpDate: string | null;
  contactPerson: string;
  contactChannel: string;
  notes: string;
  positionOrder: number;
  timelines: Array<{
    fromStatus: JobStatus | null;
    toStatus: JobStatus;
    note: string;
    eventDate: string;
  }>;
}

const seedJobs: SeedJobData[] = [
  {
    companyName: 'Gojek (GoTo Financial)',
    roleTitle: 'Senior Frontend Engineer (React/TypeScript)',
    jobType: 'FULL_TIME',
    workMode: 'HYBRID',
    location: 'Pasaraya Blok M, Jakarta Selatan',
    status: 'INTERVIEW_USER',
    priority: 'HIGH',
    salaryMin: 28000000,
    salaryMax: 36000000,
    currency: 'IDR',
    jobUrl: 'https://careers.gojek.io/job/senior-frontend-engineer',
    cvVersion: 'CV_Senior_Frontend_v4.2.pdf',
    appliedDate: '2026-09-20T08:00:00.000Z',
    followUpDate: '2026-10-22T09:00:00.000Z',
    contactPerson: 'Sarah Anindita (Tech Recruiter)',
    contactChannel: 'LinkedIn & WhatsApp (+62 811-2345-678)',
    notes: 'Fokus pada GoPay dashboard merchant. Siapkan arsitektur micro-frontend dan state management.',
    positionOrder: 0,
    timelines: [
      {
        fromStatus: null,
        toStatus: 'WISHLIST',
        note: 'Bookmark lowongan dari postingan LinkedIn Hiring Manager',
        eventDate: '2026-09-18T10:00:00.000Z',
      },
      {
        fromStatus: 'WISHLIST',
        toStatus: 'APPLIED',
        note: 'Submit CV dan cover letter via portal Gojek Careers',
        eventDate: '2026-09-20T08:00:00.000Z',
      },
      {
        fromStatus: 'APPLIED',
        toStatus: 'OA_TEST',
        note: 'Mendapat link HackerRank 90 menit (Algoritma & DOM manipulation)',
        eventDate: '2026-09-25T14:30:00.000Z',
      },
      {
        fromStatus: 'OA_TEST',
        toStatus: 'INTERVIEW_HR',
        note: 'Screening 45 menit membahas pengalaman kerja, ekspektasi gaji, dan culture fit',
        eventDate: '2026-10-02T11:00:00.000Z',
      },
      {
        fromStatus: 'INTERVIEW_HR',
        toStatus: 'INTERVIEW_USER',
        note: 'User interview dengan VP of Engineering dan Principal Architect',
        eventDate: '2026-10-12T15:00:00.000Z',
      },
    ],
  },
  {
    companyName: 'Traveloka',
    roleTitle: 'Lead Software Engineer - Web Platform',
    jobType: 'FULL_TIME',
    workMode: 'REMOTE',
    location: 'Tangerang / Remote Indonesia',
    status: 'OFFERING',
    priority: 'HIGH',
    salaryMin: 38000000,
    salaryMax: 46000000,
    currency: 'IDR',
    jobUrl: 'https://www.traveloka.com/en-id/careers/tech/lead-web-eng',
    cvVersion: 'CV_Tech_Lead_2026.pdf',
    appliedDate: '2026-09-10T09:15:00.000Z',
    followUpDate: '2026-10-19T10:00:00.000Z',
    contactPerson: 'David Setiawan (Head of Talent Acquisition)',
    contactChannel: 'Email (recruitment@traveloka.com)',
    notes: 'Penawaran resmi sudah masuk. Review paket kompensasi + sign-on bonus + laptop MacBook M3 Max.',
    positionOrder: 0,
    timelines: [
      {
        fromStatus: null,
        toStatus: 'APPLIED',
        note: 'Direct referral melalui mantan Tech Lead Traveloka',
        eventDate: '2026-09-10T09:15:00.000Z',
      },
      {
        fromStatus: 'APPLIED',
        toStatus: 'INTERVIEW_HR',
        note: 'Introductory call dan verifikasi status notice period',
        eventDate: '2026-09-15T13:00:00.000Z',
      },
      {
        fromStatus: 'INTERVIEW_HR',
        toStatus: 'INTERVIEW_USER',
        note: 'System Design Interview: Global Booking Engine caching and CDN latency',
        eventDate: '2026-09-28T16:00:00.000Z',
      },
      {
        fromStatus: 'INTERVIEW_USER',
        toStatus: 'OFFERING',
        note: 'Menerima draft Offering Letter Rp 42.000.000/bln + RSU',
        eventDate: '2026-10-15T17:30:00.000Z',
      },
    ],
  },
  {
    companyName: 'Dana Indonesia',
    roleTitle: 'Frontend Architect',
    jobType: 'FULL_TIME',
    workMode: 'HYBRID',
    location: 'Capital Place Level 25, Jakarta Selatan',
    status: 'ACCEPTED',
    priority: 'HIGH',
    salaryMin: 42000000,
    salaryMax: 50000000,
    currency: 'IDR',
    jobUrl: 'https://dana.id/careers/engineering/frontend-architect',
    cvVersion: 'CV_Executive_Architect_2026.pdf',
    appliedDate: '2026-08-15T10:00:00.000Z',
    followUpDate: '2026-11-01T08:30:00.000Z',
    contactPerson: 'Rizki Pratama (Talent Partner)',
    contactChannel: 'WhatsApp (+62 812-9876-5432)',
    notes: 'Kontrak telah ditandatangani. Onboarding scheduled 1 November 2026.',
    positionOrder: 0,
    timelines: [
      {
        fromStatus: null,
        toStatus: 'APPLIED',
        note: 'Scouted by Headhunter via LinkedIn InMail',
        eventDate: '2026-08-15T10:00:00.000Z',
      },
      {
        fromStatus: 'APPLIED',
        toStatus: 'INTERVIEW_HR',
        note: 'Cultural fit and leadership assessment',
        eventDate: '2026-08-22T14:00:00.000Z',
      },
      {
        fromStatus: 'INTERVIEW_HR',
        toStatus: 'INTERVIEW_USER',
        note: 'Presentation session: Design system & SSR optimization strategy',
        eventDate: '2026-09-05T15:30:00.000Z',
      },
      {
        fromStatus: 'INTERVIEW_USER',
        toStatus: 'OFFERING',
        note: 'Official offer letter received with health insurance full family',
        eventDate: '2026-09-20T11:00:00.000Z',
      },
      {
        fromStatus: 'OFFERING',
        toStatus: 'ACCEPTED',
        note: 'Signed official employment contract and confirmed start date',
        eventDate: '2026-09-28T09:00:00.000Z',
      },
    ],
  },
  {
    companyName: 'Shopee Indonesia',
    roleTitle: 'Full Stack Engineer (Node.js & React)',
    jobType: 'FULL_TIME',
    workMode: 'ONSITE',
    location: 'Pacific Century Place SCBD, Jakarta',
    status: 'OA_TEST',
    priority: 'MEDIUM',
    salaryMin: 22000000,
    salaryMax: 28000000,
    currency: 'IDR',
    jobUrl: 'https://careers.shopee.co.id/job-detail/fullstack-eng',
    cvVersion: 'CV_Fullstack_TS_Node.pdf',
    appliedDate: '2026-10-05T11:30:00.000Z',
    followUpDate: '2026-10-18T17:00:00.000Z',
    contactPerson: 'Jessica Tan (Campus & Experienced Recruiter)',
    contactChannel: 'Email (jessica.tan@shopee.com)',
    notes: 'Batas akhir submission OA hari ini jam 23:59. 3 soal algoritma + 1 REST API task.',
    positionOrder: 0,
    timelines: [
      {
        fromStatus: null,
        toStatus: 'APPLIED',
        note: 'Apply lewat Shopee Careers portal',
        eventDate: '2026-10-05T11:30:00.000Z',
      },
      {
        fromStatus: 'APPLIED',
        toStatus: 'OA_TEST',
        note: 'Mendapat undangan HackerEarth assessment',
        eventDate: '2026-10-12T09:00:00.000Z',
      },
    ],
  },
  {
    companyName: 'Bank Mandiri (Livin’ Core)',
    roleTitle: 'Senior Web Developer',
    jobType: 'CONTRACT',
    workMode: 'HYBRID',
    location: 'Plaza Mandiri, Jl. Jend. Gatot Subroto, Jakarta',
    status: 'INTERVIEW_HR',
    priority: 'MEDIUM',
    salaryMin: 20000000,
    salaryMax: 26000000,
    currency: 'IDR',
    jobUrl: 'https://bankmandiri.co.id/karir',
    cvVersion: 'CV_Enterprise_Fintech.pdf',
    appliedDate: '2026-09-28T14:00:00.000Z',
    followUpDate: '2026-10-21T11:00:00.000Z',
    contactPerson: 'Agus Handoko (Vendor Talent Manager)',
    contactChannel: 'WhatsApp (+62 821-3344-5566)',
    notes: 'Proyek revitalisasi dashboard internet banking korporat. Kontrak 12 bulan extendable.',
    positionOrder: 0,
    timelines: [
      {
        fromStatus: null,
        toStatus: 'APPLIED',
        note: 'Kirim resume lewat Jobstreet',
        eventDate: '2026-09-28T14:00:00.000Z',
      },
      {
        fromStatus: 'APPLIED',
        toStatus: 'INTERVIEW_HR',
        note: 'Phone screening singkat 20 menit konfirmasi rate dan jadwal wawancara teknis',
        eventDate: '2026-10-10T10:30:00.000Z',
      },
    ],
  },
  {
    companyName: 'Xendit',
    roleTitle: 'Payments SDK Engineer',
    jobType: 'FULL_TIME',
    workMode: 'REMOTE',
    location: 'Remote Indonesia / APAC',
    status: 'INTERVIEW_USER',
    priority: 'HIGH',
    salaryMin: 32000000,
    salaryMax: 40000000,
    currency: 'IDR',
    jobUrl: 'https://www.xendit.co/en/careers/engineering/payments-sdk',
    cvVersion: 'CV_Senior_Frontend_v4.2.pdf',
    appliedDate: '2026-09-12T16:00:00.000Z',
    followUpDate: '2026-10-23T14:00:00.000Z',
    contactPerson: 'Melissa Wong (Regional Recruiter)',
    contactChannel: 'Email (melissa.wong@xendit.co)',
    notes: 'Take-home SDK mock test dinilai skor 95/100. Lanjut round 2 live pairing session.',
    positionOrder: 1,
    timelines: [
      {
        fromStatus: null,
        toStatus: 'APPLIED',
        note: 'Applied via Lever posting',
        eventDate: '2026-09-12T16:00:00.000Z',
      },
      {
        fromStatus: 'APPLIED',
        toStatus: 'OA_TEST',
        note: 'Take-home SDK integration test (TypeScript & Webhooks)',
        eventDate: '2026-09-20T10:00:00.000Z',
      },
      {
        fromStatus: 'OA_TEST',
        toStatus: 'INTERVIEW_HR',
        note: 'Debrief hasil tes dan tanya jawab values Xendit',
        eventDate: '2026-10-01T14:00:00.000Z',
      },
      {
        fromStatus: 'INTERVIEW_HR',
        toStatus: 'INTERVIEW_USER',
        note: 'Pair programming session dengan Lead Core Platform',
        eventDate: '2026-10-14T11:00:00.000Z',
      },
    ],
  },
  {
    companyName: 'Tiket.com',
    roleTitle: 'UI/UX Frontend Engineer',
    jobType: 'FULL_TIME',
    workMode: 'REMOTE',
    location: 'Jakarta Barat / WFH',
    status: 'APPLIED',
    priority: 'MEDIUM',
    salaryMin: 20000000,
    salaryMax: 26000000,
    currency: 'IDR',
    jobUrl: 'https://www.tiket.com/careers/detail/ui-ux-frontend-eng',
    cvVersion: 'CV_Senior_Frontend_v4.2.pdf',
    appliedDate: '2026-10-14T08:20:00.000Z',
    followUpDate: '2026-10-24T10:00:00.000Z',
    contactPerson: 'Talent Acquisition Team',
    contactChannel: 'LinkedIn Easy Apply',
    notes: 'Lamaran baru masuk minggu ini. Menunggu konfirmasi review portofolio desain & UI.',
    positionOrder: 0,
    timelines: [
      {
        fromStatus: null,
        toStatus: 'APPLIED',
        note: 'Submitted profile via LinkedIn Easy Apply',
        eventDate: '2026-10-14T08:20:00.000Z',
      },
    ],
  },
  {
    companyName: 'Tokopedia',
    roleTitle: 'Core Web Vitals Specialist',
    jobType: 'CONTRACT',
    workMode: 'HYBRID',
    location: 'Tokopedia Tower Ciputra World 2, Jakarta',
    status: 'OA_TEST',
    priority: 'HIGH',
    salaryMin: 25000000,
    salaryMax: 32000000,
    currency: 'IDR',
    jobUrl: 'https://www.tokopedia.com/careers/web-perf',
    cvVersion: 'CV_Tech_Lead_2026.pdf',
    appliedDate: '2026-10-08T10:00:00.000Z',
    followUpDate: '2026-10-20T16:00:00.000Z',
    contactPerson: 'Fajar Nugraha (Engineering Manager)',
    contactChannel: 'Telegram (@fnugraha_goto)',
    notes: 'Sedang mengerjakan audit performance Lighthouse & INP (Interaction to Next Paint) case study.',
    positionOrder: 1,
    timelines: [
      {
        fromStatus: null,
        toStatus: 'APPLIED',
        note: 'Disubmit melalui program referral internal Tokopedia',
        eventDate: '2026-10-08T10:00:00.000Z',
      },
      {
        fromStatus: 'APPLIED',
        toStatus: 'OA_TEST',
        note: 'Menerima case study optimasi loading speed e-commerce landing page',
        eventDate: '2026-10-13T13:00:00.000Z',
      },
    ],
  },
  {
    companyName: 'Midtrans',
    roleTitle: 'Integration Support Engineer',
    jobType: 'FULL_TIME',
    workMode: 'HYBRID',
    location: 'MidPlaza 2, Sudirman, Jakarta',
    status: 'WISHLIST',
    priority: 'LOW',
    salaryMin: 16000000,
    salaryMax: 20000000,
    currency: 'IDR',
    jobUrl: 'https://midtrans.com/careers/integration-support',
    cvVersion: 'CV_Fullstack_TS_Node.pdf',
    appliedDate: null,
    followUpDate: '2026-10-25T09:00:00.000Z',
    contactPerson: 'HR Midtrans',
    contactChannel: 'Karier Portal',
    notes: 'Perlu menyesuaikan CV agar lebih menonjolkan pemahaman REST API and webhook troubleshooting.',
    positionOrder: 0,
    timelines: [
      {
        fromStatus: null,
        toStatus: 'WISHLIST',
        note: 'Menyimpan lowongan ke Wishlist untuk disiapkan materi lamarannya',
        eventDate: '2026-10-16T18:00:00.000Z',
      },
    ],
  },
  {
    companyName: 'Telkom Indonesia (Leap Digital)',
    roleTitle: 'Staff Frontend Engineer',
    jobType: 'FULL_TIME',
    workMode: 'ONSITE',
    location: 'Telkom Landmark Tower Lt 38, Jakarta',
    status: 'WISHLIST',
    priority: 'MEDIUM',
    salaryMin: 22000000,
    salaryMax: 27000000,
    currency: 'IDR',
    jobUrl: 'https://careers.telkom.co.id/leap-frontend-staff',
    cvVersion: 'CV_Enterprise_Fintech.pdf',
    appliedDate: null,
    followUpDate: '2026-10-26T10:00:00.000Z',
    contactPerson: 'Tim Rekrutmen Leap BUMN',
    contactChannel: 'Portal Rekrutmen Bersama BUMN',
    notes: 'Cek persyaratan sertifikasi kompetensi sebelum submit berkas resmi.',
    positionOrder: 1,
    timelines: [
      {
        fromStatus: null,
        toStatus: 'WISHLIST',
        note: 'Tersimpan dari info pembukaan batch rekrutmen terbaru',
        eventDate: '2026-10-17T09:30:00.000Z',
      },
    ],
  },
  {
    companyName: 'Bukalapak',
    roleTitle: 'Senior React Web Specialist',
    jobType: 'FULL_TIME',
    workMode: 'REMOTE',
    location: 'Remote Indonesia',
    status: 'REJECTED',
    priority: 'MEDIUM',
    salaryMin: 24000000,
    salaryMax: 30000000,
    currency: 'IDR',
    jobUrl: 'https://careers.bukalapak.com/jobs/sr-react-specialist',
    cvVersion: 'CV_Senior_Frontend_v4.2.pdf',
    appliedDate: '2026-08-20T10:00:00.000Z',
    followUpDate: null,
    contactPerson: 'Dian Paramitha (Tech Recruiter)',
    contactChannel: 'Email (recruitment@bukalapak.com)',
    notes: 'Headcount posisi ini dibekukan sementara karena perubahan prioritas alokasi budget Q4.',
    positionOrder: 0,
    timelines: [
      {
        fromStatus: null,
        toStatus: 'APPLIED',
        note: 'Apply via Bukalapak career portal',
        eventDate: '2026-08-20T10:00:00.000Z',
      },
      {
        fromStatus: 'APPLIED',
        toStatus: 'INTERVIEW_HR',
        note: 'Interview HR dan pengenalan skema remote working',
        eventDate: '2026-09-02T13:30:00.000Z',
      },
      {
        fromStatus: 'INTERVIEW_HR',
        toStatus: 'REJECTED',
        note: 'Pemberitahuan posisi ditutup via email resmi',
        eventDate: '2026-09-18T16:00:00.000Z',
      },
    ],
  },
  {
    companyName: 'Blibli (PT Global Digital Niaga)',
    roleTitle: 'Software Engineer - CX Platform',
    jobType: 'FULL_TIME',
    workMode: 'HYBRID',
    location: 'KS Tubun Slipi, Jakarta Barat',
    status: 'GHOSTED',
    priority: 'LOW',
    salaryMin: 18000000,
    salaryMax: 24000000,
    currency: 'IDR',
    jobUrl: 'https://careers.blibli.com/positions/se-cx-platform',
    cvVersion: 'CV_Fullstack_TS_Node.pdf',
    appliedDate: '2026-08-10T11:00:00.000Z',
    followUpDate: null,
    contactPerson: 'Talent Acquisition Blibli',
    contactChannel: 'Kalibrr Portal',
    notes: 'Sudah di-follow up 2 kali via Kalibrr dan LinkedIn, tidak ada tanggapan setelah 4 minggu.',
    positionOrder: 0,
    timelines: [
      {
        fromStatus: null,
        toStatus: 'APPLIED',
        note: 'Submit lamaran via Kalibrr',
        eventDate: '2026-08-10T11:00:00.000Z',
      },
      {
        fromStatus: 'APPLIED',
        toStatus: 'GHOSTED',
        note: 'Tidak ada respons lebih dari 30 hari pasca konfirmasi penerimaan berkas',
        eventDate: '2026-09-15T09:00:00.000Z',
      },
    ],
  },
];

async function main() {
  console.log('🌱 Starting database seeding with realistic Career CRM applications...');

  // Bersihkan data lama jika ada
  await prisma.applicationTimeline.deleteMany({});
  await prisma.jobApplication.deleteMany({});

  for (const job of seedJobs) {
    const { timelines, ...jobData } = job;

    const createdJob = await prisma.jobApplication.create({
      data: {
        companyName: jobData.companyName,
        roleTitle: jobData.roleTitle,
        jobType: jobData.jobType,
        workMode: jobData.workMode,
        location: jobData.location,
        status: jobData.status,
        priority: jobData.priority,
        salaryMin: jobData.salaryMin,
        salaryMax: jobData.salaryMax,
        currency: jobData.currency,
        jobUrl: jobData.jobUrl,
        cvVersion: jobData.cvVersion,
        appliedDate: jobData.appliedDate ? new Date(jobData.appliedDate) : null,
        followUpDate: jobData.followUpDate ? new Date(jobData.followUpDate) : null,
        contactPerson: jobData.contactPerson,
        contactChannel: jobData.contactChannel,
        notes: jobData.notes,
        positionOrder: jobData.positionOrder,
        timelines: {
          create: timelines.map((t) => ({
            fromStatus: t.fromStatus,
            toStatus: t.toStatus,
            note: t.note,
            eventDate: new Date(t.eventDate),
          })),
        },
      },
      include: {
        timelines: true,
      },
    });

    console.log(`✅ Seeded: [${createdJob.status}] ${createdJob.companyName} - ${createdJob.roleTitle} (${createdJob.timelines.length} timelines)`);
  }

  const count = await prisma.jobApplication.count();
  const timelineCount = await prisma.applicationTimeline.count();
  console.log(`🎉 Seeding finished successfully! Total jobs: ${count}, Total timelines: ${timelineCount}`);
}

main()
  .catch((e) => {
    console.error('❌ Error while seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
