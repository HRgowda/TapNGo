/*
  Warnings:

  - The values [Succes] on the enum `onrampStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "onrampStatus_new" AS ENUM ('Success', 'Failure', 'Processing');
ALTER TABLE "OnRampTransaction" ALTER COLUMN "status" TYPE "onrampStatus_new" USING ("status"::text::"onrampStatus_new");
ALTER TYPE "onrampStatus" RENAME TO "onrampStatus_old";
ALTER TYPE "onrampStatus_new" RENAME TO "onrampStatus";
DROP TYPE "onrampStatus_old";
COMMIT;
