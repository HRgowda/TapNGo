import { SendCard } from "@components/transfer/SendCard"
import { LatestActions } from "@components/transfer/LatestActions"
import db from "@repo/db/client"
import { authOptions } from "app/lib/auth"
import { getServerSession } from "next-auth"
import { TapngoUsers } from "@components/transfer/TapNGousers"
import { Session } from "inspector"

const session = await getServerSession(authOptions);

export async function userData() {

  // return all users except the current user.
  const loggedUser = session?.user.id
  
  const users = await db.user.findMany({
    orderBy:{
      id: "desc"
    },
    select: {
      firstName: true,
      id: true
    },
    where:{
      id:{
        not: Number(loggedUser)
      }
    }
  });

  const data = users.map(user => ({
    id: user.id,
    firstName: user.firstName,
  })) 

  return data;
}

export async function transactions () {

  const transactions = await db.p2pTransfer.findMany({
    where:{
      fromUserId: Number(session?.user.id)
    },
    select:{
      toUser:{
        select:{
          firstName: true,
          lastName: true,
          id: true
        }
      }
    }
  });

  // This check is to filter if any toUser data is undefined so that it encounters runtime error since the value would be undefined so the filter() function would remove all the values of undefined in the userTransactions array. 

  const userTransactions = transactions
    .map(t => t.toUser)
    .filter(user => user !== undefined) as { firstName: string, id: number }[];

  return userTransactions
}

export default async function Home() {

  const balance = await db.balance.findFirst({
    where: {
      userid: Number(session?.user.id)
    }
  });

  const data = await userData();

  const transactionedNames = await transactions();
  
  return (
    <div className="w-full space-y-2">

      <SendCard balance={Number(balance?.amount)} userDetails={data} />

      {/* Recent Interactions */}
      <div>
        <LatestActions users={transactionedNames} allUsers={data}></LatestActions>
        <div>
        </div>
      </div>
    </div>
  );
}
