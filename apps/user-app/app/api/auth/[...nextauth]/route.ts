import NextAuth from "next-auth";
import { authOptions } from "app/lib/auth";
import Cors from "cors";
import { NextRequest, NextResponse } from "next/server";

// CORS middleware
const cors = Cors({
  methods: ["GET", "POST"],
  origin: "*", 
  allowedHeaders: ["Content-Type", "Authorization"],
});

// Helper function to run middleware
function runMiddleware(req: NextRequest, fn: Function) {
  return new Promise((resolve, reject) => {
    fn(req, {} as any, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

// Define the handler with CORS
const handler = async (req: NextRequest) => {
  // Run CORS middleware
  await runMiddleware(req, cors);

  // Handle authentication
  return NextAuth(authOptions)(req);
};

export { handler as GET, handler as POST };
