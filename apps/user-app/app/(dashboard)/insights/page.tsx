
import { P2PChart } from '@components/insights_charts/p2pChart';
import { getP2PTransactions } from '../../lib/actions/getP2Ptxn';
import { getServerSession } from 'next-auth';
import { authOptions } from 'app/lib/auth';

export default async function InsightPage() {
  const session = await getServerSession(authOptions);
  const fromUserId = session?.user.id

  const data = await getP2PTransactions(Number(fromUserId)); // Fetch data from the server

  return (
    <div className=''>
      <P2PChart data={data} />
    </div>
  );
};
