"use client"
import { useModal } from "@/hooks/use-model-store"
import { ActionToolTip } from "../action-tooltip"
import { Plus } from "lucide-react"

export const NavigationAction =()=>{
    const {onOpen} = useModal()
    return (
        <div>
            <ActionToolTip label="Add a server" align="center" side="right" >
            <button className="group flex items-center" onClick={()=>onOpen("createServer")}>
                <div className="flex mx-3 h-[48px] w-[48px] rounded-[24px] group-hover:rounded-[16px] transition-all overflow-hidden items-center justify-center bg-gray-100 dark:bg-neutral-700 group-hover:bg-emerald-500 ">
                    <Plus className="group-hover:text-white transition-all text-emerald-500" size={25}/>

                </div>
            </button>
            </ActionToolTip>
        </div>
    )
}