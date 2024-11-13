import { NextResponse } from 'next/server';
import { hash } from 'bcrypt'; 
import db  from '@repo/db/client'; 
import Cors from "cors";

// CORS middleware
const cors = Cors({
  methods: ["POST"],
  origin: "https://tapngo-userapp.vercel.app/", 
  allowedHeaders: ["Content-Type"],
});

// Helper function to run middleware
function runMiddleware(req: Request, fn: Function) {
  return new Promise((resolve, reject) => {
    fn(req, {} as any, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

export async function POST(req: Request) {
  await runMiddleware(req, cors)

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
          create:{
            amount: 1000,
            locked: 200
          }
        }
      },
    });

    return NextResponse.json({ message: "Account createad successfully. Please wait" }, { status: 200 });
  } catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
