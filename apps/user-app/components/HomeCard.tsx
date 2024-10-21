// components/DashboardCard.tsx
import { CardUi } from "@components/CardUi";
import { Card } from "@repo/ui/card";

export function DashboardCard({ fullName, card, balance }: any) {
  return (
    <div className="mt-2 w-fill">
      <Card title="">
        <div className="flex space-x-8">
          {/* Left Grid */}
          <div className="w-2/3 flex flex-col">
            {/* Welcome Message */}
            <h2 className="text-2xl font-bold">
              Hello, {fullName}! Your financial freedom starts here
            </h2>
            {/* Centered Intro Text */}
            <div className="intro-text text-lg text-gray-600 text-start mt-2">
              Let’s get started on another productive day together!
            </div>

            {/* Balance Section */}
            <div className="flex justify-center mt-8 gap-8 p-6">
              <div className="w-1/2">
                <div className="font-medium text-2xl">Available Balance</div>
                <div className="font-semibold text-4xl mt-2">₹{balance.amount}</div>
              </div>

              <div className="w-1/2">
                <div className="font-medium text-2xl">Locked Balance</div>
                <div className="font-semibold text-4xl mt-2">₹{balance.locked}</div>
              </div>
            </div>
          </div>

          {/* Right Grid */}
          <div className="w-1/3 flex items-center justify-center">
            <CardUi
              name={fullName}
              cardNumber={card?.cardNumber}
              validity={card?.validDate}
              expiry={card?.expiryDate}
              cvv={Number(card?.cvv)}
            />
          </div>
        </div>
      </Card>
    </div>
  );
}
