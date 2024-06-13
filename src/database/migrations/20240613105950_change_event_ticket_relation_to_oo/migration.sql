/*
  Warnings:

  - A unique constraint covering the columns `[event_id]` on the table `ticket` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ticket_event_id_key" ON "ticket"("event_id");
