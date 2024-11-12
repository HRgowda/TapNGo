"use client";

import { useState } from "react";

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

interface TransactionProps {
  transactionData: Transaction[];
  currentUserId: number;
}

export function Transactions({ transactionData, currentUserId }: TransactionProps) {
  const [currentPage, setCurrentPage] = useState(1);

  const transactions_per_page = 7;
  const totalPages = Math.ceil(transactionData.length / transactions_per_page);

  const index_of_last_transaction = currentPage * transactions_per_page;
  const index_of_first_transaction = index_of_last_transaction - transactions_per_page;
  const currentTransaction = transactionData.slice(
    index_of_first_transaction,
    index_of_last_transaction
  );

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const tableHeader = ["Id", "From", "To", "Amount", "Type", "Date"];

  return (
    <div className="min-h-screen w-full bg-gray-900 text-white rounded-lg p-6 md:p-8 shadow-lg hover:shadow-lg hover:shadow-white/50">
      <div className="text-2xl md:text-3xl font-extrabold mb-4 text-start">
        Recent P2P Transactions
      </div>
      <div className="text-gray-400 mb-8 text-start">
        Stay updated with your recent financial activity.
      </div>

      {/* Table for larger screens */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full border border-gray-700 rounded-lg">
          <thead>
            <tr className="bg-gray-800">
              {tableHeader.map((name, index) => (
                <th
                  key={index}
                  className="px-4 md:px-6 py-3 text-center text-blue-300 text-xs md:text-sm font-semibold border-b border-gray-700"
                >
                  {name}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="bg-gray-900 text-xs md:text-sm">
            {currentTransaction.map((transaction, index) => (
              <tr
                key={transaction.id}
                className="hover:bg-slate-700 transition-colors duration-100 ease-in-out"
              >
                <td className="px-4 md:px-6 py-3 border-b border-gray-700 text-center">
                  {index_of_first_transaction + index + 1}
                </td>

                <td className="px-4 md:px-6 py-3 border-b border-gray-700 text-center">
                  {Number(currentUserId) === transaction.from.id ? "You" : transaction.from.name}
                </td>

                <td className="px-4 md:px-6 py-3 border-b border-gray-700 text-center">
                  {Number(currentUserId) === transaction.to.id ? "You" : transaction.to.name}
                </td>

                <td className="px-4 md:px-6 py-3 border-b border-gray-700 text-center">
                  ₹ {transaction.amount}
                </td>

                <td className="px-4 md:px-6 py-3 border-b border-gray-700 text-center">
                  <span
                    className={`px-3 py-2 rounded-full text-xs font-semibold inline-block w-20 ${
                      Number(currentUserId) === transaction.from.id
                        ? "bg-green-600 text-white"
                        : "bg-blue-500 text-white"
                    }`}
                  >
                    {Number(currentUserId) === transaction.from.id ? "Sent" : "Received"}
                  </span>
                </td>

                <td className="px-4 md:px-6 py-3 border-b border-gray-700 text-center">
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

      {/* Table for smaller screens */}
      <div className="md:hidden overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-800">
              {tableHeader.map((name, index) => (
                <th
                  key={index}
                  className="px-2 py-2 text-center text-blue-300 text-xs font-semibold border-b border-gray-700"
                >
                  {name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-gray-900 text-xs">
            {currentTransaction.map((transaction, index) => (
              <tr
                key={transaction.id}
                className="hover:bg-slate-700 transition-colors duration-100 ease-in-out"
              >
                <td className="px-2 py-2 text-center border-b border-gray-700">
                  {index_of_first_transaction + index + 1}
                </td>
                <td className="px-2 py-2 text-center border-b border-gray-700">
                  {Number(currentUserId) === transaction.from.id ? "You" : transaction.from.name}
                </td>
                <td className="px-2 py-2 text-center border-b border-gray-700">
                  {Number(currentUserId) === transaction.to.id ? "You" : transaction.to.name}
                </td>
                <td className="px-2 py-2 text-center border-b border-gray-700">
                  ₹ {transaction.amount}
                </td>
                <td className="px-2 py-2 text-center border-b border-gray-700">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold inline-block w-20 ${
                      Number(currentUserId) === transaction.from.id
                        ? "bg-green-600 text-white"
                        : "bg-blue-500 text-white"
                    }`}
                  >
                    {Number(currentUserId) === transaction.from.id ? "Sent" : "Received"}
                  </span>
                </td>
                <td className="px-2 py-2 text-center border-b border-gray-700">
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

      {/* Pagination */}
      <div className="flex flex-col md:flex-row items-center justify-between mt-6 space-y-4 md:space-y-0">
        <button
          onClick={handlePrevious}
          disabled={currentPage === 1}
          className={`px-4 py-2 inline-block w-full md:w-28 text-sm text-center rounded-lg bg-blue-600 hover:bg-blue-900 font-semibold focus:outline-none focus:ring-4 focus:ring-gray-300 ${
            currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          Previous
        </button>

        <span className="font-semibold">
          {`< Page ${currentPage} of ${totalPages} >`}
        </span>

        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 rounded-lg inline-block w-full md:w-28 text-center text-sm bg-blue-600 font-semibold hover:bg-blue-900 focus:outline-none focus:ring-4 focus:ring-gray-300 ${
            currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
}
