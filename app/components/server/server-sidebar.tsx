import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { ChannelType } from "@prisma/client";
import ServerHeader from "./server-header";

interface ServerSidebarProps{

    serverid : string

}
const ServerSidebar = async({serverid}:ServerSidebarProps) => {
    const profile = await currentProfile()

    if(!profile){
        return redirect("/login")
    }

    const server = await db.server.findUnique({
        where:{

            id : serverid

        },
        include:{
            channel : {
                orderBy:{
                    createdAt:"asc"
                }
            },
            members:{
                include:{
                    profile:true
                },
                orderBy:{
                    role:"asc"
                }
            }
        }
    })

    const textChannels = server?.channel.filter((item)=>item.type===ChannelType.Text)

    const videoChannels = server?.channel.filter((item)=>item.type===ChannelType.VIDEO)

    const audioChannels = server?.channel.filter((item)=>item.type===ChannelType.AUDIO)


    const members = server?.members.filter((member)=>member.profileId!==profile.id)

    if(!server){
        return redirect("/settings")
    }

    const role = server?.members.find((member)=>member.profileId === profile.id)?.role
    //console.log(role)

    return ( 
        <div className="flex flex-col h-full text-primary w-full dark:bg-[#2B2D31] bg-[#F2F3F5]">
            <ServerHeader server={server} role={role} />
        </div>
     );
}
 
export default ServerSidebar;