"use client"

import { useEffect, useState } from "react"
import { CreateServerModal } from "../modals/create-server-modal"
import { InviteModal } from "../modals/invite-modal"
import { EditServerModal } from "../modals/edit-server-modal"
import { MembersModal } from "../modals/members-modal"
import { CreateChannelModal } from "../modals/create-channel-model"
import { LeaveServerModal } from "../modals/leave-modal"
import { DeleteServerModal } from "../modals/delete-server-modal"
import { DeleteChannelModal } from "../modals/delete-channel-modal"
import { EditChannelModal } from "../modals/edit-channel-modal"

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
        <CreateChannelModal />
        <LeaveServerModal />
        <DeleteServerModal />
        <DeleteChannelModal />
        <EditChannelModal />
        </>
    )
} 