"use client"

import { useEffect, useState } from "react"
import { CreateServerModal } from "../modals/create-server-modal"
import { InviteModal } from "../modals/invite-modal"
import { EditServerModal } from "../modals/edit-server-modal"
import { MembersModal } from "../modals/members-modal"

export const ModalProvider =()=>{
    const [isMOunted,setIsMounted] = useState(false)

    useEffect(()=>{
        setIsMounted(true)
    },[])
    if(!isMOunted){
        return null
    }
    return (
        <>
        <CreateServerModal />
        <InviteModal />
        <EditServerModal />
        <MembersModal />
        </>
    )
} 