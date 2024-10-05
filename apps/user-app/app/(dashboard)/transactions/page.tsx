import { Transactions } from "@components/Transactions"
import prisma from "@repo/db/client"
import { getServerSession } from "next-auth"
import { authOptions } from "../../lib/auth"

async function bankTransactions(){
    const session = await getServerSession(authOptions);
    const banktxn = await prisma.onRampTransaction.findMany({
      where:{
        userid: Number(session.user.id)
      }
    });
    return banktxn.map(tx => ({
      amount: tx.amount,
      time: tx.startTime,
      status: tx.status
    }))
  }

  async function p2pTransactions(loggedUserId: number) {
    
    const p2ptxn = await prisma.p2pTransfer.findMany({
      orderBy:{
        id: "desc"
      },

      where: {
        OR: [
          { fromUserId: Number(loggedUserId) }, // Logged-in user as sender
          { toUserId: Number(loggedUserId) }    // Logged-in user as receiver
        ]
      },
      include: {
        fromUser: true,
        toUser: true
      }
    });
  
    return p2ptxn.map(tx => ({
      id: tx.id,
      date: tx.timestamp,
      amount: tx.amount,
      from: {
        id: (tx.fromUser.id),
        name: tx.fromUser.firstName
      },
      to: {
        id: (tx.toUser.id),
        name: tx.toUser.firstName
      }
    }));
  }  

export default async function () {
  const session = await getServerSession(authOptions)

  const loggedUser  = session?.user.id

  const bank = await bankTransactions();

  const p2p = await p2pTransactions(loggedUser);

  const id  = session.user.id

  return <div className="">
    <div className="">
      <Transactions transactionData={p2p} currentUserId={loggedUser}></Transactions>
    </div>
  </div>

}