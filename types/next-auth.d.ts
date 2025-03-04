import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      firstName?: string | null;
      lastName?: string | null;
      email?: string | null;
    }
  }
}