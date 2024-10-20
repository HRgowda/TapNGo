import db from "@repo/db/client"

export async function getOnRamp(userId: number){
  try{
    const onRamps = await db.onRampTransaction.findMany({
      where:{
        userid: userId
      },
      select:{
        amount: true,
        startTime: true,
        provider: true
      },
      orderBy:{
        startTime: "asc"
      }
    })

    if(onRamps.length === 0){
      return {
        status: 404,
        body:{
          message: "No onramp / bank transactions found."
        }
      }
    }

    return {
      status: 200,
      data: onRamps
    }
  } catch(error) {
    console.log("Error fetching onramp transactions", error);

    return {
      status: 500,
      body:{
        message: "Internal server error, please try again later."
      }
    }
  }
}