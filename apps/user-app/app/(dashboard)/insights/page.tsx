import { P2PChart } from '@components/insights_charts/p2pChart';
import { getP2PTransactions } from 'app/lib/server_actions/p2pTxnDatabase';
import { fetchOnRampInsights } from 'app/lib/server_actions/bankDatabase';
import { getServerSession } from 'next-auth';
import { authOptions } from 'app/lib/auth';
import { OnRampChart } from '@components/insights_charts/onRampChart';

export default async function InsightPage() {
  const session = await getServerSession(authOptions);
  const fromUserId = session?.user.id;

  // Ensure default empty arrays to prevent errors if the fetch fails or returns undefined
  const data = (await getP2PTransactions(Number(fromUserId))) || [];
  const onrampData = (await fetchOnRampInsights(fromUserId)) || [];

  return (
    <div className='space-y-2 p-3 bg-gray-800'>
      <div className='mb-3'>
        <P2PChart data={data} />
      </div>

      <div>
        <OnRampChart data={onrampData} />
      </div>
    </div>
  );
}
