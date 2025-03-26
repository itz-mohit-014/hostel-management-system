import NextAuth, { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface User extends DefaultUser {
    id: string;
    role: string;
    profilePicture: string | null;
  }

  interface Session extends DefaultSession {
    user: User;
  }

  interface JWT {
    id: string;
    email: string;
    role: string;
    name: string;
    profilePicture: string | null;
  }
}