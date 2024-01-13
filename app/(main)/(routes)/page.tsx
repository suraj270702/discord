import { LoginButton } from "@/app/components/auth/login-button";
import { Button } from "@/components/ui/button";
import { currentProfile } from "@/lib/current-profile";
import { redirect } from "next/navigation";


export default async function Home() {
  
  return (
   <>
   <div className="flex flex-col items-center justify-center h-screen">
    
      <LoginButton mode="modal">
      <Button>
        Login
      </Button>
      </LoginButton>
    
   </div>
   </>
  )
}
