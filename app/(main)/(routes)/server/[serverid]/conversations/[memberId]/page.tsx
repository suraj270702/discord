import { ChatHeader } from "@/app/components/chat/chat-header";
import { getOrCreateConversation } from "@/lib/conversation";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";

interface ConversationsPageProps{
    params:{
        memberId:string,
        serverid : string
    }
}

const ConversationsPage = async({params}:ConversationsPageProps) => {

    const profile = await currentProfile()

    if(!profile){
        return redirect("/login")
    }

    const currentMember = await db.member.findFirst({
        where:{
            serverId:params?.serverid,
            profileId:profile?.id
        },
        include:{
            profile:true
        }
    })

    if(!currentMember){
        return redirect("/settings")
    }

    const conversation = await getOrCreateConversation(currentMember.id,params.memberId)

    if(!conversation){
        return redirect(`/servers/${params.serverid}`)
    }

    const {memberOne,memberTwo} = conversation

    const otherMember = memberOne.profileId === profile.id ? memberTwo : memberOne

    

    return ( 
        <div className="bg-white dark:bg-[#313338] flex flex-col h-full">
            <ChatHeader imageUrl={otherMember?.profile?.imageUrl} serverid={params.serverid} name={otherMember?.profile?.name} type="conversation"/>
        </div>
     );
}
 
export default ConversationsPage;