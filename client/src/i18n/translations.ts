import { JobStatus, JobType, WorkMode, Priority } from '@shared/types';

export type Language = 'id' | 'en';

export interface TranslationDictionary {
  navbar: {
    title: string;
    badge: string;
    subtitle: string;
    apiConnected: string;
    totalApplications: string;
    addApplication: string;
    themeLight: string;
    themeDark: string;
    themeToggleLight: string;
    themeToggleDark: string;
  };
  metrics: {
    activePipeline: string;
    activeSubtitle: string;
    activeFootnote: string;
    interviewRate: string;
    interviewSubtitle: string;
    interviewFootnote: string;
    actionItemsDue: string;
    actionItemsSubtitle: string;
    actionItemsWarning: string;
    actionItemsAllGood: string;
    offersWon: string;
    offersSubtitle: string;
    offersFootnote: string;
  };
  controlBar: {
    searchPlaceholder: string;
    showingData: string;
    kanbanView: string;
    tableView: string;
    filterBy: string;
    allStatuses: string;
    allPriorities: string;
    allWorkModes: string;
    allJobTypes: string;
    resetFilter: string;
  };
  kanban: {
    emptyColumn: string;
    addNew: string;
    addTooltip: string;
    dragHelper: string;
  };
  card: {
    noDate: string;
    logCount: string;
    edit: string;
    delete: string;
    confirmDelete: string;
  };
  table: {
    colCompanyRole: string;
    colStatus: string;
    colPriority: string;
    colTypeMode: string;
    colSalary: string;
    colAppliedDate: string;
    colFollowUp: string;
    colActions: string;
    emptySearch: string;
    viewDetail: string;
    editTooltip: string;
    deleteTooltip: string;
    confirmDelete: string;
  };
  drawer: {
    openJobUrl: string;
    edit: string;
    delete: string;
    close: string;
    confirmDelete: string;
    sectionCompensation: string;
    sectionTypeMode: string;
    sectionLocation: string;
    notSpecified: string;
    sectionCvVersion: string;
    sectionAppliedDate: string;
    sectionFollowUp: string;
    sectionRecruiter: string;
    sectionNotes: string;
    timelineTitle: string;
    timelineCount: string;
    newNotePlaceholder: string;
    savingNote: string;
    saveNote: string;
    emptyTimeline: string;
  };
  modal: {
    addTitle: string;
    editTitle: string;
    subtitle: string;
    companyName: string;
    companyPlaceholder: string;
    roleTitle: string;
    rolePlaceholder: string;
    status: string;
    priority: string;
    jobType: string;
    workMode: string;
    location: string;
    locationPlaceholder: string;
    salaryMin: string;
    salaryMax: string;
    currency: string;
    jobUrl: string;
    cvVersion: string;
    appliedDate: string;
    followUpDate: string;
    contactPerson: string;
    contactPersonPlaceholder: string;
    contactChannel: string;
    contactChannelPlaceholder: string;
    notes: string;
    notesPlaceholder: string;
    cancel: string;
    submitting: string;
    saveChanges: string;
    submitNew: string;
  };
  toasts: {
    statusUpdatedTitle: string;
    movedSuccess: (company: string, status: string) => string;
    moveFailed: string;
    createSuccess: (company: string) => string;
    updateSuccess: (company: string) => string;
    deleteSuccess: (company?: string) => string;
    deleteError: string;
    timelineSuccess: string;
    loadError: string;
  };
  statuses: Record<JobStatus, { label: string; description: string }>;
  priorities: Record<Priority, string>;
  workModes: Record<WorkMode, string>;
  jobTypes: Record<JobType, string>;
  salaryRange: {
    confidential: string;
    startingFrom: (amount: string) => string;
    upTo: (amount: string) => string;
    month: string;
  };
  followUp: {
    overdue: string;
    dueToday: string;
  };
}

export const translations: Record<Language, TranslationDictionary> = {
  id: {
    navbar: {
      title: 'CareerFlow',
      badge: 'PRO CRM',
      subtitle: 'Full-Stack Career Application Tracker',
      apiConnected: 'API Terhubung',
      totalApplications: 'Total Lamaran',
      addApplication: 'Tambah Lamaran',
      themeLight: 'Terang',
      themeDark: 'Gelap',
      themeToggleLight: 'Ganti ke Tema Terang',
      themeToggleDark: 'Ganti ke Tema Gelap',
    },
    metrics: {
      activePipeline: 'Pipeline Aktif',
      activeSubtitle: 'lamaran sedang berjalan',
      activeFootnote: 'Tahap Wishlist hingga Offering',
      interviewRate: 'Konversi Interview',
      interviewSubtitle: 'dari total lamaran terkirim',
      interviewFootnote: 'Mencapai wawancara HR / Teknis',
      actionItemsDue: 'Follow-up Jatuh Tempo',
      actionItemsSubtitle: 'jadwal follow-up hari ini / terlewat',
      actionItemsWarning: '⚠️ Perlu di-follow up segera!',
      actionItemsAllGood: 'Semua checkpoint recruiter aman',
      offersWon: 'Penawaran & Diterima',
      offersSubtitle: 'posisi offering / accepted',
      offersFootnote: 'Pencapaian tahap final',
    },
    controlBar: {
      searchPlaceholder: 'Cari perusahaan, posisi, atau lokasi...',
      showingData: 'Menampilkan',
      kanbanView: 'Kanban',
      tableView: 'Tabel',
      filterBy: 'Filter:',
      allStatuses: 'Semua Status',
      allPriorities: 'Semua Prioritas',
      allWorkModes: 'Semua Work Mode',
      allJobTypes: 'Semua Tipe Kerja',
      resetFilter: 'Reset Filter',
    },
    kanban: {
      emptyColumn: 'Tidak ada lamaran di tahap ini',
      addNew: '+ Tambah baru',
      addTooltip: 'Tambah lamaran ke',
      dragHelper: 'Geser kartu antar kolom untuk mengubah status secara instan',
    },
    card: {
      noDate: 'Belum submit',
      logCount: 'log',
      edit: 'Edit',
      delete: 'Hapus',
      confirmDelete: 'Yakin ingin menghapus lamaran ini?',
    },
    table: {
      colCompanyRole: 'Perusahaan & Posisi',
      colStatus: 'Status (Ubah Cepat)',
      colPriority: 'Prioritas',
      colTypeMode: 'Tipe & Mode',
      colSalary: 'Estimasi Gaji',
      colAppliedDate: 'Tanggal Apply',
      colFollowUp: 'Follow Up',
      colActions: 'Aksi',
      emptySearch: 'Tidak ada lowongan yang sesuai dengan kriteria filter pencarian.',
      viewDetail: 'Buka Detail',
      editTooltip: 'Edit Lamaran',
      deleteTooltip: 'Hapus Lamaran',
      confirmDelete: 'Hapus lamaran ini?',
    },
    drawer: {
      openJobUrl: 'Buka URL Lowongan',
      edit: 'Edit Lamaran',
      delete: 'Hapus Lamaran',
      close: 'Tutup',
      confirmDelete: 'Yakin ingin menghapus lamaran ini?',
      sectionCompensation: 'Kompensasi / Gaji',
      sectionTypeMode: 'Work Mode & Tipe',
      sectionLocation: 'Lokasi Kerja',
      notSpecified: 'Tidak ditentukan',
      sectionCvVersion: 'Versi CV Terkirim',
      sectionAppliedDate: 'Tanggal Melamar',
      sectionFollowUp: 'Jadwal Follow Up',
      sectionRecruiter: 'Kontak Recruiter / PIC',
      sectionNotes: 'Catatan Pribadi & Persiapan Interview',
      timelineTitle: 'Histori & Timeline Progres',
      timelineCount: 'aktivitas tercatat',
      newNotePlaceholder: 'Tambah catatan progres, hasil wawancara, atau touchpoint baru...',
      savingNote: 'Menyimpan...',
      saveNote: 'Simpan',
      emptyTimeline: 'Belum ada histori tercatat untuk lowongan ini.',
    },
    modal: {
      addTitle: 'Tambah Lamaran Pekerjaan Baru',
      editTitle: 'Edit Lamaran Pekerjaan',
      subtitle: 'Simpan dan kelola lowongan ke dalam pipeline Career CRM',
      companyName: 'Nama Perusahaan',
      companyPlaceholder: 'misal: Gojek, Traveloka, Shopee',
      roleTitle: 'Posisi / Jabatan',
      rolePlaceholder: 'misal: Senior Frontend Engineer',
      status: 'Status Pipeline',
      priority: 'Tingkat Prioritas',
      jobType: 'Tipe Pekerjaan',
      workMode: 'Work Mode',
      location: 'Lokasi / Kota',
      locationPlaceholder: 'misal: Jakarta Selatan, Remote',
      salaryMin: 'Gaji Minimal',
      salaryMax: 'Gaji Maksimal',
      currency: 'Mata Uang',
      jobUrl: 'URL Lowongan / Portal',
      cvVersion: 'Versi CV yang Digunakan',
      appliedDate: 'Tanggal Melamar',
      followUpDate: 'Target Tanggal Follow Up',
      contactPerson: 'Nama Recruiter / PIC',
      contactPersonPlaceholder: 'misal: Sarah (Talent Partner)',
      contactChannel: 'Kanal Kontak',
      contactChannelPlaceholder: 'WhatsApp / Email',
      notes: 'Catatan Persiapan & Riset Lowongan',
      notesPlaceholder: 'Rincian stack teknologi, poin penting job description, catatan salary...',
      cancel: 'Batal',
      submitting: 'Menyimpan...',
      saveChanges: 'Simpan Perubahan',
      submitNew: 'Tambah Lamaran',
    },
    toasts: {
      statusUpdatedTitle: 'Status Diperbarui',
      movedSuccess: (company, status) => `${company} dipindahkan ke ${status}`,
      moveFailed: 'Gagal memindahkan kartu lowongan, perubahan dibatalkan',
      createSuccess: (company) => `Lowongan baru di ${company} berhasil ditambahkan`,
      updateSuccess: (company) => `Data lowongan di ${company} berhasil diperbarui`,
      deleteSuccess: (company) => `Lamaran ${company ? `di ${company}` : ''} telah dihapus`,
      deleteError: 'Gagal menghapus lowongan',
      timelineSuccess: 'Catatan timeline baru berhasil disimpan',
      loadError: 'Gagal memuat data dari server',
    },
    statuses: {
      WISHLIST: { label: 'Disimpan (Wishlist)', description: 'Disimpan untuk dilamar nanti' },
      APPLIED: { label: 'Sudah Dilamar', description: 'Berkas dan CV telah berhasil dikirim' },
      OA_TEST: { label: 'Tes Teknis / Online', description: 'Sedang mengerjakan tes teknis, OA, atau take-home task' },
      INTERVIEW_HR: { label: 'Wawancara HR', description: 'Tahap screening call & kecocokan budaya HR' },
      INTERVIEW_USER: { label: 'Wawancara User / Teknis', description: 'Wawancara teknis mendalam & live coding dengan tim user' },
      OFFERING: { label: 'Penawaran Kerja (Offering)', description: 'Menerima surat penawaran kerja resmi' },
      ACCEPTED: { label: 'Diterima & Tanda Tangan', description: 'Telah menyetujui penawaran & tanda tangan kontrak' },
      REJECTED: { label: 'Ditolak', description: 'Tidak lanjut ke tahapan rekrutmen berikutnya' },
      GHOSTED: { label: 'Tanpa Kabar (Ghosted)', description: 'Tidak ada respons lanjutan lebih dari 30 hari' },
    },
    priorities: {
      HIGH: 'Prioritas Tinggi',
      MEDIUM: 'Prioritas Sedang',
      LOW: 'Prioritas Rendah',
    },
    workModes: {
      REMOTE: 'Jarak Jauh (Remote)',
      HYBRID: 'Campuran (Hybrid)',
      ONSITE: 'Di Kantor (Onsite)',
    },
    jobTypes: {
      FULL_TIME: 'Penuh Waktu (Full-time)',
      CONTRACT: 'Kontrak (Contract)',
      PART_TIME: 'Paruh Waktu (Part-time)',
      FREELANCE: 'Pekerja Lepas (Freelance)',
      INTERNSHIP: 'Magang (Internship)',
    },
    salaryRange: {
      confidential: 'Gaji dirahasiakan / Negosiasi',
      startingFrom: (amount) => `Mulai ${amount} / bln`,
      upTo: (amount) => `Hingga ${amount} / bln`,
      month: '/ bln',
    },
    followUp: {
      overdue: 'Follow-up Terlewat',
      dueToday: 'Follow-up Hari Ini!',
    },
  },
  en: {
    navbar: {
      title: 'CareerFlow',
      badge: 'PRO CRM',
      subtitle: 'Full-Stack Career Application Tracker',
      apiConnected: 'API Connected',
      totalApplications: 'Total Applications',
      addApplication: 'Add Application',
      themeLight: 'Light',
      themeDark: 'Dark',
      themeToggleLight: 'Switch to Light Theme',
      themeToggleDark: 'Switch to Dark Theme',
    },
    metrics: {
      activePipeline: 'Active Pipeline',
      activeSubtitle: 'active applications in flight',
      activeFootnote: 'Wishlist to Offering stages',
      interviewRate: 'Interview Conversion',
      interviewSubtitle: 'of submitted applications',
      interviewFootnote: 'Reached HR / Technical round',
      actionItemsDue: 'Action Items Due',
      actionItemsSubtitle: 'follow-ups due today / overdue',
      actionItemsWarning: '⚠️ Requires recruiter touchpoint!',
      actionItemsAllGood: 'All recruiter checkpoints up-to-date',
      offersWon: 'Offers & Won',
      offersSubtitle: 'offering / accepted roles',
      offersFootnote: 'Final stage achievement',
    },
    controlBar: {
      searchPlaceholder: 'Search company, role, or location...',
      showingData: 'Showing',
      kanbanView: 'Kanban',
      tableView: 'Table',
      filterBy: 'Filter:',
      allStatuses: 'All Statuses',
      allPriorities: 'All Priorities',
      allWorkModes: 'All Work Modes',
      allJobTypes: 'All Job Types',
      resetFilter: 'Reset Filters',
    },
    kanban: {
      emptyColumn: 'No applications in this stage',
      addNew: '+ Add new',
      addTooltip: 'Add application to',
      dragHelper: 'Drag and drop cards across columns to update stage instantly',
    },
    card: {
      noDate: 'Not submitted',
      logCount: 'logs',
      edit: 'Edit',
      delete: 'Delete',
      confirmDelete: 'Are you sure you want to delete this application?',
    },
    table: {
      colCompanyRole: 'Company & Role',
      colStatus: 'Status (Quick Change)',
      colPriority: 'Priority',
      colTypeMode: 'Type & Mode',
      colSalary: 'Salary Estimate',
      colAppliedDate: 'Applied Date',
      colFollowUp: 'Follow Up',
      colActions: 'Actions',
      emptySearch: 'No applications found matching the search criteria.',
      viewDetail: 'View Detail',
      editTooltip: 'Edit Application',
      deleteTooltip: 'Delete Application',
      confirmDelete: 'Delete this application?',
    },
    drawer: {
      openJobUrl: 'Open Job Posting',
      edit: 'Edit Application',
      delete: 'Delete Application',
      close: 'Close',
      confirmDelete: 'Are you sure you want to delete this application?',
      sectionCompensation: 'Compensation / Salary',
      sectionTypeMode: 'Work Mode & Type',
      sectionLocation: 'Job Location',
      notSpecified: 'Not specified',
      sectionCvVersion: 'CV Version Submitted',
      sectionAppliedDate: 'Applied Date',
      sectionFollowUp: 'Follow Up Schedule',
      sectionRecruiter: 'Recruiter / PIC Contact',
      sectionNotes: 'Personal Notes & Interview Prep',
      timelineTitle: 'Progress History & Timeline',
      timelineCount: 'recorded activities',
      newNotePlaceholder: 'Add interview feedback, recruiter updates, or touchpoints...',
      savingNote: 'Saving...',
      saveNote: 'Save',
      emptyTimeline: 'No activity history recorded yet for this application.',
    },
    modal: {
      addTitle: 'Add New Job Application',
      editTitle: 'Edit Job Application',
      subtitle: 'Save and manage roles in your Career CRM pipeline',
      companyName: 'Company Name',
      companyPlaceholder: 'e.g. Stripe, Google, Airbnb',
      roleTitle: 'Job Title / Role',
      rolePlaceholder: 'e.g. Senior Frontend Engineer',
      status: 'Pipeline Status',
      priority: 'Priority Level',
      jobType: 'Job Type',
      workMode: 'Work Mode',
      location: 'Location / City',
      locationPlaceholder: 'e.g. Remote, New York, Singapore',
      salaryMin: 'Minimum Salary',
      salaryMax: 'Maximum Salary',
      currency: 'Currency',
      jobUrl: 'Job Posting URL',
      cvVersion: 'CV Version Used',
      appliedDate: 'Applied Date',
      followUpDate: 'Follow-Up Target Date',
      contactPerson: 'Recruiter / Contact Person',
      contactPersonPlaceholder: 'e.g. Sarah (Talent Partner)',
      contactChannel: 'Contact Channel',
      contactChannelPlaceholder: 'WhatsApp / Email',
      notes: 'Notes & Interview Preparation',
      notesPlaceholder: 'Tech stack details, key requirements, salary expectations...',
      cancel: 'Cancel',
      submitting: 'Saving...',
      saveChanges: 'Save Changes',
      submitNew: 'Add Application',
    },
    toasts: {
      statusUpdatedTitle: 'Status Updated',
      movedSuccess: (company, status) => `${company} moved to ${status}`,
      moveFailed: 'Failed to move application card, changes reverted',
      createSuccess: (company) => `New application at ${company} added successfully`,
      updateSuccess: (company) => `Application at ${company} updated successfully`,
      deleteSuccess: (company) => `Application ${company ? `at ${company}` : ''} deleted`,
      deleteError: 'Failed to delete application',
      timelineSuccess: 'New timeline note recorded successfully',
      loadError: 'Failed to load data from server',
    },
    statuses: {
      WISHLIST: { label: 'Wishlist', description: 'Saved for future application' },
      APPLIED: { label: 'Applied', description: 'Application & resume submitted' },
      OA_TEST: { label: 'OA / Coding Test', description: 'Taking technical test / assessment' },
      INTERVIEW_HR: { label: 'HR Interview', description: 'Recruiter screening & culture fit' },
      INTERVIEW_USER: { label: 'User Interview', description: 'Technical deep-dive & live pairing' },
      OFFERING: { label: 'Offering', description: 'Official offer letter received' },
      ACCEPTED: { label: 'Accepted', description: 'Employment contract signed' },
      REJECTED: { label: 'Rejected', description: 'Application not moving forward' },
      GHOSTED: { label: 'No Response', description: 'No communication received >30 days' },
    },
    priorities: {
      HIGH: 'High Priority',
      MEDIUM: 'Medium Priority',
      LOW: 'Low Priority',
    },
    workModes: {
      REMOTE: 'Remote',
      HYBRID: 'Hybrid',
      ONSITE: 'Onsite',
    },
    jobTypes: {
      FULL_TIME: 'Full-time',
      CONTRACT: 'Contract',
      PART_TIME: 'Part-time',
      FREELANCE: 'Freelance',
      INTERNSHIP: 'Internship',
    },
    salaryRange: {
      confidential: 'Salary confidential / Negotiable',
      startingFrom: (amount) => `From ${amount} / mo`,
      upTo: (amount) => `Up to ${amount} / mo`,
      month: '/ mo',
    },
    followUp: {
      overdue: 'Overdue Follow-up',
      dueToday: 'Follow-up Due Today!',
    },
  },
};
