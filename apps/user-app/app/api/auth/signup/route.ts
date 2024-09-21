import { NextResponse } from 'next/server';
import { hash } from 'bcrypt'; 
import db  from '@repo/db/client'; 

export async function POST(req: Request) {
  const { firstName, lastName, email, number, password, pin } = await req.json();

  // Basic validation
  if (!email || !password) {
    return NextResponse.json({ message: 'Email and password are required' }, { status: 400 });
  }

  try {
    const hashedPassword = await hash(password, 10);

    const newUser = await db.user.create({
      data: {
        firstName,
        lastName,
        email,
        number,
        password: hashedPassword,
        pin: parseInt(pin),
      },
    });

    return NextResponse.json({ user: newUser }, { status: 200 });
  } catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
