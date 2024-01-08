import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import React from "react";
import { NavigationAction } from "./navigation-action";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { NavigationItem } from "./navigation-item";
import { ModeToggle } from "../mode-toggle";
import { signOut } from "@/auth";
import { Button } from "@/components/ui/button";

export default async function NavigationSidebar() {
  const profile = await currentProfile();

  if (!profile) {
    redirect("/login");
  }

  const servers = await db.server.findMany({
    where: {
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  });

  return (
    <div className="space-y-4 flex flex-col items-center h-full text-primary w-full dark:bg-[#1E1F22] py-3">
      <NavigationAction />
      <Separator className="h-[2px] bg-zinc-300 dark:bg-zinc-700 rounded-md mx-auto w-10" />
      <ScrollArea className="flex-1 w-full">
        {servers.map((item, i) => (
          <div key={item.id} className="mb-4">
            <NavigationItem
              id={item.id}
              imageUrl={item.imageUrl}
              name={item.name}
            />
          </div>
        ))}
      </ScrollArea>
      <div className="pb-3 mt-auto flex items-center flex-col gap-y-4 ">
        <ModeToggle />
        <form
          action={async () => {
            "use server";

            await signOut();
          }}
        >
          <Button type="submit">Logout</Button>
        </form>
      </div>
    </div>
  );
}
