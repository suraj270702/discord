import { currentProfile } from "@/lib/current-profile"
import { db } from "@/lib/db"
import { NextResponse } from "next/server"


export async function DELETE(
    req:Request,
    {params}:{params:{memberId : string}}
){
    try{
      const profile = await currentProfile()
      const {searchParams} = new URL(req.url)

      const serverId = searchParams.get("severid")
      if(!profile) return new NextResponse("Not Authenticated", {status: 401})

      if(!serverId) return new NextResponse("ServerId is missing",{status:400})

      const server = await db.server.update({
        where:{
            id:serverId,
            profileId:profile.id
        },
        data:{
            members:{
                deleteMany:{
                    id:params.memberId,
                    profileId:{
                        not:profile.id
                    }
                }
            }
        },
        include:{
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

      return NextResponse.json(server)
    }
    catch(error){
        console.log("Error in delete member", error)
        return new NextResponse('Server Error',{status:500})
    }

}

export async function PATCH(
    req:Request,
    {params} : {params : {memberId : string}}
){
    try{
       const profile = await currentProfile()
       const {searchParams} = new URL(req.url)
       const {role} = await req.json()
       const serverId = searchParams.get("serverid")
       if(!profile) return new Response("Not authenticated", {status : 401})

       if(!serverId){
        return new NextResponse("ServerId is missing",{status:400})
       }

       if(!params.memberId){
        return new NextResponse("MemberId is missing",{status:400})
       }
       
       const server = await db.server.update({
        where:{
            id:serverId,
            profileId:profile.id
        },
        data:{
            members:{
                update:{
                    where:{
                        id:params.memberId,
                        profileId:{
                            not:profile.id
                        }
                    },
                    data:{
                        role
                    }
                }
            }
        },
        include:{
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

       return NextResponse.json(server)

    }

    catch(error){
        console.log("MemberId error",error)
        return new NextResponse("Internal Server Error",{status : 500})
    }

}