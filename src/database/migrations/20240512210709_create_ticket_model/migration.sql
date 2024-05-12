-- CreateTable
CREATE TABLE "ticket" (
    "id" SERIAL NOT NULL,
    "price" INTEGER NOT NULL,
    "is_free" BOOLEAN NOT NULL,

    CONSTRAINT "ticket_pkey" PRIMARY KEY ("id")
);
