import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      mobile?: string | null; // Added mobile field
    };
  }

  interface User {
    id: string;
    name?: string | null;
    email?: string | null;
    mobile?: string | null; // Added mobile field
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      mobile?: string | null; // Added mobile field
    };
  }
}