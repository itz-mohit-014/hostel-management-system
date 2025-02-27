import { prisma } from "@/lib/prisma";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import  bcrypt  from 'bcrypt';
import { JWT } from "next-auth/jwt";
import session from '../../../../node_modules/next-auth/core/routes/session.d';


export const  nextOptions:NextAuthOptions = {
    providers:[
        CredentialsProvider({
            
            name: "Credentials",
            
            credentials: {
              email: { label: "Email", type: "email", placeholder: "jsmith@gmail.com" },
              password: { label: "Password", type: "password" ,placeholder:"password"}
            },
            async authorize(credentials, req) {
                if(credentials?.password == undefined || credentials.email == undefined){
                    return null
                }
                
                try {
                    const user = await prisma.user.findFirst({
                        where:{
                            email:credentials?.email
                        }
                    })
    
                    if(!user || !user.id){
                        throw new Error("User not found")     
                    }

                    const validPassword = await bcrypt.compare(credentials?.password, user.password)

                    if(!validPassword){
                        throw new Error("Invalid credentials")
                    }
                    
                    const newUser = {
                        email:user.email,
                        id:user.id,
                        name:user.name
                    }
                    return newUser
                } catch (error) {
                    const err = (error as Error).message
                    throw new Error(err);

                }
            }
          })
    ],
    pages:{
        signIn: '/auth/signin',
    },
    session: {
        strategy: "jwt", 
      },
    callbacks:{
        async jwt({user, token}: { token: JWT; user?: any }){
            if(user){
                token.id = user.id
                token.email = user.email
                token.name = user.name
            }
            return token
        },
        async session({session, token}:{session:any, token:JWT}){
            if(session.user){
                session.user.id = token.id,
                session.user.email = token.email
                session.user.name = token.name
            }
            return session
        }

    },
    secret: process.env.NEXTAUTH_SECRET,
}