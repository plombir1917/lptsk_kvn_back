-- CreateTable
CREATE TABLE "subscriber" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "news_id" INTEGER NOT NULL,

    CONSTRAINT "subscriber_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "subscriber" ADD CONSTRAINT "subscriber_news_id_fkey" FOREIGN KEY ("news_id") REFERENCES "news"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
