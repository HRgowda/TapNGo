/*
  Warnings:

  - Added the required column `goalType` to the `DepositGoals` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Balance" ALTER COLUMN "amount" SET DEFAULT 1000.00;

-- AlterTable
ALTER TABLE "DepositGoals" ADD COLUMN     "goalType" TEXT NOT NULL;
