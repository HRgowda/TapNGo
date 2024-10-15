/*
  Warnings:

  - You are about to alter the column `amount` on the `Balance` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - You are about to alter the column `goalAmount` on the `DepositGoals` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Integer`.
  - You are about to alter the column `currentSavings` on the `DepositGoals` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Integer`.
  - You are about to alter the column `amount` on the `OnRampTransaction` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - You are about to alter the column `amount` on the `p2pTransfer` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.

*/
-- AlterTable
ALTER TABLE "Balance" ALTER COLUMN "amount" SET DEFAULT 100000,
ALTER COLUMN "amount" SET DATA TYPE INTEGER;

-- AlterTable
ALTER TABLE "DepositGoals" ALTER COLUMN "goalAmount" SET DATA TYPE INTEGER,
ALTER COLUMN "currentSavings" SET DEFAULT 0,
ALTER COLUMN "currentSavings" SET DATA TYPE INTEGER;

-- AlterTable
ALTER TABLE "OnRampTransaction" ALTER COLUMN "amount" SET DATA TYPE INTEGER;

-- AlterTable
ALTER TABLE "p2pTransfer" ALTER COLUMN "amount" SET DATA TYPE INTEGER;
