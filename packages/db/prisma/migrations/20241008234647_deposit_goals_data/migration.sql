-- CreateTable
CREATE TABLE "DepositGoals" (
    "id" SERIAL NOT NULL,
    "userid" INTEGER NOT NULL,
    "goalAmount" DECIMAL(65,30) NOT NULL,
    "currentSavings" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "deadline" TIMESTAMP(3) NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'Active',

    CONSTRAINT "DepositGoals_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "DepositGoals" ADD CONSTRAINT "DepositGoals_userid_fkey" FOREIGN KEY ("userid") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
