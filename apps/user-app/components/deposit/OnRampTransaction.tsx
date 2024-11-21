import { Card } from "@repo/ui/card";

export const OnRampTransactions = ({ transactions }: { transactions: any[] }) => {
  if (!transactions.length) {
    return (
      <div className="rounded-xl transition-shadow hover:shadow-lg hover:shadow-white/20">
        <Card title="Recent Transactions">
          <div className="h-60 text-center text-white text-lg pb-8 pt-8">
            No Recent deposits, consider making some deposits.
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="rounded-xl transition-shadow hover:shadow-lg hover:shadow-white/10">
      <Card title="Recent Bank Transactions">
        <div className="p-2 h-60 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-800 scrollbar-thumb-rounded-md scrollbar-transition duration-200 ease-in-out hover:scrollbar-thumb-gray-600">
          {transactions.map((t, index): any => (
            <div key={index} className="flex justify-between border-b border-gray-700 py-2">
              <div className="p-2">
                <div className="text-sm text-white">Deposited INR</div>
                <div className="text-slate-600 text-xs">{t.time.toDateString()}</div>
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
};
