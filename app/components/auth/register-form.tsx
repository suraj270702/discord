"use client"

import { CardWrapper } from "./card-wrapper"
import {useForm} from "react-hook-form"
import {zodResolver} from "@hookform/resolvers/zod"

import { FormControl,FormField,FormItem,FormLabel,FormMessage,Form} from "@/components/ui/form"

import { Input } from "@/components/ui/input"

import * as z from "zod"

import { RegisterSchema } from "@/schemas"
import { Button } from "@/components/ui/button"
import { FormError } from "../form-error"
import { FormSuccess } from "../form-success"
import { register } from "@/actions/register"
import { useState, useTransition } from "react"

export const RegisterForm = ()=>{
    const [isPending,startTransition] = useTransition()
    const [error,setError] = useState<string | undefined>("")
    const [success,setSuccess] = useState<string | undefined>("")
    const form = useForm<z.infer<typeof RegisterSchema>>({
        resolver : zodResolver(RegisterSchema),
        defaultValues : {
            email : "",
            password : "",
            name : ""
        }
    })

    const onSubmit =(values : z.infer<typeof RegisterSchema>)=>{
      console.log(values)
       setError("")
       setSuccess("")
      startTransition(()=>{
        register(values).then((data)=>{
            setError(data.error)
            setSuccess(data.success)
        })
      })


      
    }
    return (
        
            <CardWrapper headerLabel="Create an Account" backButtonHref="/login" backButtonLabel="Already have an Account" showSocial mainLabel="Register" >
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                     <div className="space-y-4">
                        <FormField control={form.control} name="email" render={({field})=>(
                            <FormItem>
                                <FormLabel>
                                    Email
                                </FormLabel>
                                <FormControl>
                                    <Input {...field} placeholder="john.doe@gmail.com" disabled={isPending}/>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}/>
<FormField control={form.control} name="password" render={({field})=>(
                            <FormItem>
                                <FormLabel>
                                    Password
                                </FormLabel>
                                <FormControl>
                                    <Input {...field} placeholder="********"  type="password" disabled={isPending}/>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}/>
                        <FormField control={form.control} name="name" render={({field})=>(
                            <FormItem>
                                <FormLabel>
                                    Password
                                </FormLabel>
                                <FormControl>
                                    <Input {...field} placeholder="John Doe"  type="text" disabled={isPending}/>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}/>
                     </div>
                     <FormError  message={error}/>
                     <FormSuccess message={success}/>
                     <Button className="w-full" type="submit" disabled={isPending}>
                        create an Account
                     </Button>
                  </form>
                </Form>
            </CardWrapper>
        
    )
}