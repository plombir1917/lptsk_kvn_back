/*
  Warnings:

  - You are about to drop the column `team_place` on the `team_event` table. All the data in the column will be lost.
  - Added the required column `team_rate` to the `team_event` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "team_event" DROP COLUMN "team_place",
ADD COLUMN     "team_rate" DOUBLE PRECISION NOT NULL;
