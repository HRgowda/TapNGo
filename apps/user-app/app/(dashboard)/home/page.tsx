import { Dashboard } from '@components/home/DashboardCard';
import { FeatureButtons } from '@components/home/NavigationButtons';
import { getUserWithCard, getUserBalance, getLoggedUser } from "app/lib/server_actions/userDatabase";

export default async function HomePage() {
  const userId = await getLoggedUser();
  if (!userId) return <div className="text-white font-bold text-4xl flex items-center">Please log in to view the dashboard.</div>;

  const userCard = await getUserWithCard(userId);
  const balance = await getUserBalance(Number(userId));

  // if (!userCard) return <div className="text-white font-bold text-4xl flex items-center">User data not found.</div>;

  return (
    <div className="p-1">
      <div className="mb-2">
        <Dashboard fullName={userCard?.fullName} card={userCard?.card} balance={balance} />
      </div>
      <div>
        <FeatureButtons />
      </div>
    </div>
  );
}