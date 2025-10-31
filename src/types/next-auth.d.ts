import "next-auth";
import "next-auth/jwt";
import { DefaultSession } from "next-auth";

// Augment the default types to include our custom fields
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      mobile: string;
    } & DefaultSession["user"];
  }

  interface User {
    mobile?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    user?: Session["user"];
  }
}