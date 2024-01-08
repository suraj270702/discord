import { auth } from "@/auth";
import { db } from "./db";

export const currentProfile = async()=>{
    const session = await auth()

    let userId = session?.user.id

    if(!userId){
        return null
    }

    const profile = await db.profile.findUnique({
        where: {userId}
    })

    return profile
}