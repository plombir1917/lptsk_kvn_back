-- CreateTable
CREATE TABLE "team_event" (
    "team_id" INTEGER NOT NULL,
    "event_id" INTEGER NOT NULL,
    "team_place" INTEGER NOT NULL,

    CONSTRAINT "team_event_pkey" PRIMARY KEY ("team_id","event_id")
);

-- AddForeignKey
ALTER TABLE "team_event" ADD CONSTRAINT "team_event_team_id_fkey" FOREIGN KEY ("team_id") REFERENCES "team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "team_event" ADD CONSTRAINT "team_event_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
