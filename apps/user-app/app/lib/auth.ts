import db from "@repo/db/client";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "text", placeholder: "johndoe@gmail.com", required: true },
        password: { label: "Password", type: "password", required: true }
      },
      async authorize(credentials: any) {
        // Find the existing user based on the provided email
        const existingUser = await db.user.findFirst({
          where: {
            email: credentials.email, // Use email to find the user
          },
        });

        // If the user doesn't exist, return null (no login)
        if (!existingUser) {
          return null;
        }

        // Validate the password using bcrypt
        const isPasswordValid = await bcrypt.compare(credentials.password, existingUser.password);
        if (!isPasswordValid) {
          return null;
        }

        // If the password is valid, return the user details
        return {
          id: existingUser.id.toString(),
          name: existingUser.firstName,
          email: existingUser.email,
        };
      },
    }),
  ],
  secret: process.env.JWT_SECRET || "secret",
  callbacks: {
    async session({ token, session }: any) {
      session.user.id = token.sub;
      return session;
    },
  },
};
