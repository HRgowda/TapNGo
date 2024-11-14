import NextAuth from "next-auth";
import { authOptions } from "app/lib/auth";

// Export the NextAuth handler for both GET and POST requests
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
