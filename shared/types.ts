import { JobStatus, JobType, WorkMode, Priority } from './schemas';
export type { JobStatus, JobType, WorkMode, Priority };

// ==========================================
// 1. Entity & Timeline DTOs
// ==========================================
export interface ApplicationTimelineDTO {
  id: number;
  jobApplicationId: number;
  fromStatus: JobStatus | null;
  toStatus: JobStatus;
  note: string | null;
  eventDate: string;
}

export interface JobApplicationDTO {
  id: number;
  companyName: string;
  roleTitle: string;
  jobType: JobType;
  workMode: WorkMode;
  location: string | null;
  status: JobStatus;
  priority: Priority;
  salaryMin: number | null;
  salaryMax: number | null;
  currency: string;
  jobUrl: string | null;
  cvVersion: string | null;
  appliedDate: string | null;
  followUpDate: string | null;
  contactPerson: string | null;
  contactChannel: string | null;
  notes: string | null;
  positionOrder: number;
  createdAt: string;
  updatedAt: string;
  timelines?: ApplicationTimelineDTO[];
}

// ==========================================
// 2. Metrics & Dashboard DTOs
// ==========================================
export interface DashboardMetricsDTO {
  totalActive: number;
  interviewRate: number;
  pendingFollowUps: number;
  offeringsCount: number;
}

// ==========================================
// 3. API Response Contracts
// ==========================================
export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
  errors?: Record<string, string[]>;
}

export interface JobsListResponseDTO {
  jobs: JobApplicationDTO[];
  metrics: DashboardMetricsDTO;
}
