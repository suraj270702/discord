
import { FaAccessibleIcon } from "react-icons/fa";


interface FormSuccessProps {

    message?:string

}

export const FormSuccess = ({message}:FormSuccessProps)=>{
   
    if(!message) return null

    return (
        <div className="bg-emerald-500/15 p-3 rounded-md flex items-center gap-x-2 text text-emerald" >
           <p className="h-6 w-6">🎉</p>
           <p>{message}</p>
        </div>
    )

}