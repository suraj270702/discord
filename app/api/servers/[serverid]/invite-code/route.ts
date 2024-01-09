import { currentProfile } from "@/lib/current-profile"
import { db } from "@/lib/db"
import { NextResponse } from "next/server"
import { v4 as uuid4 } from "uuid"

export async function PATCH(
    req: Request,
    {params} : {params:{serverid : string}}

){
    try{

        const profile = await currentProfile()

        if(!profile){
            return new NextResponse("Unauthorized",{status : 401})
        }

        if(!params.serverid){
            return new NextResponse("Server id is missing",{status:400})
        }

        const server = await db.server.update({
            where:{
                id : params.serverid,
                profileId : profile.id
            },
            data:{
                inviteCode : uuid4()
            }
        })

        return NextResponse.json(server)
    
    }
    catch(error){
        console.log(error)
        return  new NextResponse("Internal Servor",{status : 500})
    }
}