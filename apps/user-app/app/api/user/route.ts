import { getServerSession } from "next-auth"
import { NextResponse } from "next/server";
import { authOptions } from "../../lib/auth";
import Cors from "cors";

// CORS middleware
const cors = Cors({
  methods: ["POST"],
  origin: "*", // Replace "*" with your frontend domain for security
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

export const GET = async () => {
    try{
        const session = await getServerSession(authOptions);
        if (session.user) {
            return NextResponse.json({
                message: "You are looged in",
                user: session.user
        })
    }
    }catch(e){
        return NextResponse.json({
            message:"You are not logged in"
        }, {
            status: 403
        })
    }
}