import { NextResponse } from "next/server";

export async function middleware(req: Request) {
  const origin = req.headers.get('Origin');

  const allowedOrigin = "https://tapngo-userapp.vercel.app"

  if(origin && origin != allowedOrigin){
    return NextResponse.json({
      message: "CORS error: Origin not allowed"
    }, {
      status: 403
    })
  }

  return NextResponse.next()

}