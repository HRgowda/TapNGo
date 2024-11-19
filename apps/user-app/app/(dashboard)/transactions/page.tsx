import { Transactions } from "@components/Transactions";
import { fetchUserP2PTransactions } from "app/lib/server_actions/p2pTxnDatabase"; 
import { getLoggedUser } from "app/lib/server_actions/userDatabase"

export default async function TransactionsPage() {
  const loggedUser = await getLoggedUser();

  if (!loggedUser) {
    return <div className="text-white font-bold text-4xl flex items-center">Please log in to view transactions.</div>;
  }

  const p2p = await fetchUserP2PTransactions(loggedUser);

  return (
      <div className=" lg:p-2">
        <Transactions transactionData={p2p} currentUserId={loggedUser} />
      </div>
  );
}
