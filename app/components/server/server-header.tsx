"use client";

import { ServerWithMembersWithProfiles } from "@/types";
import { MemberRole, Server } from "@prisma/client";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, LogOut, PlusCircle, Settings, Trash, User, UserPlus, Users } from "lucide-react";
import { useModal } from "@/hooks/use-model-store";

interface ServerHeaderProps {
  server: ServerWithMembersWithProfiles;
  role?: MemberRole;
}
const ServerHeader = ({ server, role }: ServerHeaderProps) => {
  const {onOpen} = useModal()
  const isAdmin = role === MemberRole.ADMIN;
  const isModerator = isAdmin || role === MemberRole.MODERATOR;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus:outline-none" asChild>
        <button className="w-full text-md font-semibold px-3 flex items-center h-12 border-neutral-200 dark:border-neutral-800 hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition ">
          {server.name}
          <ChevronDown className="h-5 w-5" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 text-xs font-medium text-black dark:text-neutral-400 space-y-[2px]">
        {isModerator && (
          <DropdownMenuItem onClick={()=>onOpen("invite",{server})} className="text-indigo-600 dark:text-indigo-400 px-3 py-2 text-sm cursor-pointer">
            Invite people
            <UserPlus className="ml-2 h-5 w-5"/>
          </DropdownMenuItem>
        )}
        {isAdmin && (
          <DropdownMenuItem className=" px-3 py-2 text-sm cursor-pointer">
            Server Settings <Settings  className="ml-2 h-5 w-5"/>
            
          </DropdownMenuItem>
        )}
        {isAdmin && (
          <DropdownMenuItem className=" px-3 py-2 text-sm cursor-pointer">
            Manage Member <Users  className="ml-2 h-5 w-5"/>
            
          </DropdownMenuItem>
        )}
        {isModerator && (
          <DropdownMenuItem className="text-indigo-600 dark:text-indigo-400 px-3 py-2 text-sm cursor-pointer">
            Create Channel <PlusCircle  className="ml-2 h-5 w-5"/>
            
          </DropdownMenuItem>
        )}
        {
            isModerator && (
                <DropdownMenuSeparator />
            )
        }
        {isAdmin && (
          <DropdownMenuItem className="text-rose-500 px-3 py-2 text-sm cursor-pointer">
            Delete Channel <Trash  className="ml-2 h-5 w-5"/>
            
          </DropdownMenuItem>
        )}
        {!isAdmin && (
          <DropdownMenuItem className="text-rose-500 px-3 py-2 text-sm cursor-pointer">
            Delete Channel <LogOut  className="ml-2 h-5 w-5"/>
            
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ServerHeader;
