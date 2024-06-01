/*
  Warnings:

  - Changed the type of `year` on the `season` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "season" DROP COLUMN "year",
ADD COLUMN     "year" TIMESTAMP(3) NOT NULL;
