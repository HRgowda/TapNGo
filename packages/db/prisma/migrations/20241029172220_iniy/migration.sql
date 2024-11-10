/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `otp` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "otp_id_key" ON "otp"("id");
