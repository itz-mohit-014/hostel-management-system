import { prisma } from "@/lib/prisma";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { JWT } from "next-auth/jwt";
import { loginValidation } from "@/common/types";
import { CustomError } from "@/lib/Error";

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
        accountType: {
          label: "Password",
          type: "text",
          placeholder: "account type",
        },
      },
      async authorize(credentials, req) {
        console.log(credentials)
        if (!loginValidation.safeParse(credentials).success) {
          return null;
        }
        let user;
        try {
          if(credentials?.accountType === "student"){
             user = await prisma.user.findFirst({
              where: {
                email: credentials?.email,
              },
            });
          }else {
             user = await prisma.admin.findFirst({
              where: {
                email: credentials?.email,
              },
            });
          }
          

          if (!user || !user.id) {
           throw new CustomError("User not found", false, 404)
          }

          const validPassword = await bcrypt.compare(
            credentials?.password!,
            user.password
          );

          if (!validPassword) {
            throw new Error("Invalid credentials");
          }

          const newUser = {
            email: user.email,
            id: user.id,
            firstName: user.firstName,
            lastName:user.lastName,
            accountType : user.role
          };

          return newUser;
        } catch (error) {
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
        token.name = user.name;
        token.accountType = user.accountType;
      }
      return token;
    },

    async session({ session, token }: { session: any; token: JWT }) {
      if (session.user) {
        (session.user.id = token.id), (session.user.email = token.email);
        session.user.name = token.name;
        session.user.accountType = token.accountType;
      }

      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
