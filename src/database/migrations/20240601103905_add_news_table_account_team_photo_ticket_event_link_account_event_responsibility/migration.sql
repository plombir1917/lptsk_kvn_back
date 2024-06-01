/*
  Warnings:

  - Added the required column `photo` to the `account` table without a default value. This is not possible if the table is not empty.
  - Added the required column `link` to the `event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `photo` to the `team` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "account" ADD COLUMN     "photo" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "event" ADD COLUMN     "link" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "team" ADD COLUMN     "photo" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "news" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "photo" TEXT NOT NULL,
    "season_id" INTEGER NOT NULL,

    CONSTRAINT "news_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "news" ADD CONSTRAINT "news_season_id_fkey" FOREIGN KEY ("season_id") REFERENCES "season"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
