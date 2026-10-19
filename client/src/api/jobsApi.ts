import axios, { AxiosResponse } from 'axios';
import {
  CreateJobDTO,
  UpdateJobDTO,
  MoveJobDTO,
  CreateTimelineNoteDTO,
  JobFilterQueryDTO,
} from '@shared/schemas';
import {
  JobsListResponseDTO,
  JobApplicationDTO,
  ApplicationTimelineDTO,
  ApiResponse,
} from '@shared/types';

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchJobs = async (params?: JobFilterQueryDTO): Promise<JobsListResponseDTO> => {
  const response: AxiosResponse<ApiResponse<JobsListResponseDTO>> = await api.get('/jobs', {
    params,
  });
  if (!response.data.success) {
    throw new Error(response.data.message || 'Gagal mengambil data lowongan');
  }
  return response.data.data;
};

export const fetchJobDetail = async (id: number): Promise<JobApplicationDTO> => {
  const response: AxiosResponse<ApiResponse<JobApplicationDTO>> = await api.get(`/jobs/${id}`);
  if (!response.data.success) {
    throw new Error(response.data.message || 'Gagal memuat detail lowongan');
  }
  return response.data.data;
};

export const createJob = async (payload: CreateJobDTO): Promise<JobApplicationDTO> => {
  const response: AxiosResponse<ApiResponse<JobApplicationDTO>> = await api.post('/jobs', payload);
  if (!response.data.success) {
    throw new Error(response.data.message || 'Gagal membuat lamaran baru');
  }
  return response.data.data;
};

export const updateJob = async (id: number, payload: UpdateJobDTO): Promise<JobApplicationDTO> => {
  const response: AxiosResponse<ApiResponse<JobApplicationDTO>> = await api.put(`/jobs/${id}`, payload);
  if (!response.data.success) {
    throw new Error(response.data.message || 'Gagal memperbarui data lowongan');
  }
  return response.data.data;
};

export const moveJob = async (id: number, payload: MoveJobDTO): Promise<JobApplicationDTO> => {
  const response: AxiosResponse<ApiResponse<JobApplicationDTO>> = await api.patch(`/jobs/${id}/move`, payload);
  if (!response.data.success) {
    throw new Error(response.data.message || 'Gagal memindahkan posisi lamaran');
  }
  return response.data.data;
};

export const addTimelineNote = async (
  id: number,
  payload: CreateTimelineNoteDTO
): Promise<ApplicationTimelineDTO> => {
  const response: AxiosResponse<ApiResponse<ApplicationTimelineDTO>> = await api.post(
    `/jobs/${id}/timelines`,
    payload
  );
  if (!response.data.success) {
    throw new Error(response.data.message || 'Gagal menambahkan catatan timeline');
  }
  return response.data.data;
};

export const deleteJob = async (id: number): Promise<{ id: number }> => {
  const response: AxiosResponse<ApiResponse<{ id: number }>> = await api.delete(`/jobs/${id}`);
  if (!response.data.success) {
    throw new Error(response.data.message || 'Gagal menghapus lowongan');
  }
  return response.data.data;
};
