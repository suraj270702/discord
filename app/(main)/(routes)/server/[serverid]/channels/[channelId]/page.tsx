import { ChatHeader } from "@/app/components/chat/chat-header";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";


interface ChannelIdProps{
    params:{
        serverid:string,
        channelId:string
    }
}

const ChannelIdPage = async({params}:ChannelIdProps) => {

    const profile = await currentProfile()
    if(!profile){
        return redirect("/login")
    }

    const channel = await db.channel.findUnique({
        where:{
            id:params.channelId
        }
    })

    const member = await db.member.findFirst({
        where:{
            serverId:params.serverid,
            profileId:profile.id
        }
    })

    if(!channel || !member){
        redirect("/settings")
    }
    return ( 
        <div className="bg-white dark:bg-[#313338] flex flex-col h-full">
            <ChatHeader 
            name={channel.name}
            serverid={channel.serverId}
            type="channel"
            
            />
        </div>
     );
}
 
export default ChannelIdPage;