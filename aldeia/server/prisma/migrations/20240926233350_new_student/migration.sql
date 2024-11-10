/*
  Warnings:

  - You are about to drop the column `observability` on the `Student` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Student" DROP COLUMN "observability",
ADD COLUMN     "observation" TEXT;
