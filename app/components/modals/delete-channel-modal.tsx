"use client";

import { Button } from "@/components/ui/button";
import qs from "query-string"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

import { useModal } from "@/hooks/use-model-store";

import { useState } from "react";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";

export const DeleteChannelModal = () => {
  const { isOpen, onOpen, onClose, type, data } = useModal();

  const isModalOpened = isOpen && type === "deleteChannel";

  const { server,channel} = data;

  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter()
  const params = useParams()

  const handleConfirmClick = async() => {
    try {
      setIsLoading(true);
      const url = qs.stringifyUrl({
        url:`/api/channels/${channel?.id}`,
        query:{
            serverid:server?.id
        }
      })
      await axios.delete(url)
      onClose()
      router.refresh()
      router.push(`/server/${server?.id}`)
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isModalOpened} onOpenChange={onClose}>
      <DialogContent className="bg-white text-black p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            Delete Channel
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-500">
            Are you sure want to delete the{" "}
            <span className="font-semibold text-indigo-500">
              {channel?.name}
            </span>{" "}
            channel? You will lose all your progress.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="bg-gray-100 px-6 py-4 ">
          <div className="flex items-center justify-between w-full">
            <Button disabled={isLoading} onClick={onClose} variant="ghost">
              Cancel
            </Button>
            <Button disabled={isLoading} onClick={handleConfirmClick} variant="primary">
              Confirm
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
