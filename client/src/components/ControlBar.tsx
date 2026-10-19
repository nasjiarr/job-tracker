import React, { useState, useEffect } from 'react';
import { JobStatus, JobType, WorkMode, Priority } from '@shared/types';
import { STATUS_STYLE, JOB_TYPE_STYLES, WORK_MODE_STYLES, PRIORITY_STYLES } from '../constants/statusConfig';
import { Search, LayoutGrid, Table, X, Filter } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface ControlBarProps {
  search: string;
  onSearchChange: (value: string) => void;
  selectedStatus: JobStatus | '';
  onStatusChange: (status: JobStatus | '') => void;
  selectedPriority: Priority | '';
  onPriorityChange: (priority: Priority | '') => void;
  selectedWorkMode: WorkMode | '';
  onWorkModeChange: (mode: WorkMode | '') => void;
  selectedJobType: JobType | '';
  onJobTypeChange: (type: JobType | '') => void;
  viewMode: 'kanban' | 'table';
  onViewModeChange: (mode: 'kanban' | 'table') => void;
  onResetFilters: () => void;
  hasActiveFilters: boolean;
  totalFiltered: number;
}

export const ControlBar: React.FC<ControlBarProps> = ({
  search,
  onSearchChange,
  selectedStatus,
  onStatusChange,
  selectedPriority,
  onPriorityChange,
  selectedWorkMode,
  onWorkModeChange,
  selectedJobType,
  onJobTypeChange,
  viewMode,
  onViewModeChange,
  onResetFilters,
  hasActiveFilters,
  totalFiltered,
}) => {
  const { t } = useLanguage();
  const [localSearch, setLocalSearch] = useState(search);

  // Sync internal state with external search prop
  useEffect(() => {
    setLocalSearch(search);
  }, [search]);

  // Debounce 300ms
  useEffect(() => {
    const timer = setTimeout(() => {
      if (localSearch !== search) {
        onSearchChange(localSearch);
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [localSearch, search, onSearchChange]);

  return (
    <div className="bg-white/95 dark:bg-[#11141c]/90 backdrop-blur-xl border border-slate-200/80 dark:border-zinc-800/80 rounded-2xl p-4 mb-6 shadow-sm shadow-slate-200/50 dark:shadow-xl dark:shadow-black/20 flex flex-col gap-4 transition-colors">
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
        {/* Left: Search Bar */}
        <div className="relative flex-1 max-w-lg">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-zinc-400" />
          <input
            type="text"
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            placeholder={t.controlBar.searchPlaceholder}
            className="w-full bg-slate-50 dark:bg-[#0a0c12] border border-slate-200 dark:border-zinc-800 focus:border-indigo-500 rounded-xl pl-10 pr-9 py-2 text-sm text-slate-900 dark:text-zinc-100 placeholder:text-slate-400 dark:placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all focus:bg-white"
          />
          {localSearch && (
            <button
              onClick={() => {
                setLocalSearch('');
                onSearchChange('');
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-zinc-400 hover:text-slate-700 dark:hover:text-white p-0.5"
              aria-label="Hapus pencarian"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Right: Dual-View Switcher + Total counter */}
        <div className="flex items-center justify-between sm:justify-end gap-3">
          <div className="text-xs text-slate-500 dark:text-zinc-400 px-2 font-mono">
            {t.controlBar.showingData} <span className="text-slate-900 dark:text-white font-semibold">{totalFiltered}</span> data
          </div>

          <div className="flex items-center p-1 bg-slate-100 dark:bg-[#090b0f] border border-slate-200 dark:border-zinc-800 rounded-xl transition-colors">
            <button
              onClick={() => onViewModeChange('kanban')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                viewMode === 'kanban'
                  ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-600/50'
                  : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-zinc-200'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>{t.controlBar.kanbanView}</span>
            </button>
            <button
              onClick={() => onViewModeChange('table')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                viewMode === 'table'
                  ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-600/50'
                  : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-zinc-200'
              }`}
            >
              <Table className="w-3.5 h-3.5" />
              <span>{t.controlBar.tableView}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Filter Dropdowns Bar */}
      <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-200/80 dark:border-zinc-800/60">
        <div className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-zinc-400 font-medium mr-1">
          <Filter className="w-3.5 h-3.5 text-indigo-500 dark:text-indigo-400" />
          <span>{t.controlBar.filterBy}</span>
        </div>

        {/* Status Dropdown */}
        <select
          value={selectedStatus}
          onChange={(e) => onStatusChange(e.target.value as JobStatus | '')}
          className="bg-slate-50 dark:bg-[#0c0e14] border border-slate-200 dark:border-zinc-800 hover:border-slate-300 dark:hover:border-zinc-700 text-slate-700 dark:text-zinc-200 text-xs rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-indigo-500 transition-colors"
        >
          <option value="">{t.controlBar.allStatuses}</option>
          {(Object.keys(STATUS_STYLE) as JobStatus[]).map((key) => (
            <option key={key} value={key} className="bg-white text-slate-900 dark:bg-[#141824] dark:text-zinc-200">
              {t.statuses[key].label}
            </option>
          ))}
        </select>

        {/* Priority Dropdown */}
        <select
          value={selectedPriority}
          onChange={(e) => onPriorityChange(e.target.value as Priority | '')}
          className="bg-slate-50 dark:bg-[#0c0e14] border border-slate-200 dark:border-zinc-800 hover:border-slate-300 dark:hover:border-zinc-700 text-slate-700 dark:text-zinc-200 text-xs rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-indigo-500 transition-colors"
        >
          <option value="">{t.controlBar.allPriorities}</option>
          {(Object.keys(PRIORITY_STYLES) as Priority[]).map((key) => (
            <option key={key} value={key} className="bg-white text-slate-900 dark:bg-[#141824] dark:text-zinc-200">
              {t.priorities[key]}
            </option>
          ))}
        </select>

        {/* Work Mode Dropdown */}
        <select
          value={selectedWorkMode}
          onChange={(e) => onWorkModeChange(e.target.value as WorkMode | '')}
          className="bg-slate-50 dark:bg-[#0c0e14] border border-slate-200 dark:border-zinc-800 hover:border-slate-300 dark:hover:border-zinc-700 text-slate-700 dark:text-zinc-200 text-xs rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-indigo-500 transition-colors"
        >
          <option value="">{t.controlBar.allWorkModes}</option>
          {(Object.keys(WORK_MODE_STYLES) as WorkMode[]).map((key) => (
            <option key={key} value={key} className="bg-white text-slate-900 dark:bg-[#141824] dark:text-zinc-200">
              {t.workModes[key]}
            </option>
          ))}
        </select>

        {/* Job Type Dropdown */}
        <select
          value={selectedJobType}
          onChange={(e) => onJobTypeChange(e.target.value as JobType | '')}
          className="bg-slate-50 dark:bg-[#0c0e14] border border-slate-200 dark:border-zinc-800 hover:border-slate-300 dark:hover:border-zinc-700 text-slate-700 dark:text-zinc-200 text-xs rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-indigo-500 transition-colors"
        >
          <option value="">{t.controlBar.allJobTypes}</option>
          {(Object.keys(JOB_TYPE_STYLES) as JobType[]).map((key) => (
            <option key={key} value={key} className="bg-white text-slate-900 dark:bg-[#141824] dark:text-zinc-200">
              {t.jobTypes[key]}
            </option>
          ))}
        </select>

        {/* Reset Filters button */}
        {hasActiveFilters && (
          <button
            onClick={onResetFilters}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 hover:bg-rose-100 dark:hover:bg-rose-900/50 transition-colors ml-auto sm:ml-2"
          >
            <X className="w-3.5 h-3.5" />
            <span>{t.controlBar.resetFilter}</span>
          </button>
        )}
      </div>
    </div>
  );
};
