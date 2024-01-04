"use server"

import { LoginSchema } from "@/schemas"
import * as z from "zod"


export const login =async(values : z.infer<typeof LoginSchema>) =>{
    const validatedFormFields = LoginSchema.safeParse(values)

    if(!validatedFormFields.success){
       return {error : "Invalid Fields"}
    }

    return {success : "Email sent"}
    console.log(values)
}