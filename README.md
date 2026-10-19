# 💼 CareerFlow — Job Application Tracker & Career CRM

> Production-ready, 100% type-safe Full-Stack TypeScript web application built with **Express.js**, **React 18 (Vite)**, **Prisma ORM**, and **Shared Zod Contracts**.

[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18-61dafb.svg)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-6-646cff.svg)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-38bdf8.svg)](https://tailwindcss.com/)
[![Express](https://img.shields.io/badge/Express-4.21-000000.svg)](https://expressjs.com/)
[![Prisma](https://img.shields.io/badge/Prisma-6.4-2D3748.svg)](https://www.prisma.io/)

---

## 🚀 Key Features

1. **Strict Type Safety & Shared Contracts (`/shared`):**
   - Single source of truth with Zod schemas and inferred TypeScript types (`z.infer`).
   - Zero `any` types throughout backend and frontend.

2. **Interactive Kanban Board (`@hello-pangea/dnd`):**
   - 9 pipeline stages: *Wishlist, Sudah Dilamar, Tes Teknis/Online, Wawancara HR, Wawancara User/Teknis, Penawaran Kerja (Offering), Diterima, Ditolak, Tanpa Kabar (Ghosted)*.
   - **Optimistic UI Updates**: Cards update instantly on drag-and-drop; changes persist atomically to the database with rollback on network failure.

3. **Structured Data Table View:**
   - Sortable columns (Company, Role, Status, Priority, Salary, Applied Date, Follow-up).
   - Inline status dropdown for quick status transitions without leaving the table.
   - Smart follow-up indicators highlighting overdue or due-today touchpoints.

4. **Bento Metrics Dashboard:**
   - Real-time KPI cards: Active Pipeline, Interview Conversion Rate, Action Items Due, and Offers & Won.

5. **Slide-Over Detail Drawer & Vertical Timeline:**
   - Deep-dive panel with salary, recruiter contacts, CV versions, and notes.
   - **Chronological Vertical Timeline**: Visual history of every status transition (`fromStatus -> toStatus`) with interactive form to add progress notes.

6. **Bilingual Support (ID & EN):**
   - Instant language switching between **Bahasa Indonesia (`🇮🇩 ID`)** and **English (`🇬🇧 EN`)**.
   - Persisted across sessions via `localStorage`.

7. **Dual Theme (Light & Dark Mode):**
   - Sleek modern dark mode (zinc/slate/indigo) and clean light mode (soft backgrounds, white cards, high contrast).
   - Instant toggle with persistence in `localStorage`.

8. **Transactional Audit Logging:**
   - All status transitions are recorded within database transactions (`prisma.$transaction`).

---

## 📁 Monorepo Architecture

```
job-tracker/
├── shared/                 # Shared Zod schemas, enums & TypeScript DTOs
│   ├── schemas.ts          # Zod validation schemas
│   ├── types.ts            # Inferred DTO interfaces & API responses
│   └── index.ts            # Barrel export
├── server/                 # Express.js TypeScript Backend
│   ├── prisma/
│   │   ├── schema.prisma   # SQLite database models
│   │   └── seed.ts         # Seeder with 12 realistic job applications
│   └── src/
│       ├── controllers/    # Type-safe controller handlers
│       ├── middleware/     # Generic Zod validation middleware
│       ├── routes/         # Express API routes
│       └── app.ts          # Express app configuration
└── client/                 # React 18 + Vite Frontend
    └── src/
        ├── api/            # Typed Axios client layer referencing @shared
        ├── components/     # UI Components (Kanban, Table, Drawer, Modal, Bento)
        ├── context/        # ThemeContext and LanguageContext
        ├── i18n/           # Translation dictionaries (ID / EN)
        └── constants/      # Status styling configurations
```

---

## 🛠️ Getting Started

### Prerequisites
- Node.js (v18+)
- npm (v9+)

### Installation

1. **Clone repository:**
   ```bash
   git clone https://github.com/nasjiarr/job-tracker.git
   cd job-tracker
   ```

2. **Install all dependencies:**
   ```bash
   npm install
   npm --prefix shared install
   npm --prefix server install
   npm --prefix client install
   ```

3. **Initialize Database & Seed Data:**
   ```bash
   cd server
   npx prisma migrate dev --name init
   npx tsx prisma/seed.ts
   cd ..
   ```

4. **Run Backend & Frontend Concurrently:**
   ```bash
   npm run dev
   ```

5. **Open in Browser:**
   - Frontend: [http://localhost:5173](http://localhost:5173)
   - Backend API: [http://localhost:5000/api/jobs](http://localhost:5000/api/jobs)

---

## 🧪 Verification & Typechecking

Run full monorepo typecheck across all workspaces:
```bash
npm run typecheck
```

Build client bundle for production:
```bash
npm run build:client
```

---

## 📄 License
MIT License. Built with ❤️ for career growth.
