-- CreateTable
CREATE TABLE "account_event" (
    "account_id" TEXT NOT NULL,
    "event_id" INTEGER NOT NULL,

    CONSTRAINT "account_event_pkey" PRIMARY KEY ("account_id","event_id")
);

-- AddForeignKey
ALTER TABLE "account_event" ADD CONSTRAINT "account_event_account_id_fkey" FOREIGN KEY ("account_id") REFERENCES "account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "account_event" ADD CONSTRAINT "account_event_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
