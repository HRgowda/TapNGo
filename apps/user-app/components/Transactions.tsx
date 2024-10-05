interface Transaction {
  
  id: number;
  amount: number;
  date: string | Date;
  from: {
    id: number;
    name: string;
  };
  to: {
    id: number;
    name: string;
  };
}

interface currentUser{
  id: number;
}

interface TransactionProps {
  transactionData: Transaction[];
  currentUserId: currentUser;
}

export function Transactions({ transactionData, currentUserId }: TransactionProps) {

  const tableHeader = ["Id", "From", "To", "Amount", "Date"];

  return (
    <div className="min-h-screen bg-gray-900 text-white rounded-lg p-6">
      <h1 className="text-2xl font-bold mb-2">Recent Transactions</h1>
      <p className="text-gray-400 mb-6">Stay updated with your recent financial activity.</p>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-700 rounded-lg">
          <thead className="bg-gray-800">
            <tr>
              {tableHeader.map((name, index) => (
                <th key={index} className="px-4 py-3 text-left text-gray-300 border-b border-gray-600">
                  {name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-gray-900">
            {transactionData.map((transaction) => (
              <tr key={transaction.id} className="hover:bg-gray-800 transition-colors duration-200">
                <td className="px-4 py-3 border-b border-gray-600">{transaction.id}</td>
                <td className="px-4 py-3 border-b border-gray-600">

                  {Number(currentUserId) === transaction.from.id ? "You" : transaction.from.name}

                </td>
                <td className="px-4 py-3 border-b border-gray-600">

                  {Number(currentUserId) === transaction.to.id ? "You" : transaction.to.name}

                  </td>
                <td className="px-4 py-3 border-b border-gray-600">Rs {transaction.amount}</td>
                <td className="px-4 py-3 border-b border-gray-600">{new Date(transaction.date).toLocaleString([], {
                  year: '2-digit', month: '2-digit', day: '2-digit',
                  hour: 'numeric', minute: 'numeric', hour12: true
                })}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
