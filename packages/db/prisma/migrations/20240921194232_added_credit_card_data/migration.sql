-- CreateTable
CREATE TABLE "Card" (
    "id" SERIAL NOT NULL,
    "cardNumber" TEXT NOT NULL,
    "validDate" TEXT NOT NULL,
    "expiryDate" TEXT NOT NULL,
    "cvv" INTEGER NOT NULL,

    CONSTRAINT "Card_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Card" ADD CONSTRAINT "Card_cardNumber_fkey" FOREIGN KEY ("cardNumber") REFERENCES "User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;
