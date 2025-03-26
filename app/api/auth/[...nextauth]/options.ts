import { ensureDatabaseConnection, prisma } from "@/lib/prisma";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { JWT } from "next-auth/jwt";
import { loginValidation } from "@/common/types";
import { CustomError } from "@/lib/Error";
import { profile } from "console";

export const nextOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "jsmith@gmail.com",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "password",
        },
        role: {
          label: "role",
          type: "text",
          placeholder: "account type",
        },
      },
      async authorize(credentials, req) {
        
        if (!loginValidation.safeParse(credentials).success) {
          return null;
        }

        let user;

        try {

          // await ensureDatabaseConnection();

          if (credentials?.role === "Student") {
            user = await prisma.user.findFirst({
              where: {
                email: credentials?.email,
                role: credentials?.role,
              },
              include : {
                profile: true
              }
            });
          } else if (
            credentials?.role === "Admin" ||
            credentials?.role === "Warden"
          ) {
            user = await prisma.admin.findFirst({
              where: {
                email: credentials?.email,
                role: credentials?.role!,
              },
              include : {
                profile: true
              }
            });
          }

          if (!user || !user.id) {
            throw new CustomError("User not found", false, 404);
          }

          const validPassword = await bcrypt.compare(
            credentials?.password!,
            user.password
          );

          if (!validPassword) {
            throw new Error("Invalid credentials");
          }

          const newUser = {
            id : user.id,
            email: user.email,
            role: user.role,
            profilePicture: user.profile?.profilePicture || null,
            name: user.firstName + user.lastName
          }

          return newUser;
        } catch (error) {

          console.log(error);

          const err = (error as Error).message;
          throw new Error(err);
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ user, token }: { token: JWT; user?: any }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.role = user.role
        token.profilePicture = user.profilePicture;
        token.name = user.name
      }
      return token;
    },

    async session({ session, token }: { session: any; token: JWT }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.email = token.email;
        session.user.role = token.role;
        session.user.profilePicture = token.profilePicture;
        session.user.name = token.name
      }

      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
