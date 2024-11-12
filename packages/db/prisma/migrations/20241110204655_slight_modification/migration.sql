/*
  Warnings:

  - You are about to drop the column `auth_type` on the `Merchant` table. All the data in the column will be lost.
  - You are about to drop the column `number` on the `User` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "User_number_key";

-- AlterTable
ALTER TABLE "Merchant" DROP COLUMN "auth_type";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "number";

-- DropEnum
DROP TYPE "AuthType";
