"use client"
import React, { useEffect, useState } from 'react'
import { CardWrapper } from './card-wrapper'
import {BeatLoader} from "react-spinners"
import { useSearchParams } from 'next/navigation'
import { useCallback } from 'react'
import { newVerification } from '@/actions/new-verification'
import { date } from 'zod'
import { FormError } from '../form-error'
import { FormSuccess } from '../form-success'

export default function NewVerificationForm() {
    const [error,setError] = useState<string | undefined>()
    const [success,setSuccess] = useState<string | undefined>()
    const searchParams = useSearchParams()

    const token = searchParams.get("token")

    const onSubmit = useCallback(()=>{
        if(!token) {
            setError("Missing Token")
            return
        } 

        newVerification(token).then((data)=>{
            setSuccess(data.success)
            setError(data.error)
        }).catch(()=>{
            setError("Something went wrong")
        })
    },[token])
    useEffect(()=>{
    onSubmit()
    },[onSubmit])
  return (
    <CardWrapper headerLabel='Confirm your verification' backButtonHref='/login' backButtonLabel='back to login' >
     <div className='flex items-center justify-center w-full'>
       {!success && !error && <BeatLoader />}
       <FormError message={error} />
       <FormSuccess message={success} />
     </div>
    </CardWrapper>
  )
}
