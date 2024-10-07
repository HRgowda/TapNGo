"use client"

import { useState } from "react";
import { Button } from "@repo/ui/button";

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

  const [currentPage, setCurrentPage] = useState(1);

  const transactions_per_page = 6;

  const totalPages = Math.ceil(transactionData.length / transactions_per_page);

  const index_of_last_transaction = currentPage * transactions_per_page;
  const index_of_first_transaction = index_of_last_transaction - transactions_per_page;
  const currentTransaction = transactionData.slice(index_of_first_transaction, index_of_last_transaction);

  const handlePrevious = () => {
    if (currentPage > 1){
      setCurrentPage(currentPage - 1)
    }
  }

  const handleNext = () => {
    if (currentPage < totalPages){
      setCurrentPage(currentPage + 1)
    }
  }

  const tableHeader = ["Id", "From", "To", "Amount", "Type", "Date"];

  return (
    <div className="min-h-screen bg-gray-900 text-white rounded-lg p-8 shadow-lg">
      <h1 className="text-3xl font-extrabold mb-4">Recent P2P Transactions</h1>
      <p className="text-gray-400 mb-8">Stay updated with your recent financial activity.</p>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-700 rounded-lg">
          <thead>
            <tr className="bg-gray-800">
              {tableHeader.map((name, index) => (
                <th key={index} className="px-6 py-4 text-center text-blue-300 text-sm font-semibold border-b border-gray-700">
                  {name}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="bg-gray-900 text-sm">
            {currentTransaction.map((transaction) => (
              <tr key={transaction.id} className="hover:bg-slate-700 transition-colors duration-100 ease-in-out">
                <td className="px-6 py-4 border-b border-gray-700 text-center">{transaction.id}</td>

                <td className="px-6 py-4 border-b border-gray-700 text-center">
                  {Number(currentUserId) === transaction.from.id ? "You" : transaction.from.name}
                </td>

                <td className="px-6 py-4 border-b border-gray-700 text-center">
                  {Number(currentUserId) === transaction.to.id ? "You" : transaction.to.name}
                </td>

                <td className="px-6 py-4 border-b border-gray-700 text-center">
                  ₹ {transaction.amount.toLocaleString()}
                </td>

                <td className="px-6 py-4 border-b border-gray-700 text-center">
                  <span
                    className={`px-3 py-2 rounded-full text-xs font-semibold text-center inline-block w-20 ${
                      Number(currentUserId) === transaction.from.id ? "bg-green-600 text-white" : "bg-blue-500 text-white"
                    }`}
                  >
                    {Number(currentUserId) === transaction.from.id ? "Sent" : "Received"}
                  </span>
                </td>

                <td className="px-6 py-4 border-b border-gray-700 text-center">
                  {new Date(transaction.date).toLocaleString([], {
                    year: "2-digit",
                    month: "2-digit",
                    day: "2-digit",
                    hour: "numeric",
                    minute: "numeric",
                    hour12: true,
                  })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex flex-row items-center justify-between mt-6">
        <button onClick={handlePrevious}
        disabled={currentPage === 1}
        className={`px-3 py-2 inline-block w-20 text-sm text-center rounded-lg bg-blue-600 hover:bg-blue-900 font-semibold focus:outline-none focus:ring-4 focus:ring-gray-300 ${currentPage === 1 ? "opacity:50 cursor-not-allowed" : ""
        }`}>
          Previous
        </button>
       
        <span className="font-semibold">
          {`< Page ${currentPage} of ${totalPages} >`}
        </span>

        <button onClick={handleNext}
        disabled={currentPage === totalPages}
        className={`px-3 py-2 rounded-lg inline-block w-20 text-center text-sm bg-blue-600 font-semibold hover:bg-blue-900 font-bold focus:outline-none focus:ring-4 focus:ring-gray-300  ${currentPage ===  totalPages ? "opcaity-50 cursor-not-allowed" : "" }`}>
          Next
        </button>

      </div>
    </div>
  );
}
