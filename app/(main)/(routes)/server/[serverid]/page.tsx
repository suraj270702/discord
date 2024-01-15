import { currentProfile } from '@/lib/current-profile'
import { db } from '@/lib/db'
import { redirect } from 'next/navigation'
import React from 'react'

interface ServerPageProps{
  params:{
    serverid:string
  }
}

export default async function ServerPage({params}:ServerPageProps) {
  const profile = await currentProfile()
  if(!profile){
    return redirect("/login")
  }

  const server = await db.server.findUnique({
    where:{
      id:params?.serverid,
      members:{
        some:{
          profileId:profile.id
        }
      }
    },
    include:{
      channel:{
        where:{
          name : "general"
        },
        orderBy:{
          createdAt:"asc"
        }
      }
    }
  })

  const initialChannel = server?.channel[0]

  if(initialChannel?.name !== "general"){
    return null
  }
  return redirect(`/server/${params.serverid}/channels/${initialChannel?.id}`)
    
}
