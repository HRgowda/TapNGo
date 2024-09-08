import express from "express"
import db from "@repo/db/client"

const app = express();

app.post("/webhook", async (req, res)=>{

  const paymentInformation :{
    token: string;
    userid: string;
    amount: string
  } = {
    token: req.body.toke,
    userid: req.body.user_identifier,
    amount: req.body.amount
  };

  // to handle two-request or more we increment
  try{
    await db.$transaction([

      db.balance.update({
        where:{
          userid: Number(paymentInformation.userid)
        },
        data:{
          amount:{
            increment: Number(paymentInformation.amount)
          }
        }
      }),
    
      db.onRampTransaction.update({
        where:{
          token: paymentInformation.token
        },
        data:{
          status: "Succes"
        }
      })
    ]);

    // super important to send 200 status code 
    res.status(200).json({
      message: "Captured"
    })

  } catch(e) {
    return res.status(411).json ({
      message: "Error while processing webhook"
    })
  }
})

app.listen(3003);
