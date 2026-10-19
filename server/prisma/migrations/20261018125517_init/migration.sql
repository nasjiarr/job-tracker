-- CreateTable
CREATE TABLE "JobApplication" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "companyName" TEXT NOT NULL,
    "roleTitle" TEXT NOT NULL,
    "jobType" TEXT NOT NULL,
    "workMode" TEXT NOT NULL,
    "location" TEXT,
    "status" TEXT NOT NULL,
    "priority" TEXT NOT NULL,
    "salaryMin" REAL,
    "salaryMax" REAL,
    "currency" TEXT NOT NULL DEFAULT 'IDR',
    "jobUrl" TEXT,
    "cvVersion" TEXT,
    "appliedDate" DATETIME,
    "followUpDate" DATETIME,
    "contactPerson" TEXT,
    "contactChannel" TEXT,
    "notes" TEXT,
    "positionOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "ApplicationTimeline" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "jobApplicationId" INTEGER NOT NULL,
    "fromStatus" TEXT,
    "toStatus" TEXT NOT NULL,
    "note" TEXT,
    "eventDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "ApplicationTimeline_jobApplicationId_fkey" FOREIGN KEY ("jobApplicationId") REFERENCES "JobApplication" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
