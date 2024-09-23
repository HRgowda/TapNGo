
import db from "@repo/db/client"
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try{

    const {cardNumber, validDate, expiryDate, cvv, name} = await req.json();

    // const hashedCvv = await bcrypt.hash(cvv, 3)
    const name1 = name.split(" ")[0]

    const user = await db.user.findFirst({
      where:{ 
        firstName: name1
      },
        select:{
        id: true
      }
    })

    if (!user){
      return NextResponse.json({
        message: "Failed1"
      }, {
        status: 400
      });
    }

    const newCard = await db.card.create({
     data:{
     cardNumber,
     validDate,
     expiryDate,
     cvv,
     userid: user?.id
     }      
    })

    return NextResponse.json({
      card: newCard
    },{
      status: 200
    })

  } catch (e) {
    console.error(e); // Log the error
    return NextResponse.json({
      message: "Failed2" // Include error message in the response
    }, {
      status: 500, // Return 500 status for internal server errors
    });
  }
  

}

