import prisma from "@repo/db/client";
import { AddMoney } from "@components/deposit/AddMoneyCrad";
import { OnRampTransactions } from "@components/deposit/OnRampTransaction";
import { SavingsCard } from "@components/deposit/SavingsGoalCard";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import { FinalGoalUi } from "@components/deposit/FinalGoal_Info"

async function getOnRampTransactions(userid: number) {

    const txns = await prisma.onRampTransaction.findMany({
        where: {
            userid
        }
    });
    return txns.map(t => ({
        time: t.startTime,
        amount: t.amount,
        status: t.status,
        provider: t.provider
    }));
}

async function userData(id: number){
    const data = await prisma.user.findUnique({
        where:{
            id
        }, 
        include:{
            DepositGoals: true
        }
    });

    if(!data) return null;

    return {
        firstName: data.firstName,
        DepositGoals: data.DepositGoals.map(goals => ({
            id: goals.id,
            goalAmount: goals.goalAmount,
            currentSaving: goals.currentSavings,
            deadline: goals.deadline,
            goalType: goals.goalType
        }))
    }
}

export default async function Page() {
    const session = await getServerSession(authOptions);

    const userId = session?.user?.id ? Number(session.user.id) : null;

    if (!userId) {
        return <div>Please log in to see your savings goals.</div>;
    }

    const transactions = await getOnRampTransactions(userId);
    const userdata = await userData(userId); // This returns user + depositGoals

    return (
    <div>
        <div className="p-2 flex justify-between grid grid-cols-2 gap-4">
            <div>
                <AddMoney />
            </div>
            <div className="bg-gray-900 h-full rounded-xl">
                <OnRampTransactions transactions={transactions} />
            </div>
        </div>

        <div className="p-2">

            {userdata?.DepositGoals.length ? (
                userdata.DepositGoals.map((goal) => (
                    <FinalGoalUi
                        key={goal.id}
                        userid={goal.id}
                        userName={userdata.firstName ?? "Guest"}
                        goalAmount={goal.goalAmount}
                        currentSavings={goal.currentSaving}
                        deadline={goal.deadline}
                        goalType={goal.goalType}
                    />
                ))
            ) : (
                <SavingsCard userid={userId} />
            )}
        </div>
    </div>
);
}
