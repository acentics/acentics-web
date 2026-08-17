/*
  Warnings:

  - Added the required column `countryCode` to the `Client` table without a default value. This is not possible if the table is not empty.
  - Made the column `phone` on table `Client` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateTable
CREATE TABLE "UpdateLog" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "clientId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "note" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "UpdateLog_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "SupportTicket" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "clientId" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "priority" TEXT NOT NULL DEFAULT 'normal',
    "status" TEXT NOT NULL DEFAULT 'open',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "SupportTicket_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Client" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "fullName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "company" TEXT,
    "countryCode" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "requirement" TEXT NOT NULL,
    "projectType" TEXT NOT NULL,
    "billingCycle" TEXT,
    "projectCost" REAL,
    "projectStatus" TEXT NOT NULL DEFAULT 'planning',
    "projectProgress" INTEGER NOT NULL DEFAULT 0,
    "lastUpdateAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "emailVerified" BOOLEAN NOT NULL DEFAULT false,
    "emailVerifyToken" TEXT,
    "emailVerifyExpires" DATETIME,
    "relationshipManagerId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Client_relationshipManagerId_fkey" FOREIGN KEY ("relationshipManagerId") REFERENCES "RelationshipManager" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Client" ("billingCycle", "company", "countryCode", "createdAt", "email", "fullName", "id", "password", "phone", "projectCost", "projectType", "relationshipManagerId", "requirement") SELECT "billingCycle", "company", '+91', "createdAt", "email", "fullName", "id", "password", COALESCE("phone", 'Not provided'), "projectCost", "projectType", "relationshipManagerId", "requirement" FROM "Client";
DROP TABLE "Client";
ALTER TABLE "new_Client" RENAME TO "Client";
CREATE UNIQUE INDEX "Client_email_key" ON "Client"("email");
CREATE UNIQUE INDEX "Client_emailVerifyToken_key" ON "Client"("emailVerifyToken");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
