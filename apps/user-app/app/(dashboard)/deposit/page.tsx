import { AddMoney } from "@components/deposit/AddMoneyCrad";
import { OnRampTransactions } from "@components/deposit/OnRampTransaction";
import { InitialGoalUi } from "@components/deposit/InitalGoal_Info";
import { getServerSession } from "next-auth";
import { authOptions } from "app/lib/auth";
import { FinalGoalUi } from "@components/deposit/FinalGoal_Info";
import { getOnRampTransactions } from "app/lib/server_actions/bankDatabase";
import { getUserDataWithDepositGoals } from "app/lib/server_actions/userDatabase";

type DepositGoal = {
  id: number;
  goalAmount: number;
  currentSaving: number;
  deadline: Date;
  goalType: string;
};

export default async function DepositPage() {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id ? Number(session.user.id) : null;

  if (!userId) {
    return <div className="text-white font-bold text-4xl flex items-center">Please log in to see your savings goals.</div>;
  }

  const transactions = await getOnRampTransactions(userId);
  const userdata = await getUserDataWithDepositGoals(userId);

  return (
    <div className="p-2">
      
      <div className="flex flex-col lg:flex-row justify-between gap-4">
        <div className="w-full lg:w-1/2">
          <AddMoney userid={userId} />
        </div>

        <div className="w-full lg:w-1/2 h-full rounded-lg">
          <OnRampTransactions transactions={transactions} />
        </div>
      </div>

      <div className="mt-2">
        {userdata?.DepositGoals.length ? (
          userdata.DepositGoals.map((goal: DepositGoal) => (
            <FinalGoalUi
              key={goal.id}
              userid={userId}
              userName={userdata.firstName ?? "Guest"}
              goalAmount={goal.goalAmount}
              currentSavings={goal.currentSaving}
              deadline={goal.deadline}
              goalType={goal.goalType}
            />
          ))
        ) : (
          <InitialGoalUi userid={userId} />
        )}
      </div>
    </div>
  );
}

