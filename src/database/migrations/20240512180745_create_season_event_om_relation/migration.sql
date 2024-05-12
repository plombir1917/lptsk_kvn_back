-- AlterTable
ALTER TABLE "event" ADD COLUMN     "season_id" INTEGER;

-- AddForeignKey
ALTER TABLE "event" ADD CONSTRAINT "event_season_id_fkey" FOREIGN KEY ("season_id") REFERENCES "season"("id") ON DELETE SET NULL ON UPDATE CASCADE;
