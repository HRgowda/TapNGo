import { NextResponse } from "next/server";
import PrismaClient from "@repo/db/client";

const client = new PrismaClient();

export const GET = async () => {
  try {
    await client.user.create({
      data: {
        email: "asd",
        name: "adsads",
      },
    });

    return NextResponse.json({
      message: "hi there",
    });
  } catch (error) {
    console.error("Error creating user:", error);

    return NextResponse.json(
      { message: "An error occurred while creating the user." },
      { status: 500 }
    );
  } finally {
    await client.$disconnect();
  }
};
