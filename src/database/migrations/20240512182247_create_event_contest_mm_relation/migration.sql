-- CreateTable
CREATE TABLE "event_contest" (
    "event_id" INTEGER NOT NULL,
    "contest_id" INTEGER NOT NULL,

    CONSTRAINT "event_contest_pkey" PRIMARY KEY ("event_id","contest_id")
);

-- AddForeignKey
ALTER TABLE "event_contest" ADD CONSTRAINT "event_contest_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "event_contest" ADD CONSTRAINT "event_contest_contest_id_fkey" FOREIGN KEY ("contest_id") REFERENCES "contest"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
