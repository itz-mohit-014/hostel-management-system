import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string | null;
      role: string;
    };
  }

  interface JWT {
    id: string;
    email: string;
    role: string;
  }
}