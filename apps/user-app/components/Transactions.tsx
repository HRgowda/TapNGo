"use client"

import { Card } from "@repo/ui/card";

interface onRampProps {
  time: Date;
  amount: number;
  status: string;
}

interface p2pProps {
  amount: number;
  timestamp: Date;
  fromUserId: number;
  
}

interface transactionProps {
  banktxn: onRampProps[];
  p2ptxn: p2pProps[];
  currentId: number
}

export function Transactions({ banktxn = [], p2ptxn = [], currentId }: transactionProps) {

  if (!banktxn.length && !p2ptxn.length) {
    return (
      <Card title="Transactions">
        <div className="text-center pb-8">
          No recent transactions
        </div>
      </Card>
    );
  }

  if (!banktxn.length) {
    return (
      <div className="p-8 flex justify-evenly">
        <Card title="Bank Transactions">
          <div className="text-center pb-8">
            No recent bank transactions
          </div>
        </Card>

        <Card title="P2P Transactions">
          <div className="pt-2 w-[60vh]">
            {p2ptxn.map(tx => (
              <div className="py-2 flex justify-between" key={tx.timestamp.toString()}>
                <div>
                  <div className="text-sm font-semibold">
                    {/* ternary operation */}
                    {currentId === tx.fromUserId ? "Sent INR" : "Recieved INR"}
                  </div>
                  <div>
                    {tx.timestamp.toDateString()}
                  </div>
                </div>
                <div className="flex justify-center flex-col">
                  +Rs{tx.amount / 100}
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    );
  }

  if (!p2ptxn.length) {
    return (
      <div className="p-8 flex justify-evenly">
        <Card title="Bank Transactions">
          <div className="pt-2 w-[60vh]">
            {banktxn.map(tx => (
              <div className="py-2 flex justify-between" key={tx.time.toString()}>
                <div>
                  <div className="text-sm font-semibold">
                    Received INR
                  </div>
                  <div>
                    {tx.time.toDateString()}
                  </div>
                </div>
                <div className="flex justify-center flex-col">
                  +Rs{tx.amount / 100}
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card title="P2P Transactions">
          <div className="text-center pb-8">
            No recent P2P transactions
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-8 flex justify-evenly">
      <Card title="Bank Transactions">
        <div className="pt-2 w-[60vh]">
          {banktxn.map(tx => (
            <div className="py-2 flex justify-between" key={tx.time.toString()}>
              <div>
                <div className="text-sm font-semibold">
                  Received INR
                </div>
                <div>
                  {tx.time.toDateString()}
                </div>
              </div>
              <div className="flex justify-center flex-col">
                +Rs{tx.amount / 100}
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card title="P2P Transactions">
        <div className="pt-2 w-[60vh]">
          {p2ptxn.map(tx => (
            <div className="py-2 flex justify-between" key={tx.timestamp.toString()}>
              <div>
                <div className="text-sm font-semibold">
                {currentId == tx.fromUserId ? "Sent INR" : "Recieved INR"}
                </div>
                <div>
                  {tx.timestamp.toDateString()}
                </div>
              </div>
              <div className="flex justify-center flex-col">
                +Rs{tx.amount / 100}
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
