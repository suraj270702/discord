"use server"

import { RegisterSchema } from "@/schemas"
import * as z from "zod"


export const register =async(values : z.infer<typeof RegisterSchema>) =>{
    const validatedFormFields = RegisterSchema.safeParse(values)

    if(!validatedFormFields.success){
       return {error : "Invalid Fields"}
    }

    return {success : "Account created successfully"}
    console.log(values)
}