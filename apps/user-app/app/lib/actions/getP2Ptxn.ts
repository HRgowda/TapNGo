
import db from "@repo/db/client"

export async function getP2PTransactions(fromUserId: number) {

  const transactions = await db.p2pTransfer.groupBy({
    by:["toUserId"],
    _sum: {
      amount: true
    },
    _count: {
      toUserId: true
    },
    where:{
      fromUserId
    }
  })

  const data = await Promise.all(
    
    transactions.map(async (item)=> {
    const user = await db.user.findUnique({
      where:{
        id: item.toUserId
      },
      select:{
        firstName: true
      }
    });
    return {
      user: user?.firstName || `User ${item.toUserId}`,
      amount: item._sum.amount || 0,
      transactions: item._count.toUserId || 0
      }
    })
  )

  return data;
}