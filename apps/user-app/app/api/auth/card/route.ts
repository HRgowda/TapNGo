import db from "@repo/db/client";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "app/lib/auth";

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

    // Get the logged-in user from session
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user || !session.user.id) {
      return NextResponse.json(
        {
          message: "You must be logged in to create a card.",
        },
        { status: 401 }
      );
    }

    const userId = Number(session.user.id);

    // Check if user exists
    const user = await db.user.findUnique({
      where: { id: userId },
      select: { id: true },
    });

    if (!user) {
      return NextResponse.json(
        {
          message: "User not found.",
        },
        { status: 404 }
      );
    }

    // Check if user already has a card, if so, update it instead of creating a new one
    const existingCard = await db.card.findFirst({
      where: { userid: userId },
    });

    let newCard;
    if (existingCard) {
      // Update existing card
      newCard = await db.card.update({
        where: { id: existingCard.id },
        data: {
          cardNumber,
          validDate,
          expiryDate,
          cvv,
        },
      });
    } else {
      // Create new card
      newCard = await db.card.create({
        data: {
          cardNumber,
          validDate,
          expiryDate,
          cvv,
          userid: userId,
        },
      });
    }

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
