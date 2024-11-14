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
        // Find the user by email
        const existingUser = await db.user.findFirst({
          where: {
            email: credentials.email, // Use email to find the user
          },
        });

        // If the user does not exist, throw an error
        if (!existingUser) {
          throw new Error('No user found with this email');
        }

        // Check if the password matches
        const isPasswordValid = await bcrypt.compare(credentials.password, existingUser.password);
        if (!isPasswordValid) {
          throw new Error('Invalid password');
        }

        // If credentials are valid, return the user
        return {
          id: existingUser.id.toString(),
          name: existingUser.firstName,
          email: existingUser.email,
        };
      },
    }),
  ],
  secret: process.env.JWT_SECRET || "secret", // You should set a secret for JWT
  callbacks: {
    async session({ token, session }: any) {
      session.user.id = token.sub; // Add user id to session object
      return session;
    },
  //   async redirect({ url, baseUrl }: any) {
  //     // Ensure the redirect is to /home after login, otherwise fall back to the base URL
  //     return url.startsWith(baseUrl) ? url : `${baseUrl}/home`;
  //   },
  // },
  // pages: {
  //   error: '/auth/error', // Customize the error page URL if needed
  // },
  // debug: process.env.NODE_ENV === 'development', // Enables debug mode in development
}
}
