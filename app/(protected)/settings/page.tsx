
import { ModeToggle } from "@/app/components/mode-toggle";
import { auth, signOut } from "@/auth";
import { initialProfile } from "@/lib/intialProfile";
import { db } from "@/lib/db";
import {redirect} from "next/navigation"
import { InitialModal } from "@/app/components/modals/initial-modal";

const SettingsPage = async() => {
    const session = await auth()
    const profile = await initialProfile()

    const server = await db.server.findFirst({
        where:{
            members : {
                some: {
                    profileId : profile.id
                }
            }
        }
    })

    if (server) return redirect(`/server/${server.id}`)

    return ( <>
    <InitialModal />
    
    <ModeToggle />
    </> );
}
 
export default SettingsPage;