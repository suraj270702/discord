import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { db } from "./db";

export const initialProfile = async() => {
    
    const session = await auth()

    const user = session?.user

    if(!user){
        redirect("/login")
    }

    const profile = await db.profile.findUnique({
        where:{
            userId : user?.id
        }
    })

    if(profile){
        return profile
    }
    const defaultImageUrl = "https://svgsilh.com/svg_v2/659651.svg";

// ... inside your code block
     const imageUrl = user?.image ? user.image : defaultImageUrl;
    const newProfile = await db.profile.create({
        data:{
            userId : user?.id as string,
            name : user?.name as string,
            email: user?.email as string,
            imageUrl:imageUrl

        }
    })

    return newProfile
}