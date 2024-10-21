// app/page.tsx
import { DashboardCard } from '@components/HomeCard';
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import db from "@repo/db/client";

async function getBalance(userId: number) {
  const balanceData = await db.balance.findFirst({ where: { userid: userId } });
  return { amount: balanceData?.amount || 0, locked: balanceData?.locked || 0 };
}

export default async function HomePage() {
  const session = await getServerSession(authOptions);
  const userId = session?.user.id;

  if (!userId) return <div>Please log in to view the dashboard.</div>;

  const userData = await db.user.findFirst({
    where: { id: parseInt(userId) },
    include: { Card: true },
  });

  if (!userData) return <div>User data not found.</div>;

  const fullName = `${userData.firstName} ${userData.lastName || ''}`.trim();
  const balance = await getBalance(Number(userId));

  return (
    <DashboardCard fullName={fullName} card={userData.Card[0]} balance={balance} />
  );
}
