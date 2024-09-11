import { Button } from "./button";
import { useRouter } from "next/navigation"

interface AppbarProps {
    user?: {
        name?: string | null;
    },
    // TODO: can u figure out what the type should be here?
    onSignin: any,
    onSignout: any
}

export const Appbar = ({user, onSignin, onSignout}: AppbarProps) => {
    const route = useRouter();
    return <div className="flex justify-between border-b px-4 border-slate-300">
        <div className="text-4xl font-serif flex flex-col justify-center cursor-pointer" onClick={()=> {
            route.push('/dashboard')
        }}>
            TapNGo
        </div>
        <div className="flex flex-col justify-center pt-2">
            <Button onClick={user ? onSignout : onSignin}>{user ? "Logout" : "Login"}</Button>
        </div>
    </div>
}