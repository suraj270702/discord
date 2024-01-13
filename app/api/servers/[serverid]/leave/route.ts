import { currentProfile } from "@/lib/current-profile"
import { db } from "@/lib/db"
import { NextResponse } from "next/server"

export async function PATCH(
    req : Request,
    {params} : {params :{serverid : string}}
){

    try{
        const profile = await currentProfile()
        if(!profile){
            return new NextResponse("Unauthorized access",{status:401})
        }
        if(!params.serverid){
            return new NextResponse("Server Id is missing",{status : 400})
        }

        const server = await db.server.update({
            where:{
                id : params.serverid,
                profileId:{
                    not:profile.id
                },
                members:{
                    some:{
                        profileId:profile.id
                    }
                }
            },
            data:{
                members:{
                    deleteMany:{
                        profileId:profile.id
                    }
                }
            }
        })

        return NextResponse.json(server)
    }
    catch(error){
        console.log("Server id error",error)
        return new NextResponse("Internal Server",{status : 500})
    }
}