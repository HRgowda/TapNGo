import db from "@repo/db/client";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  
  try {
    const { cardNumber, validDate, expiryDate, cvv, name } = await req.json();

    if (!cardNumber || !validDate || !expiryDate || !cvv || !name) {
      return NextResponse.json(
        {
          message: "Missing required fields. Please provide all card details.",
        },
        { status: 400 }
      );
    }

    const nameParts = name.split(" ");
    if (nameParts.length < 1) {
      return NextResponse.json(
        {
          message: "Invalid name format. First name is required.",
        },
        { status: 400 }
      );
    }

    const name1 = nameParts[0];

    const user = await db.user.findFirst({
      where: { firstName: name1 },
      select: { id: true },
    });

    if (!user) {
      return NextResponse.json(
        {
          message: `User with first name '${name1}' not found.`,
        },
        { status: 404 }
      );
    }

    const newCard = await db.card.create({
      data: {
        cardNumber,
        validDate,
        expiryDate,
        cvv,
        userid: user.id,
      },
    });

    return NextResponse.json(
      {
        card: newCard,
        message: "Card created successfully. Please wait",
      },
      { status: 200 }
    );
  } catch (e) {
    return NextResponse.json(
      {
        message: "Internal server error. Please try again later.",
      },
      { status: 500 }
    );
  }
}
