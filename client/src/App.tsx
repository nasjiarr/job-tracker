import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  JobApplicationDTO,
  DashboardMetricsDTO,
  JobStatus,
  JobType,
  WorkMode,
  Priority,
} from '@shared/types';
import { CreateJobDTO } from '@shared/schemas';
import {
  fetchJobs,
  createJob,
  updateJob,
  moveJob,
  deleteJob,
  addTimelineNote,
} from './api/jobsApi';
import { Navbar } from './components/Navbar';
import { BentoMetrics } from './components/BentoMetrics';
import { ControlBar } from './components/ControlBar';
import { KanbanBoard } from './components/KanbanBoard';
import { TableView } from './components/TableView';
import { JobDetailDrawer } from './components/JobDetailDrawer';
import { JobFormModal } from './components/JobFormModal';
import { ToastProvider, useToast } from './components/Toast';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { ThemeProvider } from './context/ThemeContext';
import { RefreshCw } from 'lucide-react';

const TrackerContent: React.FC = () => {
  const { showToast } = useToast();
  const { t } = useLanguage();

  const [jobs, setJobs] = useState<JobApplicationDTO[]>([]);
  const [metrics, setMetrics] = useState<DashboardMetricsDTO>({
    totalActive: 0,
    interviewRate: 0,
    pendingFollowUps: 0,
    offeringsCount: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  // Filters state
  const [search, setSearch] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<JobStatus | ''>('');
  const [selectedPriority, setSelectedPriority] = useState<Priority | ''>('');
  const [selectedWorkMode, setSelectedWorkMode] = useState<WorkMode | ''>('');
  const [selectedJobType, setSelectedJobType] = useState<JobType | ''>('');

  // View state
  const [viewMode, setViewMode] = useState<'kanban' | 'table'>('kanban');

  // Modal & Drawer state
  const [detailJob, setDetailJob] = useState<JobApplicationDTO | null>(null);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [editingJob, setEditingJob] = useState<JobApplicationDTO | null>(null);
  const [formDefaultStatus, setFormDefaultStatus] = useState<JobStatus | undefined>(undefined);

  // Fetch jobs from server
  const loadJobs = useCallback(async () => {
    try {
      setIsLoading(true);
      const params: {
        search?: string;
        status?: JobStatus;
        priority?: Priority;
        workMode?: WorkMode;
        jobType?: JobType;
      } = {};

      if (search.trim()) params.search = search.trim();
      if (selectedStatus) params.status = selectedStatus;
      if (selectedPriority) params.priority = selectedPriority;
      if (selectedWorkMode) params.workMode = selectedWorkMode;
      if (selectedJobType) params.jobType = selectedJobType;

      const data = await fetchJobs(params);
      setJobs(data.jobs);
      setMetrics(data.metrics);

      // Refresh detailJob if open
      if (detailJob) {
        const updatedDetail = data.jobs.find((j) => j.id === detailJob.id);
        if (updatedDetail) {
          setDetailJob(updatedDetail);
        }
      }
    } catch (err: unknown) {
      console.error('Error fetching jobs:', err);
      showToast('error', t.toasts.loadError);
    } finally {
      setIsLoading(false);
    }
  }, [search, selectedStatus, selectedPriority, selectedWorkMode, selectedJobType, detailJob, showToast, t.toasts.loadError]);

  useEffect(() => {
    loadJobs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, selectedStatus, selectedPriority, selectedWorkMode, selectedJobType]);

  const hasActiveFilters = useMemo(() => {
    return Boolean(search || selectedStatus || selectedPriority || selectedWorkMode || selectedJobType);
  }, [search, selectedStatus, selectedPriority, selectedWorkMode, selectedJobType]);

  const handleResetFilters = () => {
    setSearch('');
    setSelectedStatus('');
    setSelectedPriority('');
    setSelectedWorkMode('');
    setSelectedJobType('');
  };

  // Optimistic Move / Drag-and-drop
  const handleMoveJob = async (
    jobId: number,
    toStatus: JobStatus,
    newPositionOrder: number,
    customNote?: string
  ): Promise<void> => {
    const previousJobs = [...jobs];
    const targetJob = jobs.find((j) => j.id === jobId);
    if (!targetJob) return;

    const oldStatus = targetJob.status;
    const isStatusChanged = oldStatus !== toStatus;

    // Optimistic UI update in local state
    setJobs((prevJobs) => {
      const updated = prevJobs.map((j) => {
        if (j.id === jobId) {
          return {
            ...j,
            status: toStatus,
            positionOrder: newPositionOrder,
          };
        }
        return j;
      });
      return updated;
    });

    try {
      const result = await moveJob(jobId, {
        toStatus,
        positionOrder: newPositionOrder,
        note: customNote || (isStatusChanged ? `Status -> ${t.statuses[toStatus].label}` : undefined),
      });

      // Update state with server version
      setJobs((prevJobs) => prevJobs.map((j) => (j.id === jobId ? result : j)));

      if (detailJob && detailJob.id === jobId) {
        setDetailJob(result);
      }

      if (isStatusChanged) {
        showToast(
          'success',
          t.toasts.movedSuccess(targetJob.companyName, t.statuses[toStatus].label),
          t.toasts.statusUpdatedTitle
        );
      }

      // Re-calculate metrics from global server state
      const refreshed = await fetchJobs();
      setMetrics(refreshed.metrics);
    } catch (err: unknown) {
      console.error('Failed to move job:', err);
      // Rollback to snapshot
      setJobs(previousJobs);
      showToast('error', t.toasts.moveFailed, 'Error');
    }
  };

  // Inline Status Change from Table or Drawer
  const handleInlineStatusChange = async (jobId: number, newStatus: JobStatus): Promise<void> => {
    await handleMoveJob(jobId, newStatus, 0);
  };

  // Create or Update Form Submit
  const handleFormSubmit = async (formData: CreateJobDTO): Promise<void> => {
    if (editingJob) {
      const updated = await updateJob(editingJob.id, formData);
      setJobs((prev) => prev.map((j) => (j.id === editingJob.id ? updated : j)));
      if (detailJob && detailJob.id === editingJob.id) {
        setDetailJob(updated);
      }
      showToast('success', t.toasts.updateSuccess(updated.companyName));
    } else {
      const created = await createJob(formData);
      setJobs((prev) => [created, ...prev]);
      showToast('success', t.toasts.createSuccess(created.companyName));
    }

    const refreshed = await fetchJobs();
    setMetrics(refreshed.metrics);
  };

  // Add note to timeline
  const handleAddTimelineNote = async (jobId: number, note: string): Promise<void> => {
    const newTimeline = await addTimelineNote(jobId, { note });
    setJobs((prev) =>
      prev.map((j) => {
        if (j.id === jobId) {
          return {
            ...j,
            timelines: [newTimeline, ...(j.timelines || [])],
          };
        }
        return j;
      })
    );

    if (detailJob && detailJob.id === jobId) {
      setDetailJob((prev) =>
        prev
          ? {
              ...prev,
              timelines: [newTimeline, ...(prev.timelines || [])],
            }
          : null
      );
    }

    showToast('success', t.toasts.timelineSuccess);
  };

  // Delete Job
  const handleDeleteJob = async (jobId: number): Promise<void> => {
    const target = jobs.find((j) => j.id === jobId);
    try {
      await deleteJob(jobId);
      setJobs((prev) => prev.filter((j) => j.id !== jobId));
      if (detailJob && detailJob.id === jobId) {
        setDetailJob(null);
      }
      showToast('info', t.toasts.deleteSuccess(target?.companyName));

      const refreshed = await fetchJobs();
      setMetrics(refreshed.metrics);
    } catch (err: unknown) {
      console.error('Delete error:', err);
      showToast('error', t.toasts.deleteError);
    }
  };

  // Add in specific column shortcut
  const handleAddInColumn = (status: JobStatus) => {
    setEditingJob(null);
    setFormDefaultStatus(status);
    setIsFormModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0a0c12] text-slate-900 dark:text-zinc-100 flex flex-col font-sans transition-colors duration-200">
      {/* Top Navbar */}
      <Navbar
        totalJobs={jobs.length}
        onOpenCreateModal={() => {
          setEditingJob(null);
          setFormDefaultStatus(undefined);
          setIsFormModalOpen(true);
        }}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-[1600px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Top Summary Bento Metrics */}
        <BentoMetrics metrics={metrics} isLoading={isLoading} />

        {/* Control & Search Bar */}
        <ControlBar
          search={search}
          onSearchChange={setSearch}
          selectedStatus={selectedStatus}
          onStatusChange={setSelectedStatus}
          selectedPriority={selectedPriority}
          onPriorityChange={setSelectedPriority}
          selectedWorkMode={selectedWorkMode}
          onWorkModeChange={setSelectedWorkMode}
          selectedJobType={selectedJobType}
          onJobTypeChange={setSelectedJobType}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          onResetFilters={handleResetFilters}
          hasActiveFilters={hasActiveFilters}
          totalFiltered={jobs.length}
        />

        {/* Dynamic View Content */}
        {isLoading && jobs.length === 0 ? (
          <div className="h-96 flex flex-col items-center justify-center gap-3">
            <RefreshCw className="w-8 h-8 text-indigo-500 animate-spin" />
            <p className="text-sm text-slate-500 dark:text-zinc-400">Loading Career CRM pipeline...</p>
          </div>
        ) : viewMode === 'kanban' ? (
          <KanbanBoard
            jobs={jobs}
            onMoveJob={handleMoveJob}
            onOpenDetail={(job) => setDetailJob(job)}
            onEdit={(job) => {
              setEditingJob(job);
              setIsFormModalOpen(true);
            }}
            onDelete={handleDeleteJob}
            onAddInColumn={handleAddInColumn}
          />
        ) : (
          <TableView
            jobs={jobs}
            onOpenDetail={(job) => setDetailJob(job)}
            onEdit={(job) => {
              setEditingJob(job);
              setIsFormModalOpen(true);
            }}
            onDelete={handleDeleteJob}
            onStatusChangeInline={handleInlineStatusChange}
          />
        )}
      </main>

      {/* Slide-over Detail Drawer */}
      <JobDetailDrawer
        job={detailJob}
        isOpen={Boolean(detailJob)}
        onClose={() => setDetailJob(null)}
        onEdit={(job) => {
          setEditingJob(job);
          setIsFormModalOpen(true);
        }}
        onDelete={handleDeleteJob}
        onStatusChange={handleInlineStatusChange}
        onAddTimelineNote={handleAddTimelineNote}
      />

      {/* Add / Edit Modal Form */}
      <JobFormModal
        isOpen={isFormModalOpen}
        onClose={() => {
          setIsFormModalOpen(false);
          setEditingJob(null);
          setFormDefaultStatus(undefined);
        }}
        onSubmit={handleFormSubmit}
        initialData={editingJob}
        defaultStatus={formDefaultStatus}
      />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <ToastProvider>
          <TrackerContent />
        </ToastProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
};

export default App;
