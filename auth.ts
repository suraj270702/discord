import NextAuth from "next-auth"
import authConfig from "@/auth.config"
import {PrismaAdapter} from '@auth/prisma-adapter'
import { db } from "@/lib/db"
import { getUserById } from "@/data/user"

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut
} = NextAuth({

    pages:{
     signIn : "/login",
     signOut: "/error"
    },

    events:{
        async linkAccount({user}){
            await db.user.update({
                where: {id: user.id},
                data :{emailVerified : new Date()}
            })
        }
    },
    
    callbacks : {
        
        async session({token,session}){
            if(session.user && token.sub){
                session.user.id = token.sub
            }

            if(token.role && session.user){
                session.user.role = token.role as "ADMIN" | "USER";
            }
            return session
        },
        async jwt ({token}){
            if(!token.sub ) return token

            const existingUser = await getUserById(token.sub)

            if(!existingUser) return token

            token.role = existingUser.role 

            return token
        }
    },
    adapter : PrismaAdapter(db),
    session : {strategy : "jwt"},
    ...authConfig
  
})