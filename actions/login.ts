"use server"

import { LoginSchema } from "@/schemas"
import * as z from "zod"
import { signIn } from "@/auth"
import { AuthError } from "next-auth"
import { generateVerificationToken } from "@/lib/tokens"
import { getUserByEmail } from "@/data/user"
import { sendVerificationEmail } from "@/lib/mail"


export const login =async(values : z.infer<typeof LoginSchema>) =>{
    const validatedFormFields = LoginSchema.safeParse(values)

    if(!validatedFormFields.success){
       return {error : "Invalid Fields"}
    }

    const {email,password} = validatedFormFields.data

    const existingUser = await getUserByEmail(email)

    if(!existingUser || !existingUser.email || !existingUser.password){
      return {error :"Email doesn't exist "}
    }

    if(!existingUser.emailVerified){
      const verificationToken = await generateVerificationToken(existingUser.email)
      await sendVerificationEmail(verificationToken.email,verificationToken.token)
       return {success : "Email verification code sent successfully"}
    }



    try{
     await signIn("credentials",{
        email,password,redirectTo : "/settings"
     })
    }
    catch(error){
      if(error instanceof AuthError){
        switch (error.type){
            case "CredentialsSignin":
                return { error : "Invalid Credentials"}
            
            default :
                return {error : "Something went wrong"}

        }
      }
      throw error
    }
    //console.log(values)
}