/*
  Warnings:

  - Made the column `rate` on table `team` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "team" ALTER COLUMN "rate" SET NOT NULL,
ALTER COLUMN "rate" SET DEFAULT 0;
