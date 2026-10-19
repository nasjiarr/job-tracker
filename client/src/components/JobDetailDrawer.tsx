import React, { useState } from 'react';
import { JobApplicationDTO, JobStatus } from '@shared/types';
import {
  STATUS_STYLE,
  JOB_TYPE_STYLES,
  WORK_MODE_STYLES,
  PRIORITY_STYLES,
  formatSalaryRange,
  formatDate,
  formatDateTime,
  isFollowUpDue,
} from '../constants/statusConfig';
import {
  X,
  ExternalLink,
  Edit2,
  Trash2,
  MapPin,
  Calendar,
  DollarSign,
  FileText,
  User,
  MessageSquare,
  Send,
  Clock,
  ArrowRight,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface JobDetailDrawerProps {
  job: JobApplicationDTO | null;
  isOpen: boolean;
  onClose: () => void;
  onEdit: (job: JobApplicationDTO) => void;
  onDelete: (id: number) => void;
  onStatusChange: (jobId: number, newStatus: JobStatus) => Promise<void>;
  onAddTimelineNote: (jobId: number, note: string) => Promise<void>;
}

export const JobDetailDrawer: React.FC<JobDetailDrawerProps> = ({
  job,
  isOpen,
  onClose,
  onEdit,
  onDelete,
  onStatusChange,
  onAddTimelineNote,
}) => {
  const { language, t } = useLanguage();
  const [newNote, setNewNote] = useState('');
  const [isSubmittingNote, setIsSubmittingNote] = useState(false);

  if (!isOpen || !job) return null;

  const priorityStyle = PRIORITY_STYLES[job.priority];
  const workModeStyle = WORK_MODE_STYLES[job.workMode];
  const jobTypeStyle = JOB_TYPE_STYLES[job.jobType];
  const statusStyle = STATUS_STYLE[job.status];
  const followUp = isFollowUpDue(job.followUpDate, language);

  const handleSubmitNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNote.trim()) return;

    try {
      setIsSubmittingNote(true);
      await onAddTimelineNote(job.id, newNote.trim());
      setNewNote('');
    } finally {
      setIsSubmittingNote(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-slate-900/40 dark:bg-black/70 backdrop-blur-sm transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-xl bg-white dark:bg-[#0f121a] border-l border-slate-200 dark:border-zinc-800 shadow-2xl flex flex-col h-full animate-slide-in-right transition-colors">
          {/* Drawer Header */}
          <div className="p-6 border-b border-slate-200/80 dark:border-zinc-800/80 bg-slate-50 dark:bg-[#141824]/80 flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2">
                <select
                  value={job.status}
                  onChange={(e) => onStatusChange(job.id, e.target.value as JobStatus)}
                  className={`text-xs font-semibold rounded-lg px-2.5 py-1.5 border focus:outline-none transition-all ${statusStyle.badgeBg} ${statusStyle.badgeText} ${statusStyle.badgeBorder}`}
                >
                  {(Object.keys(STATUS_STYLE) as JobStatus[]).map((key) => (
                    <option key={key} value={key} className="bg-white text-slate-900 dark:bg-[#141824] dark:text-zinc-200">
                      {t.statuses[key].label}
                    </option>
                  ))}
                </select>

                <span
                  className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[11px] font-medium border ${priorityStyle.color}`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${priorityStyle.dotColor}`} />
                  {t.priorities[job.priority]}
                </span>
              </div>

              <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight leading-snug">
                {job.roleTitle}
              </h2>
              <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-zinc-400 mt-1">
                <span className="font-medium text-slate-700 dark:text-zinc-200">{job.companyName}</span>
                {job.jobUrl && (
                  <a
                    href={job.jobUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors"
                  >
                    <span>{t.drawer.openJobUrl}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2 flex-shrink-0">
              <button
                onClick={() => onEdit(job)}
                className="p-2 rounded-xl text-slate-500 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors"
                title={t.drawer.edit}
                aria-label="Edit"
              >
                <Edit2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => {
                  if (confirm(`${t.drawer.confirmDelete} (${job.companyName})`)) {
                    onDelete(job.id);
                    onClose();
                  }
                }}
                className="p-2 rounded-xl text-slate-500 dark:text-zinc-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                title={t.drawer.delete}
                aria-label="Hapus"
              >
                <Trash2 className="w-4 h-4" />
              </button>
              <button
                onClick={onClose}
                className="p-2 rounded-xl text-slate-500 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors ml-1"
                aria-label={t.drawer.close}
                title={t.drawer.close}
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Drawer Body (Scrollable) */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* Quick Details Grid */}
            <div className="grid grid-cols-2 gap-3 p-4 rounded-xl bg-slate-50 dark:bg-[#141824]/60 border border-slate-200/80 dark:border-zinc-800/80">
              <div>
                <span className="text-[11px] uppercase tracking-wider text-slate-500 dark:text-zinc-400 block mb-1 font-semibold">
                  {t.drawer.sectionCompensation}
                </span>
                <div className="flex items-center gap-1.5 text-xs font-mono font-semibold text-emerald-600 dark:text-emerald-400">
                  <DollarSign className="w-3.5 h-3.5" />
                  <span>{formatSalaryRange(job.salaryMin, job.salaryMax, job.currency, language)}</span>
                </div>
              </div>

              <div>
                <span className="text-[11px] uppercase tracking-wider text-slate-500 dark:text-zinc-400 block mb-1 font-semibold">
                  {t.drawer.sectionTypeMode}
                </span>
                <div className="flex items-center gap-1.5">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-medium border ${workModeStyle.color}`}>
                    {t.workModes[job.workMode]}
                  </span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-medium border ${jobTypeStyle.color}`}>
                    {t.jobTypes[job.jobType]}
                  </span>
                </div>
              </div>

              <div>
                <span className="text-[11px] uppercase tracking-wider text-slate-500 dark:text-zinc-400 block mb-1 font-semibold">
                  {t.drawer.sectionLocation}
                </span>
                <div className="flex items-center gap-1.5 text-xs text-slate-700 dark:text-zinc-300">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 dark:text-zinc-500 flex-shrink-0" />
                  <span className="truncate">{job.location || t.drawer.notSpecified}</span>
                </div>
              </div>

              <div>
                <span className="text-[11px] uppercase tracking-wider text-slate-500 dark:text-zinc-400 block mb-1 font-semibold">
                  {t.drawer.sectionCvVersion}
                </span>
                <div className="flex items-center gap-1.5 text-xs text-slate-700 dark:text-zinc-300 font-mono">
                  <FileText className="w-3.5 h-3.5 text-slate-400 dark:text-zinc-500 flex-shrink-0" />
                  <span className="truncate">{job.cvVersion || '-'}</span>
                </div>
              </div>

              <div>
                <span className="text-[11px] uppercase tracking-wider text-slate-500 dark:text-zinc-400 block mb-1 font-semibold">
                  {t.drawer.sectionAppliedDate}
                </span>
                <div className="flex items-center gap-1.5 text-xs text-slate-700 dark:text-zinc-300">
                  <Calendar className="w-3.5 h-3.5 text-slate-400 dark:text-zinc-500 flex-shrink-0" />
                  <span>{formatDate(job.appliedDate, language)}</span>
                </div>
              </div>

              <div>
                <span className="text-[11px] uppercase tracking-wider text-slate-500 dark:text-zinc-400 block mb-1 font-semibold">
                  {t.drawer.sectionFollowUp}
                </span>
                <div className="flex items-center gap-1.5 text-xs">
                  {job.followUpDate ? (
                    <span
                      className={`inline-flex items-center gap-1 font-semibold ${
                        followUp.isDue ? 'text-amber-700 dark:text-amber-400' : 'text-slate-700 dark:text-zinc-300'
                      }`}
                    >
                      <Clock className="w-3.5 h-3.5 flex-shrink-0" />
                      <span>{formatDate(job.followUpDate, language)}</span>
                      {followUp.isDue && (
                        <span className="text-[10px] px-1 rounded bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 border border-amber-300 dark:border-amber-800/60 ml-1">
                          {followUp.label}
                        </span>
                      )}
                    </span>
                  ) : (
                    <span className="text-slate-400 dark:text-zinc-400">-</span>
                  )}
                </div>
              </div>

              {(job.contactPerson || job.contactChannel) && (
                <div className="col-span-2 pt-2 border-t border-slate-200/80 dark:border-zinc-800/60">
                  <span className="text-[11px] uppercase tracking-wider text-slate-500 dark:text-zinc-400 block mb-1 font-semibold">
                    {t.drawer.sectionRecruiter}
                  </span>
                  <div className="flex items-center gap-2 text-xs text-slate-800 dark:text-zinc-200">
                    <User className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400 flex-shrink-0" />
                    <span>{job.contactPerson || '-'}</span>
                    {job.contactChannel && (
                      <span className="text-slate-500 dark:text-zinc-400">({job.contactChannel})</span>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Notes Section */}
            {job.notes && (
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#141824]/40 border border-slate-200/80 dark:border-zinc-800/80">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-600 dark:text-zinc-400 block mb-2">
                  {t.drawer.sectionNotes}
                </span>
                <p className="text-xs text-slate-700 dark:text-zinc-200 whitespace-pre-wrap leading-relaxed">
                  {job.notes}
                </p>
              </div>
            )}

            {/* Vertical Timeline History */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white tracking-tight">
                    {t.drawer.timelineTitle}
                  </h3>
                </div>
                <span className="text-xs text-slate-500 dark:text-zinc-400 font-mono">
                  {job.timelines?.length || 0} {t.drawer.timelineCount}
                </span>
              </div>

              {/* Add Note Form */}
              <form onSubmit={handleSubmitNote} className="mb-6">
                <div className="relative">
                  <textarea
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    placeholder={t.drawer.newNotePlaceholder}
                    rows={2}
                    className="w-full bg-slate-50 dark:bg-[#141824] border border-slate-200 dark:border-zinc-800 focus:border-indigo-500 rounded-xl p-3 text-xs text-slate-900 dark:text-zinc-200 placeholder:text-slate-400 dark:placeholder:text-zinc-500 focus:outline-none focus:ring-1 focus:ring-indigo-500/20 transition-all resize-none focus:bg-white"
                  />
                  <button
                    type="submit"
                    disabled={isSubmittingNote || !newNote.trim()}
                    className="absolute right-2.5 bottom-3.5 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 disabled:hover:bg-indigo-600 text-white text-xs font-semibold transition-all shadow-sm"
                  >
                    <Send className="w-3 h-3" />
                    <span>{isSubmittingNote ? t.drawer.savingNote : t.drawer.saveNote}</span>
                  </button>
                </div>
              </form>

              {/* Timeline Items List */}
              <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-[2px] before:bg-slate-200 dark:before:bg-zinc-800">
                {job.timelines && job.timelines.length > 0 ? (
                  job.timelines.map((timeline) => {
                    const toStyle = STATUS_STYLE[timeline.toStatus];
                    const fromStyle = timeline.fromStatus
                      ? STATUS_STYLE[timeline.fromStatus]
                      : null;

                    return (
                      <div key={timeline.id} className="relative group">
                        {/* Dot indicator */}
                        <div
                          className={`absolute -left-6 top-1.5 w-3 h-3 rounded-full border-2 border-white dark:border-[#0f121a] ${toStyle.dotColor} shadow-sm`}
                        />

                        {/* Timeline Card */}
                        <div className="bg-slate-50 dark:bg-[#141824]/70 border border-slate-200/80 dark:border-zinc-800/80 rounded-xl p-3.5 group-hover:border-slate-300 dark:group-hover:border-zinc-700 transition-colors">
                          <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                            {/* Status Transition Badge */}
                            <div className="flex items-center gap-1.5">
                              {fromStyle && timeline.fromStatus && (
                                <>
                                  <span
                                    className={`px-2 py-0.5 rounded text-[10px] font-medium border ${fromStyle.badgeBg} ${fromStyle.badgeText} ${fromStyle.badgeBorder}`}
                                  >
                                    {t.statuses[timeline.fromStatus].label}
                                  </span>
                                  <ArrowRight className="w-3 h-3 text-slate-400 dark:text-zinc-500" />
                                </>
                              )}
                              <span
                                className={`px-2 py-0.5 rounded text-[10px] font-semibold border ${toStyle.badgeBg} ${toStyle.badgeText} ${toStyle.badgeBorder}`}
                              >
                                {t.statuses[timeline.toStatus].label}
                              </span>
                            </div>

                            <span className="text-[10px] font-mono text-slate-500 dark:text-zinc-400">
                              {formatDateTime(timeline.eventDate, language)}
                            </span>
                          </div>

                          {timeline.note && (
                            <p className="text-xs text-slate-700 dark:text-zinc-200 leading-relaxed">
                              {timeline.note}
                            </p>
                          )}
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="py-4 text-xs text-slate-400 dark:text-zinc-400 italic">
                    {t.drawer.emptyTimeline}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
