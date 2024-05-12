-- CreateTable
CREATE TABLE "contest" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "duration" TIME NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "contest_pkey" PRIMARY KEY ("id")
);
