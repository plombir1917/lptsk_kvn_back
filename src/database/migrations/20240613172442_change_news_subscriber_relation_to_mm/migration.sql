/*
  Warnings:

  - You are about to drop the column `news_id` on the `subscriber` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "subscriber" DROP CONSTRAINT "subscriber_news_id_fkey";

-- AlterTable
ALTER TABLE "subscriber" DROP COLUMN "news_id";

-- CreateTable
CREATE TABLE "news_subscriber" (
    "news_id" INTEGER NOT NULL,
    "subscriber_id" TEXT NOT NULL,

    CONSTRAINT "news_subscriber_pkey" PRIMARY KEY ("news_id","subscriber_id")
);

-- AddForeignKey
ALTER TABLE "news_subscriber" ADD CONSTRAINT "news_subscriber_news_id_fkey" FOREIGN KEY ("news_id") REFERENCES "news"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "news_subscriber" ADD CONSTRAINT "news_subscriber_subscriber_id_fkey" FOREIGN KEY ("subscriber_id") REFERENCES "subscriber"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
