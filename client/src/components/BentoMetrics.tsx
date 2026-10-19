import React from 'react';
import { DashboardMetricsDTO } from '@shared/types';
import { Briefcase, TrendingUp, BellRing, Award, Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface BentoMetricsProps {
  metrics: DashboardMetricsDTO;
  isLoading?: boolean;
}

export const BentoMetrics: React.FC<BentoMetricsProps> = ({ metrics, isLoading }) => {
  const { t } = useLanguage();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {/* 1. Active Applications */}
      <div className="relative group overflow-hidden rounded-2xl p-5 bg-white dark:bg-gradient-to-br dark:from-[#121622] dark:to-[#0e1118] border border-slate-200/80 dark:border-zinc-800/80 hover:border-indigo-400 dark:hover:border-indigo-500/40 transition-all duration-300 shadow-sm shadow-slate-200/50 dark:shadow-lg dark:shadow-black/30">
        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 dark:bg-indigo-500/5 rounded-full blur-2xl group-hover:bg-indigo-500/10 transition-colors pointer-events-none" />
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-zinc-400">
            {t.metrics.activePipeline}
          </span>
          <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-950/80 border border-indigo-200 dark:border-indigo-800/40 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
            <Briefcase className="w-4 h-4" />
          </div>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white font-mono">
            {isLoading ? '...' : metrics.totalActive}
          </span>
          <span className="text-xs text-slate-500 dark:text-zinc-400">{t.metrics.activeSubtitle}</span>
        </div>
        <div className="mt-3 flex items-center gap-1.5 text-xs text-indigo-600 dark:text-indigo-300/80">
          <Sparkles className="w-3.5 h-3.5 text-indigo-500 dark:text-indigo-400" />
          <span>{t.metrics.activeFootnote}</span>
        </div>
      </div>

      {/* 2. Interview Rate */}
      <div className="relative group overflow-hidden rounded-2xl p-5 bg-white dark:bg-gradient-to-br dark:from-[#121622] dark:to-[#0e1118] border border-slate-200/80 dark:border-zinc-800/80 hover:border-emerald-400 dark:hover:border-emerald-500/40 transition-all duration-300 shadow-sm shadow-slate-200/50 dark:shadow-lg dark:shadow-black/30">
        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 dark:bg-emerald-500/5 rounded-full blur-2xl group-hover:bg-emerald-500/10 transition-colors pointer-events-none" />
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-zinc-400">
            {t.metrics.interviewRate}
          </span>
          <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-200 dark:border-emerald-800/40 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
            <TrendingUp className="w-4 h-4" />
          </div>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-extrabold tracking-tight text-emerald-600 dark:text-emerald-400 font-mono">
            {isLoading ? '...' : `${metrics.interviewRate}%`}
          </span>
          <span className="text-xs text-slate-500 dark:text-zinc-400">{t.metrics.interviewSubtitle}</span>
        </div>
        <div className="mt-3 flex items-center gap-1.5 text-xs text-emerald-700 dark:text-emerald-300/80">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400" />
          <span>{t.metrics.interviewFootnote}</span>
        </div>
      </div>

      {/* 3. Pending Follow-Ups */}
      <div
        className={`relative group overflow-hidden rounded-2xl p-5 bg-white dark:bg-gradient-to-br dark:from-[#121622] dark:to-[#0e1118] border transition-all duration-300 shadow-sm shadow-slate-200/50 dark:shadow-lg dark:shadow-black/30 ${
          metrics.pendingFollowUps > 0
            ? 'border-amber-300 dark:border-amber-700/60 hover:border-amber-400 dark:hover:border-amber-500/70'
            : 'border-slate-200/80 dark:border-zinc-800/80 hover:border-slate-300 dark:hover:border-zinc-700'
        }`}
      >
        <div
          className={`absolute top-0 right-0 w-32 h-32 rounded-full blur-2xl transition-colors pointer-events-none ${
            metrics.pendingFollowUps > 0 ? 'bg-amber-500/10' : 'bg-slate-500/5 dark:bg-zinc-700/5'
          }`}
        />
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-zinc-400">
            {t.metrics.actionItemsDue}
          </span>
          <div
            className={`w-8 h-8 rounded-lg border flex items-center justify-center ${
              metrics.pendingFollowUps > 0
                ? 'bg-amber-50 dark:bg-amber-950/80 border-amber-200 dark:border-amber-800/50 text-amber-600 dark:text-amber-400 animate-bounce'
                : 'bg-slate-100 dark:bg-zinc-800/80 border-slate-200 dark:border-zinc-700/40 text-slate-500 dark:text-zinc-400'
            }`}
          >
            <BellRing className="w-4 h-4" />
          </div>
        </div>
        <div className="flex items-baseline gap-2">
          <span
            className={`text-3xl font-extrabold tracking-tight font-mono ${
              metrics.pendingFollowUps > 0 ? 'text-amber-600 dark:text-amber-400' : 'text-slate-900 dark:text-zinc-200'
            }`}
          >
            {isLoading ? '...' : metrics.pendingFollowUps}
          </span>
          <span className="text-xs text-slate-500 dark:text-zinc-400">{t.metrics.actionItemsSubtitle}</span>
        </div>
        <div className="mt-3 flex items-center gap-1.5 text-xs">
          {metrics.pendingFollowUps > 0 ? (
            <span className="text-amber-700 dark:text-amber-300 font-semibold">{t.metrics.actionItemsWarning}</span>
          ) : (
            <span className="text-slate-500 dark:text-zinc-400">{t.metrics.actionItemsAllGood}</span>
          )}
        </div>
      </div>

      {/* 4. Offerings & Accepted */}
      <div className="relative group overflow-hidden rounded-2xl p-5 bg-white dark:bg-gradient-to-br dark:from-[#121622] dark:to-[#0e1118] border border-slate-200/80 dark:border-zinc-800/80 hover:border-cyan-400 dark:hover:border-cyan-500/40 transition-all duration-300 shadow-sm shadow-slate-200/50 dark:shadow-lg dark:shadow-black/30">
        <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 dark:bg-cyan-500/5 rounded-full blur-2xl group-hover:bg-cyan-500/10 transition-colors pointer-events-none" />
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-zinc-400">
            {t.metrics.offersWon}
          </span>
          <div className="w-8 h-8 rounded-lg bg-cyan-50 dark:bg-cyan-950/80 border border-cyan-200 dark:border-cyan-800/40 flex items-center justify-center text-cyan-600 dark:text-cyan-400">
            <Award className="w-4 h-4" />
          </div>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-extrabold tracking-tight text-cyan-700 dark:text-cyan-300 font-mono">
            {isLoading ? '...' : metrics.offeringsCount}
          </span>
          <span className="text-xs text-slate-500 dark:text-zinc-400">{t.metrics.offersSubtitle}</span>
        </div>
        <div className="mt-3 flex items-center gap-1.5 text-xs text-cyan-700 dark:text-cyan-300/80">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-cyan-500 dark:bg-cyan-400" />
          <span>{t.metrics.offersFootnote}</span>
        </div>
      </div>
    </div>
  );
};
