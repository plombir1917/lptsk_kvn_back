/*
  Warnings:

  - You are about to drop the column `is_free` on the `ticket` table. All the data in the column will be lost.
  - Added the required column `responsibility` to the `account_event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `link` to the `ticket` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "account_event" ADD COLUMN     "responsibility" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "ticket" DROP COLUMN "is_free",
ADD COLUMN     "link" TEXT NOT NULL;
