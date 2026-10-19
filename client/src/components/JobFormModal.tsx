import React, { useState, useEffect } from 'react';
import { CreateJobDTO, JobStatus, JobType, WorkMode, Priority } from '@shared/schemas';
import { JobApplicationDTO } from '@shared/types';
import { CreateJobSchema } from '@shared/schemas';
import { STATUS_STYLE, JOB_TYPE_STYLES, WORK_MODE_STYLES, PRIORITY_STYLES } from '../constants/statusConfig';
import { X, Briefcase, Building, DollarSign, Calendar, MapPin, Globe, FileText, User, MessageCircle, AlertCircle } from 'lucide-react';
import { ZodError } from 'zod';
import { useLanguage } from '../context/LanguageContext';

interface JobFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CreateJobDTO) => Promise<void>;
  initialData?: JobApplicationDTO | null;
  defaultStatus?: JobStatus;
}

interface FormState {
  companyName: string;
  roleTitle: string;
  jobType: JobType;
  workMode: WorkMode;
  location: string;
  status: JobStatus;
  priority: Priority;
  salaryMin: string;
  salaryMax: string;
  currency: string;
  jobUrl: string;
  cvVersion: string;
  appliedDate: string;
  followUpDate: string;
  contactPerson: string;
  contactChannel: string;
  notes: string;
}

const defaultState: FormState = {
  companyName: '',
  roleTitle: '',
  jobType: 'FULL_TIME',
  workMode: 'REMOTE',
  location: '',
  status: 'APPLIED',
  priority: 'MEDIUM',
  salaryMin: '',
  salaryMax: '',
  currency: 'IDR',
  jobUrl: '',
  cvVersion: '',
  appliedDate: '',
  followUpDate: '',
  contactPerson: '',
  contactChannel: '',
  notes: '',
};

export const JobFormModal: React.FC<JobFormModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  defaultStatus,
}) => {
  const { language, t } = useLanguage();
  const [formData, setFormData] = useState<FormState>(defaultState);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData({
        companyName: initialData.companyName || '',
        roleTitle: initialData.roleTitle || '',
        jobType: initialData.jobType || 'FULL_TIME',
        workMode: initialData.workMode || 'REMOTE',
        location: initialData.location || '',
        status: initialData.status || 'APPLIED',
        priority: initialData.priority || 'MEDIUM',
        salaryMin: initialData.salaryMin != null ? String(initialData.salaryMin) : '',
        salaryMax: initialData.salaryMax != null ? String(initialData.salaryMax) : '',
        currency: initialData.currency || 'IDR',
        jobUrl: initialData.jobUrl || '',
        cvVersion: initialData.cvVersion || '',
        appliedDate: initialData.appliedDate ? initialData.appliedDate.substring(0, 10) : '',
        followUpDate: initialData.followUpDate ? initialData.followUpDate.substring(0, 10) : '',
        contactPerson: initialData.contactPerson || '',
        contactChannel: initialData.contactChannel || '',
        notes: initialData.notes || '',
      });
    } else {
      setFormData({
        ...defaultState,
        status: defaultStatus || 'APPLIED',
      });
    }
    setFieldErrors({});
  }, [initialData, defaultStatus, isOpen]);

  if (!isOpen) return null;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (fieldErrors[name]) {
      setFieldErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFieldErrors({});

    const minNum = formData.salaryMin.trim() !== '' ? Number(formData.salaryMin) : null;
    const maxNum = formData.salaryMax.trim() !== '' ? Number(formData.salaryMax) : null;

    const payloadToValidate: CreateJobDTO = {
      companyName: formData.companyName.trim(),
      roleTitle: formData.roleTitle.trim(),
      jobType: formData.jobType,
      workMode: formData.workMode,
      location: formData.location.trim() || null,
      status: formData.status,
      priority: formData.priority,
      salaryMin: minNum,
      salaryMax: maxNum,
      currency: formData.currency || 'IDR',
      jobUrl: formData.jobUrl.trim() || null,
      cvVersion: formData.cvVersion.trim() || null,
      appliedDate: formData.appliedDate ? new Date(formData.appliedDate).toISOString() : null,
      followUpDate: formData.followUpDate ? new Date(formData.followUpDate).toISOString() : null,
      contactPerson: formData.contactPerson.trim() || null,
      contactChannel: formData.contactChannel.trim() || null,
      notes: formData.notes.trim() || null,
    };

    const parseResult = CreateJobSchema.safeParse(payloadToValidate);

    if (!parseResult.success) {
      const err = parseResult.error as ZodError;
      const errors: Record<string, string> = {};
      for (const issue of err.issues) {
        const key = issue.path.join('.') || 'general';
        let message = issue.message;
        if (language === 'en') {
          if (issue.path.includes('salaryMax')) {
            message = 'Maximum salary must be greater than or equal to minimum salary';
          } else if (issue.path.includes('companyName')) {
            message = 'Company name is required';
          } else if (issue.path.includes('roleTitle')) {
            message = 'Job title/role is required';
          } else if (issue.path.includes('jobUrl')) {
            message = 'Invalid URL format';
          }
        }
        errors[key] = message;
      }
      setFieldErrors(errors);
      return;
    }

    try {
      setIsSubmitting(true);
      await onSubmit(parseResult.data);
      onClose();
    } catch (err: unknown) {
      console.error('Submit error:', err);
      const message = err instanceof Error ? err.message : (language === 'id' ? 'Gagal menyimpan data' : 'Failed to save data');
      setFieldErrors({ general: message });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-slate-900/40 dark:bg-black/75 backdrop-blur-sm transition-opacity"
      />

      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative w-full max-w-2xl rounded-2xl bg-white dark:bg-[#121520] border border-slate-200 dark:border-zinc-800 shadow-2xl overflow-hidden animate-fade-in text-left transition-colors">
          {/* Header */}
          <div className="p-6 border-b border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-[#161a27] flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight">
                {initialData ? t.modal.editTitle : t.modal.addTitle}
              </h3>
              <p className="text-xs text-slate-500 dark:text-zinc-400 mt-0.5">
                {t.modal.subtitle}
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-xl text-slate-400 hover:text-slate-800 hover:bg-slate-200 dark:text-zinc-400 dark:hover:text-white dark:hover:bg-zinc-800 transition-colors"
              aria-label="Tutup modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            {fieldErrors.general && (
              <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{fieldErrors.general}</span>
              </div>
            )}

            {/* Row 1: Company & Role */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-zinc-300 mb-1.5">
                  {t.modal.companyName} <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-zinc-500" />
                  <input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    placeholder={t.modal.companyPlaceholder}
                    className={`w-full bg-slate-50 dark:bg-[#0a0c12] border rounded-xl pl-9 pr-3 py-2 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-zinc-600 focus:outline-none focus:ring-1 focus:bg-white transition-all ${
                      fieldErrors.companyName
                        ? 'border-rose-500 focus:ring-rose-500'
                        : 'border-slate-200 dark:border-zinc-800 focus:border-indigo-500 focus:ring-indigo-500/20'
                    }`}
                  />
                </div>
                {fieldErrors.companyName && (
                  <p className="text-[11px] text-rose-500 mt-1">{fieldErrors.companyName}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-zinc-300 mb-1.5">
                  {t.modal.roleTitle} <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-zinc-500" />
                  <input
                    type="text"
                    name="roleTitle"
                    value={formData.roleTitle}
                    onChange={handleChange}
                    placeholder={t.modal.rolePlaceholder}
                    className={`w-full bg-slate-50 dark:bg-[#0a0c12] border rounded-xl pl-9 pr-3 py-2 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-zinc-600 focus:outline-none focus:ring-1 focus:bg-white transition-all ${
                      fieldErrors.roleTitle
                        ? 'border-rose-500 focus:ring-rose-500'
                        : 'border-slate-200 dark:border-zinc-800 focus:border-indigo-500 focus:ring-indigo-500/20'
                    }`}
                  />
                </div>
                {fieldErrors.roleTitle && (
                  <p className="text-[11px] text-rose-500 mt-1">{fieldErrors.roleTitle}</p>
                )}
              </div>
            </div>

            {/* Row 2: Status & Priority */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-zinc-300 mb-1.5">
                  {t.modal.status}
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full bg-slate-50 dark:bg-[#0a0c12] border border-slate-200 dark:border-zinc-800 focus:border-indigo-500 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:bg-white"
                >
                  {(Object.keys(STATUS_STYLE) as JobStatus[]).map((key) => (
                    <option key={key} value={key} className="bg-white text-slate-900 dark:bg-[#141824] dark:text-white">
                      {t.statuses[key].label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-zinc-300 mb-1.5">
                  {t.modal.priority}
                </label>
                <select
                  name="priority"
                  value={formData.priority}
                  onChange={handleChange}
                  className="w-full bg-slate-50 dark:bg-[#0a0c12] border border-slate-200 dark:border-zinc-800 focus:border-indigo-500 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:bg-white"
                >
                  {(Object.keys(PRIORITY_STYLES) as Priority[]).map((key) => (
                    <option key={key} value={key} className="bg-white text-slate-900 dark:bg-[#141824] dark:text-white">
                      {t.priorities[key]}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Row 3: Job Type, Work Mode, Location */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-zinc-300 mb-1.5">
                  {t.modal.jobType}
                </label>
                <select
                  name="jobType"
                  value={formData.jobType}
                  onChange={handleChange}
                  className="w-full bg-slate-50 dark:bg-[#0a0c12] border border-slate-200 dark:border-zinc-800 focus:border-indigo-500 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:bg-white"
                >
                  {(Object.keys(JOB_TYPE_STYLES) as JobType[]).map((key) => (
                    <option key={key} value={key} className="bg-white text-slate-900 dark:bg-[#141824] dark:text-white">
                      {t.jobTypes[key]}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-zinc-300 mb-1.5">
                  {t.modal.workMode}
                </label>
                <select
                  name="workMode"
                  value={formData.workMode}
                  onChange={handleChange}
                  className="w-full bg-slate-50 dark:bg-[#0a0c12] border border-slate-200 dark:border-zinc-800 focus:border-indigo-500 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:bg-white"
                >
                  {(Object.keys(WORK_MODE_STYLES) as WorkMode[]).map((key) => (
                    <option key={key} value={key} className="bg-white text-slate-900 dark:bg-[#141824] dark:text-white">
                      {t.workModes[key]}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-zinc-300 mb-1.5">
                  {t.modal.location}
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-zinc-500" />
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder={t.modal.locationPlaceholder}
                    className="w-full bg-slate-50 dark:bg-[#0a0c12] border border-slate-200 dark:border-zinc-800 focus:border-indigo-500 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-zinc-600 focus:outline-none focus:bg-white"
                  />
                </div>
              </div>
            </div>

            {/* Row 4: Salary Min, Salary Max, Currency */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-zinc-300 mb-1.5">
                  {t.modal.salaryMin}
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-zinc-500" />
                  <input
                    type="number"
                    name="salaryMin"
                    value={formData.salaryMin}
                    onChange={handleChange}
                    placeholder="misal: 25000000"
                    className="w-full bg-slate-50 dark:bg-[#0a0c12] border border-slate-200 dark:border-zinc-800 focus:border-indigo-500 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-zinc-600 focus:outline-none font-mono focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-zinc-300 mb-1.5">
                  {t.modal.salaryMax}
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-zinc-500" />
                  <input
                    type="number"
                    name="salaryMax"
                    value={formData.salaryMax}
                    onChange={handleChange}
                    placeholder="misal: 35000000"
                    className={`w-full bg-slate-50 dark:bg-[#0a0c12] border rounded-xl pl-9 pr-3 py-2 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-zinc-600 focus:outline-none font-mono focus:bg-white ${
                      fieldErrors.salaryMax
                        ? 'border-rose-500 focus:ring-rose-500'
                        : 'border-slate-200 dark:border-zinc-800 focus:border-indigo-500'
                    }`}
                  />
                </div>
                {fieldErrors.salaryMax && (
                  <p className="text-[11px] text-rose-500 mt-1">{fieldErrors.salaryMax}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-zinc-300 mb-1.5">
                  {t.modal.currency}
                </label>
                <input
                  type="text"
                  name="currency"
                  value={formData.currency}
                  onChange={handleChange}
                  placeholder="IDR"
                  className="w-full bg-slate-50 dark:bg-[#0a0c12] border border-slate-200 dark:border-zinc-800 focus:border-indigo-500 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white uppercase font-mono focus:outline-none focus:bg-white"
                />
              </div>
            </div>

            {/* Row 5: Job URL & CV Version */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-zinc-300 mb-1.5">
                  {t.modal.jobUrl}
                </label>
                <div className="relative">
                  <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-zinc-500" />
                  <input
                    type="url"
                    name="jobUrl"
                    value={formData.jobUrl}
                    onChange={handleChange}
                    placeholder="https://..."
                    className={`w-full bg-slate-50 dark:bg-[#0a0c12] border rounded-xl pl-9 pr-3 py-2 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-zinc-600 focus:outline-none focus:bg-white ${
                      fieldErrors.jobUrl ? 'border-rose-500' : 'border-slate-200 dark:border-zinc-800 focus:border-indigo-500'
                    }`}
                  />
                </div>
                {fieldErrors.jobUrl && (
                  <p className="text-[11px] text-rose-500 mt-1">{fieldErrors.jobUrl}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-zinc-300 mb-1.5">
                  {t.modal.cvVersion}
                </label>
                <div className="relative">
                  <FileText className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-zinc-500" />
                  <input
                    type="text"
                    name="cvVersion"
                    value={formData.cvVersion}
                    onChange={handleChange}
                    placeholder="misal: CV_Senior_Frontend_v4.2.pdf"
                    className="w-full bg-slate-50 dark:bg-[#0a0c12] border border-slate-200 dark:border-zinc-800 focus:border-indigo-500 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-zinc-600 focus:outline-none focus:bg-white"
                  />
                </div>
              </div>
            </div>

            {/* Row 6: Applied Date & Follow Up Date */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-zinc-300 mb-1.5">
                  {t.modal.appliedDate}
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-zinc-500" />
                  <input
                    type="date"
                    name="appliedDate"
                    value={formData.appliedDate}
                    onChange={handleChange}
                    className="w-full bg-slate-50 dark:bg-[#0a0c12] border border-slate-200 dark:border-zinc-800 focus:border-indigo-500 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-zinc-300 mb-1.5">
                  {t.modal.followUpDate}
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-zinc-500" />
                  <input
                    type="date"
                    name="followUpDate"
                    value={formData.followUpDate}
                    onChange={handleChange}
                    className="w-full bg-slate-50 dark:bg-[#0a0c12] border border-slate-200 dark:border-zinc-800 focus:border-indigo-500 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:bg-white"
                  />
                </div>
              </div>
            </div>

            {/* Row 7: Contact Person & Channel */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-zinc-300 mb-1.5">
                  {t.modal.contactPerson}
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-zinc-500" />
                  <input
                    type="text"
                    name="contactPerson"
                    value={formData.contactPerson}
                    onChange={handleChange}
                    placeholder={t.modal.contactPersonPlaceholder}
                    className="w-full bg-slate-50 dark:bg-[#0a0c12] border border-slate-200 dark:border-zinc-800 focus:border-indigo-500 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-zinc-600 focus:outline-none focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-zinc-300 mb-1.5">
                  {t.modal.contactChannel}
                </label>
                <div className="relative">
                  <MessageCircle className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-zinc-500" />
                  <input
                    type="text"
                    name="contactChannel"
                    value={formData.contactChannel}
                    onChange={handleChange}
                    placeholder={t.modal.contactChannelPlaceholder}
                    className="w-full bg-slate-50 dark:bg-[#0a0c12] border border-slate-200 dark:border-zinc-800 focus:border-indigo-500 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-zinc-600 focus:outline-none focus:bg-white"
                  />
                </div>
              </div>
            </div>

            {/* Row 8: Notes */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-zinc-300 mb-1.5">
                {t.modal.notes}
              </label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                rows={3}
                placeholder={t.modal.notesPlaceholder}
                className="w-full bg-slate-50 dark:bg-[#0a0c12] border border-slate-200 dark:border-zinc-800 focus:border-indigo-500 rounded-xl p-3 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-zinc-600 focus:outline-none resize-none leading-relaxed focus:bg-white"
              />
            </div>

            {/* Footer Buttons */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200 dark:border-zinc-800/80">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-zinc-400 dark:hover:text-white rounded-xl dark:hover:bg-zinc-800 transition-colors"
              >
                {t.modal.cancel}
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-5 py-2 text-xs font-semibold text-white rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 disabled:opacity-50 transition-all shadow-md shadow-indigo-900/30"
              >
                {isSubmitting
                  ? t.modal.submitting
                  : initialData
                  ? t.modal.saveChanges
                  : t.modal.submitNew}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
