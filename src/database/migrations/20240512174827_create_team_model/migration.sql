-- CreateTable
CREATE TABLE "team" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "achievments" TEXT,
    "home" TEXT NOT NULL,
    "rate" INTEGER,
    "active" BOOLEAN NOT NULL,

    CONSTRAINT "team_pkey" PRIMARY KEY ("id")
);
