"use client"

import { CardWrapper } from "./card-wrapper"
import {useForm} from "react-hook-form"
import {zodResolver} from "@hookform/resolvers/zod"

import { FormControl,FormField,FormItem,FormLabel,FormMessage,Form} from "@/components/ui/form"

import { Input } from "@/components/ui/input"

import * as z from "zod"

import { LoginSchema } from "@/schemas"
import { Button } from "@/components/ui/button"
import { FormError } from "../form-error"
import { FormSuccess } from "../form-success"
import { login } from "@/actions/login"
import { useState, useTransition } from "react"

export const LoginForm = ()=>{
    const [isPending,startTransition] = useTransition()
    const [error,setError] = useState<string | undefined>("")
    const [success,setSuccess] = useState<string | undefined>("")
    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver : zodResolver(LoginSchema),
        defaultValues : {
            email : "",
            password : ""
        }
    })

    const onSubmit =(values : z.infer<typeof LoginSchema>)=>{
      console.log(values)
       setError("")
       setSuccess("")
      startTransition(()=>{
        login(values).then((data:any)=>{
            setError(data.error)
            setSuccess(data.success)
        })
      })


      
    }
    return (
        
            <CardWrapper headerLabel="Welcome Back" backButtonHref="/register" backButtonLabel="Don't have an Account" showSocial mainLabel="Login">
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
                     </div>
                     <FormError  message={error}/>
                     <FormSuccess message={success}/>
                     <Button className="w-full" type="submit" disabled={isPending}>
                        Login
                     </Button>
                  </form>
                </Form>
            </CardWrapper>
        
    )
}