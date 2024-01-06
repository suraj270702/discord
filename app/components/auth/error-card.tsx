import { Header } from "./header";
import { BackButton } from "./back-button";

import { Card,CardHeader,CardFooter } from "@/components/ui/card";


export const ErrorCard =()=>{
    return (
        <>
        <Card className="w-[400px] shadow-md">

            <CardHeader>
                <Header label="Oops! Something went wrong"/>
            </CardHeader>
            <CardFooter>
                <BackButton label="back to login" href="/login" />
            </CardFooter>

        </Card>
        </>
    )
}