import { Card } from "@repo/ui/card"

export const OnRampTransactions = ({
    transactions
}: {
    transactions: {
        time: Date,
        amount: any,
        status: string,
        provider: string
    }[]
}) => {
    if (!transactions.length) {
        return <Card title="Recent Transactions">
            <div className="text-center pb-8 pt-8">
                No Recent transactions
            </div>
        </Card>
    }
    return (
        <div className="">
        <Card title="Recent Bank Transactions">
          <div className="p-2 max-h-60 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-800 scrollbar-thumb-rounded">
            {transactions.map((t, index) => (
              <div key={index} className="flex justify-between border-b border-gray-700 py-2">
                <div className="p-2">
                  <div className="text-sm text-white">
                    Received INR
                  </div>
                  <div className="text-slate-600 text-xs">
                    {t.time.toDateString()}
                  </div>
                </div>
                <div className="flex flex-col justify-center text-green-300 font-bold">
                  + Rs {t.amount}
                </div>
              </div>
            ))}
          </div>
        </Card>
    </div>
    );      
}