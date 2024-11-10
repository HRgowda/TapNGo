/*
  Warnings:

  - Added the required column `expiresAt` to the `otp` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "otp" ADD COLUMN     "expiresAt" TIMESTAMP(3) NOT NULL;
