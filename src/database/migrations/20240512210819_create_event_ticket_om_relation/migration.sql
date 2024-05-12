/*
  Warnings:

  - Added the required column `event_id` to the `ticket` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ticket" ADD COLUMN     "event_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "ticket" ADD CONSTRAINT "ticket_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
