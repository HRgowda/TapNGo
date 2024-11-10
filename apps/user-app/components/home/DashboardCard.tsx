import { CreditCard } from "@components/home/CardUi";
import { Card } from "@repo/ui/card";
import Link from "next/link";

export function Dashboard({ fullName, card, balance }: any) {
  return (
    <div className="w-full px-4 lg:px-0 text-white">
      <Card title="">
        <div className="flex flex-col lg:flex-row lg:space-x-8">
          <div className="w-full lg:w-2/3 flex flex-col">
            <h2 className="text-xl lg:text-2xl font-semibold">Hello, {fullName}! Your financial freedom starts here</h2>
            <div className="intro-text text-base lg:text-lg text-gray-600 mt-2 text-center lg:text-start">
              Let’s get started on another productive day together!
            </div>
            <div className="flex flex-col lg:flex-row justify-center mt-8 gap-8 p-4 lg:p-6">
              <div className="w-full lg:w-1/2">
                <div className="font-light text-xl lg:text-2xl">Available Balance</div>
                <div className="font-semibold text-2xl lg:text-3xl mt-2">₹{balance.amount}</div>
              </div>
              <div className="w-full lg:w-1/2">
                <div className="font-light text-xl lg:text-2xl">Locked Balance</div>
                <div className="font-semibold text-2xl lg:text-3xl mt-2">₹{balance.locked}</div>
              </div>
            </div>
          </div>
          {card ? (
            <div className="w-full lg:w-1/3 flex items-center justify-center mt-8 lg:mt-0">
              <CreditCard name={fullName} cardNumber={card?.cardNumber} validity={card?.validDate} expiry={card?.expiryDate} cvv={Number(card?.cvv)} />
            </div>
          ) : (
            <Link href="card_data">
              <button className="w-full h-full p-4 flex flex-col justify-center items-center text-3xl font-bold text-green-200 border-2 border-blue-300 rounded-2xl border-dashed cursor-pointer transition duration-200 hover:scale-105">
                <div>+</div>
                <div>Add New Card</div>
              </button>
            </Link>
          )}
        </div>
      </Card>
    </div>
  );
}