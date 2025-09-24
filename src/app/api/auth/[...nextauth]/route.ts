import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/user";
import bcrypt from "bcryptjs";

// Export this so we can use it in other files 
export const authOptions: NextAuthOptions = {
  session: { strategy: "jwt" },

  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email or Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          throw new Error("Invalid credentials");
        }

        // Connect to database
        await dbConnect();

        // Find user by email OR username
        const user = await User.findOne({
          $or: [
            { email: credentials.email },
            { username: credentials.email },
          ],
        });

        if (!user) {
          throw new Error("Invalid credentials");
        }

        // Check password
        const isMatch = await bcrypt.compare(credentials.password, user.password);
        if (!isMatch) {
          throw new Error("Invalid credentials");
        }

        // Return basic user data (for JWT + session)
        return {
          id: user._id.toString(),
          email: user.email,
          name: user.username,
          mobile: user.mobilenumber
        };
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = {
          id: user.id,
          name: user.name,
          email: user.email,
          mobile: user.mobile
        };
      }
      return token;
    },
    async session({ session, token }) {
      if (token.user) {
        session.user = token.user as any;
      }
      return session;
    },
  },

  pages: {
    signIn: "/sign-in", // Your custom login page
  },
};

// Export handler
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
