"use client"
import { UploadButton,UploadDropzone } from "@/lib/upload-thing"
import { X } from "lucide-react"
import Image from "next/image"

import "@uploadthing/react/styles.css"
import { error } from "console"

interface FileUploads{
    onChange : (url?: string) => void,
    value : string,
    endpoint : "messageFile" | "serverImage" | "imageUploader"
}
export const FileUpload =({onChange,value,endpoint}:FileUploads)=>{
    const FileType = value?.split(".").pop()
    if(value && FileType !=="pdf"){
      return (
        <div className="relative h-20 w-20">
          <Image fill src={value} alt="upload" className="rounded-full" />
          <button onClick={()=>onChange("")} className="bg-rose-500 text-white p-1 rounded-full absolute top-0 right-0" type="button">
            <X className="h-4 w-4 " />
          </button>
        </div>
      )
    }
    return (
        <UploadDropzone
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          // Do something with the response
          console.log("client upload complete", res[0].url);
          onChange(res[0]?.url)
        }}
        onUploadError={(error: Error) => {
          // Do something with the error.
          alert(`ERROR! ${error.message}`);
        }}
      />
    )
}