import { NextResponse } from 'next/server';
import { hash } from 'bcrypt';
import db from '@repo/db/client';

export async function POST(req: Request) {
  const { firstName, lastName, email, password, pin } = await req.json();

  if (!email || !password || !firstName || !pin) {
    return NextResponse.json({ message: 'Missing required fields. Please provide all details' }, { status: 400 });
  }

  try {
    const hashedPassword = await hash(password, 10);

    await db.user.create({
      data: {
        firstName,
        lastName,
        email,
        password: hashedPassword,
        pin: pin,
        Balance: {
          create: {
            amount: 1000,
            locked: 200,
          },
        },
      },
    });

    return NextResponse.json({ message: "Account created successfully. Please wait" }, { status: 200 });
  } catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
