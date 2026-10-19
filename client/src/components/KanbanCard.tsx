import React from 'react';
import { JobApplicationDTO } from '@shared/types';
import {
  JOB_TYPE_STYLES,
  WORK_MODE_STYLES,
  PRIORITY_STYLES,
  formatSalaryRange,
  formatDate,
  isFollowUpDue,
} from '../constants/statusConfig';
import { MapPin, Calendar, Clock, DollarSign, MoreVertical, Edit2, Trash2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface KanbanCardProps {
  job: JobApplicationDTO;
  onOpenDetail: (job: JobApplicationDTO) => void;
  onEdit: (job: JobApplicationDTO) => void;
  onDelete: (id: number) => void;
  isDragging?: boolean;
}

export const KanbanCard: React.FC<KanbanCardProps> = ({
  job,
  onOpenDetail,
  onEdit,
  onDelete,
  isDragging,
}) => {
  const { language, t } = useLanguage();
  const [showMenu, setShowMenu] = React.useState(false);

  const priorityStyle = PRIORITY_STYLES[job.priority];
  const workModeStyle = WORK_MODE_STYLES[job.workMode];
  const jobTypeStyle = JOB_TYPE_STYLES[job.jobType];
  const followUpStatus = isFollowUpDue(job.followUpDate, language);

  return (
    <div
      onClick={() => onOpenDetail(job)}
      className={`group relative rounded-xl p-4 transition-all duration-200 cursor-pointer select-none text-left border ${
        isDragging
          ? 'border-indigo-500 shadow-2xl shadow-indigo-500/20 scale-105 rotate-1 bg-white dark:bg-[#181d2c]'
          : 'bg-white dark:bg-[#141824] border-slate-200/90 dark:border-zinc-800/90 hover:border-indigo-300 dark:hover:border-zinc-700 hover:bg-slate-50/50 dark:hover:bg-[#181c2b] shadow-sm shadow-slate-200/50 dark:shadow-md dark:shadow-black/20'
      }`}
    >
      {/* Priority pill + Menu button */}
      <div className="flex items-center justify-between gap-2 mb-2">
        <span
          className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[11px] font-medium border ${priorityStyle.color}`}
        >
          <span className={`w-1.5 h-1.5 rounded-full ${priorityStyle.dotColor}`} />
          {t.priorities[job.priority]}
        </span>

        <div className="relative" onClick={(e) => e.stopPropagation()}>
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="p-1 rounded-md text-slate-400 dark:text-zinc-400 hover:text-slate-700 dark:hover:text-zinc-200 hover:bg-slate-100 dark:hover:bg-zinc-800/60 opacity-60 group-hover:opacity-100 transition-opacity"
            aria-label="Aksi kartu"
          >
            <MoreVertical className="w-3.5 h-3.5" />
          </button>

          {showMenu && (
            <div
              className="absolute right-0 top-6 z-20 w-32 bg-white dark:bg-[#1b1f2e] border border-slate-200 dark:border-zinc-700/80 rounded-xl shadow-xl py-1 text-xs"
              onMouseLeave={() => setShowMenu(false)}
            >
              <button
                onClick={() => {
                  setShowMenu(false);
                  onEdit(job);
                }}
                className="w-full flex items-center gap-2 px-3 py-1.5 text-slate-700 dark:text-zinc-300 hover:bg-indigo-50 dark:hover:bg-indigo-600/20 hover:text-indigo-600 dark:hover:text-white"
              >
                <Edit2 className="w-3.5 h-3.5 text-indigo-500 dark:text-indigo-400" />
                <span>{t.card.edit}</span>
              </button>
              <button
                onClick={() => {
                  setShowMenu(false);
                  if (confirm(`${t.card.confirmDelete} (${job.companyName})`)) {
                    onDelete(job.id);
                  }
                }}
                className="w-full flex items-center gap-2 px-3 py-1.5 text-rose-600 dark:text-rose-300 hover:bg-rose-50 dark:hover:bg-rose-950/40"
              >
                <Trash2 className="w-3.5 h-3.5 text-rose-500 dark:text-rose-400" />
                <span>{t.card.delete}</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Role Title & Company */}
      <h4 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-300 transition-colors line-clamp-1 mb-0.5">
        {job.roleTitle}
      </h4>
      <p className="text-xs font-medium text-slate-600 dark:text-zinc-300 mb-2.5 line-clamp-1">
        {job.companyName}
      </p>

      {/* Tags: WorkMode & JobType */}
      <div className="flex flex-wrap items-center gap-1.5 mb-3">
        <span className={`px-2 py-0.5 rounded text-[10px] font-medium border ${workModeStyle.color}`}>
          {t.workModes[job.workMode]}
        </span>
        <span className={`px-2 py-0.5 rounded text-[10px] font-medium border ${jobTypeStyle.color}`}>
          {t.jobTypes[job.jobType]}
        </span>
      </div>

      {/* Salary & Location Info */}
      <div className="space-y-1 text-xs text-slate-500 dark:text-zinc-400 mb-3 pt-2 border-t border-slate-100 dark:border-zinc-800/60">
        {(job.salaryMin != null || job.salaryMax != null) && (
          <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400/90 font-mono text-[11px] font-medium">
            <DollarSign className="w-3 h-3 text-emerald-500 dark:text-emerald-400 flex-shrink-0" />
            <span className="truncate">{formatSalaryRange(job.salaryMin, job.salaryMax, job.currency, language)}</span>
          </div>
        )}

        {job.location && (
          <div className="flex items-center gap-1.5 text-slate-500 dark:text-zinc-400 text-[11px]">
            <MapPin className="w-3 h-3 text-slate-400 dark:text-zinc-500 flex-shrink-0" />
            <span className="truncate">{job.location}</span>
          </div>
        )}
      </div>

      {/* Follow Up Alert if due */}
      {followUpStatus.isDue && (
        <div
          className={`flex items-center gap-1 px-2 py-1 rounded-md text-[10px] font-semibold mb-2 ${
            followUpStatus.isPast
              ? 'bg-rose-50 text-rose-700 border border-rose-200 dark:bg-rose-950/60 dark:text-rose-300 dark:border-rose-800/40'
              : 'bg-amber-50 text-amber-800 border border-amber-200 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800/40 animate-pulse'
          }`}
        >
          <Clock className="w-3 h-3 flex-shrink-0" />
          <span>{followUpStatus.label}: {formatDate(job.followUpDate, language)}</span>
        </div>
      )}

      {/* Footer: Applied Date & Timelines count */}
      <div className="flex items-center justify-between text-[10px] text-slate-400 dark:text-zinc-400 pt-1">
        <span className="flex items-center gap-1">
          <Calendar className="w-3 h-3 text-slate-400 dark:text-zinc-500" />
          {job.appliedDate ? formatDate(job.appliedDate, language) : t.card.noDate}
        </span>
        {job.timelines && job.timelines.length > 0 && (
          <span className="text-slate-500 dark:text-zinc-400 font-mono font-medium">
            {job.timelines.length} {t.card.logCount}
          </span>
        )}
      </div>
    </div>
  );
};
