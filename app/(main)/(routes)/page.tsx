import { LoginButton } from "@/app/components/auth/login-button";
import { Button } from "@/components/ui/button";


export default function Home() {
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
