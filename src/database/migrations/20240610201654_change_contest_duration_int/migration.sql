/*
  Warnings:

  - Changed the type of `duration` on the `contest` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "contest" DROP COLUMN "duration",
ADD COLUMN     "duration" INTEGER NOT NULL;
