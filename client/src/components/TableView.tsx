import React, { useState, useMemo } from 'react';
import { JobApplicationDTO, JobStatus } from '@shared/types';
import {
  STATUS_STYLE,
  JOB_TYPE_STYLES,
  WORK_MODE_STYLES,
  PRIORITY_STYLES,
  formatSalaryRange,
  formatDate,
  isFollowUpDue,
} from '../constants/statusConfig';
import {
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Eye,
  Edit2,
  Trash2,
  ExternalLink,
  Clock,
  AlertCircle,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface TableViewProps {
  jobs: JobApplicationDTO[];
  onOpenDetail: (job: JobApplicationDTO) => void;
  onEdit: (job: JobApplicationDTO) => void;
  onDelete: (id: number) => void;
  onStatusChangeInline: (jobId: number, newStatus: JobStatus) => Promise<void>;
}

type SortColumn = 'companyName' | 'roleTitle' | 'status' | 'priority' | 'salaryMax' | 'appliedDate' | 'followUpDate';

export const TableView: React.FC<TableViewProps> = ({
  jobs,
  onOpenDetail,
  onEdit,
  onDelete,
  onStatusChangeInline,
}) => {
  const { language, t } = useLanguage();
  const [sortColumn, setSortColumn] = useState<SortColumn>('appliedDate');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  const handleSort = (column: SortColumn) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const sortedJobs = useMemo(() => {
    return [...jobs].sort((a, b) => {
      let valA: string | number | null = null;
      let valB: string | number | null = null;

      if (sortColumn === 'companyName') {
        valA = a.companyName.toLowerCase();
        valB = b.companyName.toLowerCase();
      } else if (sortColumn === 'roleTitle') {
        valA = a.roleTitle.toLowerCase();
        valB = b.roleTitle.toLowerCase();
      } else if (sortColumn === 'status') {
        valA = a.status;
        valB = b.status;
      } else if (sortColumn === 'priority') {
        const priorityRank: Record<string, number> = { HIGH: 3, MEDIUM: 2, LOW: 1 };
        valA = priorityRank[a.priority] || 0;
        valB = priorityRank[b.priority] || 0;
      } else if (sortColumn === 'salaryMax') {
        valA = a.salaryMax ?? a.salaryMin ?? 0;
        valB = b.salaryMax ?? b.salaryMin ?? 0;
      } else if (sortColumn === 'appliedDate') {
        valA = a.appliedDate ? new Date(a.appliedDate).getTime() : 0;
        valB = b.appliedDate ? new Date(b.appliedDate).getTime() : 0;
      } else if (sortColumn === 'followUpDate') {
        valA = a.followUpDate ? new Date(a.followUpDate).getTime() : 0;
        valB = b.followUpDate ? new Date(b.followUpDate).getTime() : 0;
      }

      if (valA === valB) return 0;
      if (valA == null) return 1;
      if (valB == null) return -1;

      if (sortDirection === 'asc') {
        return valA > valB ? 1 : -1;
      } else {
        return valA < valB ? 1 : -1;
      }
    });
  }, [jobs, sortColumn, sortDirection]);

  const renderSortIcon = (column: SortColumn) => {
    if (sortColumn !== column) {
      return <ArrowUpDown className="w-3.5 h-3.5 text-slate-400 dark:text-zinc-500 opacity-60" />;
    }
    return sortDirection === 'asc' ? (
      <ArrowUp className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
    ) : (
      <ArrowDown className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
    );
  };

  return (
    <div className="w-full bg-white dark:bg-[#10131b] border border-slate-200/80 dark:border-zinc-800/80 rounded-2xl shadow-sm dark:shadow-xl overflow-hidden transition-colors">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-[#141824] text-slate-600 dark:text-zinc-400 font-semibold uppercase tracking-wider">
              <th
                onClick={() => handleSort('companyName')}
                className="py-3.5 px-4 cursor-pointer hover:text-slate-900 dark:hover:text-white transition-colors select-none"
              >
                <div className="flex items-center gap-1.5">
                  <span>{t.table.colCompanyRole}</span>
                  {renderSortIcon('companyName')}
                </div>
              </th>
              <th
                onClick={() => handleSort('status')}
                className="py-3.5 px-4 cursor-pointer hover:text-slate-900 dark:hover:text-white transition-colors select-none"
              >
                <div className="flex items-center gap-1.5">
                  <span>{t.table.colStatus}</span>
                  {renderSortIcon('status')}
                </div>
              </th>
              <th
                onClick={() => handleSort('priority')}
                className="py-3.5 px-4 cursor-pointer hover:text-slate-900 dark:hover:text-white transition-colors select-none"
              >
                <div className="flex items-center gap-1.5">
                  <span>{t.table.colPriority}</span>
                  {renderSortIcon('priority')}
                </div>
              </th>
              <th className="py-3.5 px-4">{t.table.colTypeMode}</th>
              <th
                onClick={() => handleSort('salaryMax')}
                className="py-3.5 px-4 cursor-pointer hover:text-slate-900 dark:hover:text-white transition-colors select-none"
              >
                <div className="flex items-center gap-1.5">
                  <span>{t.table.colSalary}</span>
                  {renderSortIcon('salaryMax')}
                </div>
              </th>
              <th
                onClick={() => handleSort('appliedDate')}
                className="py-3.5 px-4 cursor-pointer hover:text-slate-900 dark:hover:text-white transition-colors select-none"
              >
                <div className="flex items-center gap-1.5">
                  <span>{t.table.colAppliedDate}</span>
                  {renderSortIcon('appliedDate')}
                </div>
              </th>
              <th
                onClick={() => handleSort('followUpDate')}
                className="py-3.5 px-4 cursor-pointer hover:text-slate-900 dark:hover:text-white transition-colors select-none"
              >
                <div className="flex items-center gap-1.5">
                  <span>{t.table.colFollowUp}</span>
                  {renderSortIcon('followUpDate')}
                </div>
              </th>
              <th className="py-3.5 px-4 text-right">{t.table.colActions}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-zinc-800/60 text-slate-700 dark:text-zinc-300">
            {sortedJobs.map((job) => {
              const priorityStyle = PRIORITY_STYLES[job.priority];
              const workModeStyle = WORK_MODE_STYLES[job.workMode];
              const jobTypeStyle = JOB_TYPE_STYLES[job.jobType];
              const statusStyle = STATUS_STYLE[job.status];
              const followUp = isFollowUpDue(job.followUpDate, language);

              return (
                <tr
                  key={job.id}
                  onClick={() => onOpenDetail(job)}
                  className="hover:bg-slate-50 dark:hover:bg-[#151926] cursor-pointer transition-colors group"
                >
                  {/* Company & Role */}
                  <td className="py-3.5 px-4">
                    <div className="font-semibold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-300 transition-colors">
                      {job.roleTitle}
                    </div>
                    <div className="text-slate-500 dark:text-zinc-400 flex items-center gap-2 mt-0.5">
                      <span>{job.companyName}</span>
                      {job.jobUrl && (
                        <a
                          href={job.jobUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="text-slate-400 hover:text-indigo-600 dark:text-zinc-500 dark:hover:text-indigo-400 p-0.5"
                          title="Buka lowongan"
                        >
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  </td>

                  {/* Status Inline Dropdown */}
                  <td className="py-3.5 px-4" onClick={(e) => e.stopPropagation()}>
                    <select
                      value={job.status}
                      onChange={(e) => onStatusChangeInline(job.id, e.target.value as JobStatus)}
                      className={`text-xs font-semibold rounded-lg px-2.5 py-1.5 border focus:outline-none transition-all ${
                        statusStyle.badgeBg
                      } ${statusStyle.badgeText} ${
                        statusStyle.badgeBorder
                      }`}
                    >
                      {(Object.keys(STATUS_STYLE) as JobStatus[]).map((key) => (
                        <option
                          key={key}
                          value={key}
                          className="bg-white text-slate-900 dark:bg-[#141824] dark:text-zinc-200"
                        >
                          {t.statuses[key].label}
                        </option>
                      ))}
                    </select>
                  </td>

                  {/* Priority */}
                  <td className="py-3.5 px-4">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[11px] font-medium border ${priorityStyle.color}`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${priorityStyle.dotColor}`} />
                      {t.priorities[job.priority]}
                    </span>
                  </td>

                  {/* Mode & Type */}
                  <td className="py-3.5 px-4">
                    <div className="flex flex-col gap-1 items-start">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-medium border ${workModeStyle.color}`}>
                        {t.workModes[job.workMode]}
                      </span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-medium border ${jobTypeStyle.color}`}>
                        {t.jobTypes[job.jobType]}
                      </span>
                    </div>
                  </td>

                  {/* Salary */}
                  <td className="py-3.5 px-4 font-mono text-[11px] font-medium text-slate-700 dark:text-zinc-300">
                    {formatSalaryRange(job.salaryMin, job.salaryMax, job.currency, language)}
                  </td>

                  {/* Applied Date */}
                  <td className="py-3.5 px-4 text-slate-500 dark:text-zinc-400">
                    {formatDate(job.appliedDate, language)}
                  </td>

                  {/* Follow Up */}
                  <td className="py-3.5 px-4">
                    {job.followUpDate ? (
                      <div className="flex items-center gap-1.5">
                        {followUp.isDue ? (
                          <span
                            className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-semibold ${
                              followUp.isPast
                                ? 'bg-rose-50 text-rose-700 border border-rose-200 dark:bg-rose-950/70 dark:text-rose-300 dark:border-rose-800/40'
                                : 'bg-amber-50 text-amber-800 border border-amber-200 dark:bg-amber-950/70 dark:text-amber-300 dark:border-amber-800/40 animate-pulse'
                            }`}
                          >
                            <AlertCircle className="w-3 h-3" />
                            {followUp.label} ({formatDate(job.followUpDate, language)})
                          </span>
                        ) : (
                          <span className="text-slate-500 dark:text-zinc-400 flex items-center gap-1">
                            <Clock className="w-3 h-3 text-slate-400 dark:text-zinc-500" />
                            {formatDate(job.followUpDate, language)}
                          </span>
                        )}
                      </div>
                    ) : (
                      <span className="text-slate-400 dark:text-zinc-400">-</span>
                    )}
                  </td>

                  {/* Actions */}
                  <td className="py-3.5 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => onOpenDetail(job)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-slate-800 hover:bg-slate-100 dark:text-zinc-400 dark:hover:text-white dark:hover:bg-zinc-800 transition-colors"
                        title={t.table.viewDetail}
                        aria-label="Detail"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onEdit(job)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-slate-100 dark:text-zinc-400 dark:hover:text-indigo-300 dark:hover:bg-zinc-800 transition-colors"
                        title={t.table.editTooltip}
                        aria-label="Edit"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`${t.table.confirmDelete} (${job.companyName})`)) {
                            onDelete(job.id);
                          }
                        }}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:text-zinc-400 dark:hover:text-rose-400 dark:hover:bg-rose-950/40 transition-colors"
                        title={t.table.deleteTooltip}
                        aria-label="Hapus"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}

            {sortedJobs.length === 0 && (
              <tr>
                <td colSpan={8} className="py-12 text-center text-slate-400 dark:text-zinc-400">
                  {t.table.emptySearch}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
