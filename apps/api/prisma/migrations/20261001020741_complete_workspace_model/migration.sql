/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `Workspace` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `Workspace` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "WorkspaceVisibility" AS ENUM ('PRIVATE', 'PUBLIC');

-- CreateEnum
CREATE TYPE "WorkspacePlan" AS ENUM ('FREE', 'PRO', 'TEAM', 'ENTERPRISE');

-- AlterTable
ALTER TABLE "Workspace" ADD COLUMN     "bannerUrl" TEXT,
ADD COLUMN     "isArchived" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "logoUrl" TEXT,
ADD COLUMN     "plan" "WorkspacePlan" NOT NULL DEFAULT 'FREE',
ADD COLUMN     "slug" TEXT NOT NULL,
ADD COLUMN     "visibility" "WorkspaceVisibility" NOT NULL DEFAULT 'PRIVATE';

-- CreateIndex
CREATE UNIQUE INDEX "Workspace_slug_key" ON "Workspace"("slug");

-- CreateIndex
CREATE INDEX "Workspace_visibility_idx" ON "Workspace"("visibility");
