import ServerSidebar from "@/app/components/server/server-sidebar";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";

const ServerLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { serverid: string };
}) => {
  const profile = await currentProfile();

  if (!profile) {
    redirect("/login");
  }

  const server = await db.server.findUnique({
    where: {
      id: params.serverid,
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  });

  if (!server) {
    return redirect("/settings");
  }
  return (
    <div className="h-full">
      <div className="h-full hidden md:flex w-60 z-20 flex-col inset-y-0 fixed">
        <ServerSidebar serverid={params.serverid}/>
      </div>
      <main className="h-full md:pl-60">{children}</main>
    </div>
  );
};

export default ServerLayout;
