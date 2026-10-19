import { JobStatus, JobType, WorkMode, Priority } from '@shared/types';
import { Language, translations } from '../i18n/translations';

export interface StatusStyleItem {
  badgeBg: string;
  badgeText: string;
  badgeBorder: string;
  dotColor: string;
  columnBorder: string;
}

export const STATUS_STYLE: Record<JobStatus, StatusStyleItem> = {
  WISHLIST: {
    badgeBg: 'bg-slate-100 dark:bg-zinc-800/80',
    badgeText: 'text-slate-700 dark:text-zinc-300',
    badgeBorder: 'border-slate-300 dark:border-zinc-700/60',
    dotColor: 'bg-slate-500 dark:bg-zinc-400',
    columnBorder: 'border-slate-200 dark:border-zinc-800',
  },
  APPLIED: {
    badgeBg: 'bg-blue-50 dark:bg-blue-950/60',
    badgeText: 'text-blue-700 dark:text-blue-300',
    badgeBorder: 'border-blue-200 dark:border-blue-800/50',
    dotColor: 'bg-blue-500 dark:bg-blue-400',
    columnBorder: 'border-blue-200 dark:border-blue-900/40',
  },
  OA_TEST: {
    badgeBg: 'bg-amber-50 dark:bg-amber-950/60',
    badgeText: 'text-amber-800 dark:text-amber-300',
    badgeBorder: 'border-amber-200 dark:border-amber-800/50',
    dotColor: 'bg-amber-500 dark:bg-amber-400',
    columnBorder: 'border-amber-200 dark:border-amber-900/40',
  },
  INTERVIEW_HR: {
    badgeBg: 'bg-purple-50 dark:bg-purple-950/60',
    badgeText: 'text-purple-700 dark:text-purple-300',
    badgeBorder: 'border-purple-200 dark:border-purple-800/50',
    dotColor: 'bg-purple-500 dark:bg-purple-400',
    columnBorder: 'border-purple-200 dark:border-purple-900/40',
  },
  INTERVIEW_USER: {
    badgeBg: 'bg-indigo-50 dark:bg-indigo-950/60',
    badgeText: 'text-indigo-700 dark:text-indigo-300',
    badgeBorder: 'border-indigo-200 dark:border-indigo-800/50',
    dotColor: 'bg-indigo-500 dark:bg-indigo-400',
    columnBorder: 'border-indigo-200 dark:border-indigo-900/40',
  },
  OFFERING: {
    badgeBg: 'bg-emerald-50 dark:bg-emerald-950/60',
    badgeText: 'text-emerald-700 dark:text-emerald-300',
    badgeBorder: 'border-emerald-200 dark:border-emerald-800/50',
    dotColor: 'bg-emerald-500 dark:bg-emerald-400',
    columnBorder: 'border-emerald-200 dark:border-emerald-900/40',
  },
  ACCEPTED: {
    badgeBg: 'bg-teal-50 dark:bg-teal-950/70',
    badgeText: 'text-teal-700 dark:text-teal-200',
    badgeBorder: 'border-teal-200 dark:border-teal-700/60',
    dotColor: 'bg-teal-500 dark:bg-teal-400',
    columnBorder: 'border-teal-200 dark:border-teal-900/40',
  },
  REJECTED: {
    badgeBg: 'bg-rose-50 dark:bg-rose-950/60',
    badgeText: 'text-rose-700 dark:text-rose-300',
    badgeBorder: 'border-rose-200 dark:border-rose-800/50',
    dotColor: 'bg-rose-500 dark:bg-rose-400',
    columnBorder: 'border-rose-200 dark:border-rose-900/40',
  },
  GHOSTED: {
    badgeBg: 'bg-slate-100 dark:bg-neutral-900/80',
    badgeText: 'text-slate-600 dark:text-neutral-400',
    badgeBorder: 'border-slate-300 dark:border-neutral-800',
    dotColor: 'bg-slate-400 dark:bg-neutral-500',
    columnBorder: 'border-slate-200 dark:border-neutral-800',
  },
};

export const JOB_TYPE_STYLES: Record<JobType, { color: string }> = {
  FULL_TIME: { color: 'text-sky-700 bg-sky-50 border-sky-200 dark:text-sky-300 dark:bg-sky-950/50 dark:border-sky-800/40' },
  CONTRACT: { color: 'text-violet-700 bg-violet-50 border-violet-200 dark:text-violet-300 dark:bg-violet-950/50 dark:border-violet-800/40' },
  PART_TIME: { color: 'text-amber-700 bg-amber-50 border-amber-200 dark:text-yellow-300 dark:bg-yellow-950/50 dark:border-yellow-800/40' },
  FREELANCE: { color: 'text-pink-700 bg-pink-50 border-pink-200 dark:text-pink-300 dark:bg-pink-950/50 dark:border-pink-800/40' },
  INTERNSHIP: { color: 'text-cyan-700 bg-cyan-50 border-cyan-200 dark:text-cyan-300 dark:bg-cyan-950/50 dark:border-cyan-800/40' },
};

export const WORK_MODE_STYLES: Record<WorkMode, { color: string }> = {
  REMOTE: { color: 'text-emerald-700 bg-emerald-50 border-emerald-200 dark:text-emerald-300 dark:bg-emerald-950/50 dark:border-emerald-800/40' },
  HYBRID: { color: 'text-blue-700 bg-blue-50 border-blue-200 dark:text-blue-300 dark:bg-blue-950/50 dark:border-blue-800/40' },
  ONSITE: { color: 'text-orange-700 bg-orange-50 border-orange-200 dark:text-orange-300 dark:bg-orange-950/50 dark:border-orange-800/40' },
};

export const PRIORITY_STYLES: Record<Priority, { color: string; dotColor: string }> = {
  HIGH: { color: 'text-rose-700 bg-rose-50 border-rose-200 dark:text-rose-400 dark:bg-rose-950/50 dark:border-rose-800/40', dotColor: 'bg-rose-500 dark:bg-rose-400' },
  MEDIUM: { color: 'text-amber-700 bg-amber-50 border-amber-200 dark:text-amber-400 dark:bg-amber-950/50 dark:border-amber-800/40', dotColor: 'bg-amber-500 dark:bg-amber-400' },
  LOW: { color: 'text-slate-600 bg-slate-100 border-slate-200 dark:text-zinc-400 dark:bg-zinc-900 dark:border-zinc-700/40', dotColor: 'bg-slate-400 dark:bg-zinc-400' },
};

export const formatCurrency = (amount: number | null | undefined, currency = 'IDR'): string => {
  if (amount == null) return '-';
  if (currency === 'IDR') {
    if (amount >= 1000000) {
      const millions = amount / 1000000;
      return `Rp ${millions % 1 === 0 ? millions : millions.toFixed(1)}jt`;
    }
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(amount);
  }
  return new Intl.NumberFormat('en-US', { style: 'currency', currency, maximumFractionDigits: 0 }).format(amount);
};

export const formatSalaryRange = (
  min: number | null,
  max: number | null,
  currency = 'IDR',
  lang: Language = 'id'
): string => {
  const dict = translations[lang].salaryRange;
  if (min == null && max == null) return dict.confidential;
  if (min != null && max != null) {
    if (min === max) return `${formatCurrency(min, currency)} ${dict.month}`;
    return `${formatCurrency(min, currency)} - ${formatCurrency(max, currency)} ${dict.month}`;
  }
  if (min != null) return dict.startingFrom(formatCurrency(min, currency));
  return dict.upTo(formatCurrency(max, currency));
};

export const formatDate = (dateString: string | null | undefined, lang: Language = 'id'): string => {
  if (!dateString) return '-';
  const d = new Date(dateString);
  if (isNaN(d.getTime())) return '-';
  return new Intl.DateTimeFormat(lang === 'id' ? 'id-ID' : 'en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(d);
};

export const formatDateTime = (dateString: string | null | undefined, lang: Language = 'id'): string => {
  if (!dateString) return '-';
  const d = new Date(dateString);
  if (isNaN(d.getTime())) return '-';
  return new Intl.DateTimeFormat(lang === 'id' ? 'id-ID' : 'en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(d);
};

export const isFollowUpDue = (
  dateString: string | null | undefined,
  lang: Language = 'id'
): { isDue: boolean; isPast: boolean; label: string } => {
  if (!dateString) return { isDue: false, isPast: false, label: '' };
  const target = new Date(dateString);
  const now = new Date();
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
  const targetStart = new Date(target.getFullYear(), target.getMonth(), target.getDate()).getTime();

  const followUpDict = translations[lang].followUp;

  if (targetStart < todayStart) {
    return { isDue: true, isPast: true, label: followUpDict.overdue };
  }
  if (targetStart === todayStart) {
    return { isDue: true, isPast: false, label: followUpDict.dueToday };
  }
  return { isDue: false, isPast: false, label: '' };
};
