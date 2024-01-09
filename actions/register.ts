"use server"

import { RegisterSchema } from "@/schemas"
import * as z from "zod"
import * as bcrypt from 'bcrypt'
import { db } from "@/lib/db"
import { getUserByEmail } from "@/data/user"
import { generateVerificationToken } from "@/lib/tokens"
import { sendVerificationEmail } from "@/lib/mail"

export const register =async(values : z.infer<typeof RegisterSchema>) =>{
    const validatedFormFields = RegisterSchema.safeParse(values)

    if(!validatedFormFields.success){
       return {error : "Invalid Fields"}
    }

    const {name,password,email} = validatedFormFields.data

    const hashPassword = await bcrypt.hash(password,10)

    const existingUser = await getUserByEmail(email)



    if(existingUser){
        return { error: "Email already in use."}
    }

    await db.user.create({
        data:{
            name,
            email,
            password: hashPassword,
        }
    })

    //const verificationToken = await generateVerificationToken(email)

    //await sendVerificationEmail(verificationToken.email,verificationToken.token)




    return {success : "Account created  successfully"}
    
}