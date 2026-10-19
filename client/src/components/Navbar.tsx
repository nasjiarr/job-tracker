import React from 'react';
import { Briefcase, Plus, Sparkles, Layers, Globe, Sun, Moon } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';

interface NavbarProps {
  totalJobs: number;
  onOpenCreateModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ totalJobs, onOpenCreateModal }) => {
  const { language, setLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200/80 dark:border-zinc-800/80 bg-white/85 dark:bg-[#0c0e14]/85 backdrop-blur-md transition-colors duration-200">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand / Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 p-[1px] shadow-lg shadow-indigo-500/20">
            <div className="w-full h-full bg-slate-100 dark:bg-[#0d1017] rounded-[11px] flex items-center justify-center transition-colors">
              <Briefcase className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-lg tracking-tight bg-gradient-to-r from-slate-900 via-slate-800 to-slate-600 dark:from-white dark:via-zinc-200 dark:to-zinc-400 bg-clip-text text-transparent">
                {t.navbar.title}
              </span>
              <span className="px-2 py-0.5 text-[10px] font-semibold tracking-wider uppercase rounded-full bg-indigo-50 dark:bg-indigo-950/70 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800/40">
                {t.navbar.badge}
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-zinc-400 flex items-center gap-1.5 hidden sm:flex">
              <Layers className="w-3 h-3 text-indigo-500 dark:text-indigo-400" />
              <span>{t.navbar.subtitle}</span>
            </p>
          </div>
        </div>

        {/* Center / Stats Pill */}
        <div className="hidden md:flex items-center gap-3 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-zinc-900/80 border border-slate-200 dark:border-zinc-800 text-xs text-slate-600 dark:text-zinc-300 transition-colors">
          <span className="flex items-center gap-1.5 font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse" />
            {t.navbar.apiConnected}
          </span>
          <span className="text-slate-300 dark:text-zinc-600">|</span>
          <span>
            <strong className="text-slate-900 dark:text-white font-semibold">{totalJobs}</strong> {t.navbar.totalApplications}
          </span>
        </div>

        {/* Right Actions: Theme Toggle, Language Switcher & New Application Button */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Theme Toggle Button (Light / Dark) */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-[#10131d] dark:hover:bg-zinc-800 border border-slate-200 dark:border-zinc-800 text-slate-600 hover:text-slate-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-all shadow-sm"
            title={theme === 'dark' ? t.navbar.themeToggleLight : t.navbar.themeToggleDark}
            aria-label={theme === 'dark' ? t.navbar.themeToggleLight : t.navbar.themeToggleDark}
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400 animate-fade-in" />
            ) : (
              <Moon className="w-4 h-4 text-indigo-600 animate-fade-in" />
            )}
          </button>

          {/* Language Switcher [ID | EN] */}
          <div className="flex items-center p-1 bg-slate-100 dark:bg-[#10131d] border border-slate-200 dark:border-zinc-800 rounded-xl shadow-inner transition-colors">
            <Globe className="w-3.5 h-3.5 text-slate-500 dark:text-zinc-400 ml-1.5 mr-1" />
            <button
              onClick={() => setLanguage('id')}
              className={`px-2 py-1 text-xs font-semibold rounded-lg transition-all ${
                language === 'id'
                  ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-600/50'
                  : 'text-slate-600 hover:text-slate-900 dark:text-zinc-400 dark:hover:text-zinc-200'
              }`}
              title="Bahasa Indonesia"
            >
              🇮🇩 ID
            </button>
            <button
              onClick={() => setLanguage('en')}
              className={`px-2 py-1 text-xs font-semibold rounded-lg transition-all ${
                language === 'en'
                  ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-600/50'
                  : 'text-slate-600 hover:text-slate-900 dark:text-zinc-400 dark:hover:text-zinc-200'
              }`}
              title="English"
            >
              🇬🇧 EN
            </button>
          </div>

          {/* Action Button */}
          <button
            onClick={onOpenCreateModal}
            className="group relative inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 text-sm font-semibold text-white rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-blue-600 hover:from-indigo-500 hover:to-blue-500 shadow-md shadow-indigo-900/20 dark:shadow-indigo-900/30 hover:shadow-indigo-600/40 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
          >
            <Plus className="w-4 h-4 transition-transform group-hover:rotate-90 duration-200" />
            <span className="hidden sm:inline">{t.navbar.addApplication}</span>
            <span className="sm:hidden">{language === 'id' ? 'Tambah' : 'Add'}</span>
            <Sparkles className="w-3.5 h-3.5 text-indigo-200 opacity-60 group-hover:opacity-100 transition-opacity" />
          </button>
        </div>
      </div>
    </header>
  );
};
