import { currentProfile } from "@/lib/current-profile"
import { db } from "@/lib/db"
import { redirect } from "next/navigation"
import { NextResponse } from "next/server"

export async function PATCH(
    req: Request,
    { params }: { params: { serverid: string } }
) {

    try {

        const profile = await currentProfile()

        const { name, imageUrl } = await req.json()

        if (!profile) {
            redirect("/login")
            return new Response("Not logged in", { status: 401 })
        }

        const server = await db.server.update({
            where: {
                id: params.serverid,
                profileId: profile.id
            },
            data: {
                name,
                imageUrl
            }
        })

        return NextResponse.json(server)
    }
    catch (error) {
        console.log("Server_id_error_settings", error)
        return new NextResponse("Internal Server Error", { status: 500 })
    }

}