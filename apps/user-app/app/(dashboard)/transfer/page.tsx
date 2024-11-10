import { SendCard } from "@components/transfer/SendCard";
import { LatestActions } from "@components/transfer/LatestActions";
import { fetchUsersExceptCurrentUser, fetchUserTransactions, fetchUserBalance, fetchAllUsersExceptCurrent } from "app/lib/server_actions/userDatabase";

export default async function Home() {
  const balance = await fetchUserBalance();
  const fiveUsers = await fetchUsersExceptCurrentUser();
  const allUsers = await fetchAllUsersExceptCurrent()
  const transactionedNames = await fetchUserTransactions();

  return (
    <div className="w-full p-2">
      <SendCard balance={Number(balance?.amount)} userDetails={allUsers} />
      <div className="mt-2">
        <LatestActions users={transactionedNames} allUsers={fiveUsers} />
      </div>
    </div>
  );
}
