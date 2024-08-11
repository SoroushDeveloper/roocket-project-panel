import {ReactNode} from "react";
import useAuth from "@/app/hooks/useAuth";
import {useRouter} from "next/router";

interface Props {
    children: ReactNode,
}

const GuestPanelLayout = ({children}: Props) => {
    const router = useRouter()
    const {user, error, loading} = useAuth()

    if (user) {
        router.push('/panel');
    }

    return (
        <div className="w-full text-2xl">
            {children}
        </div>
    )
}

export default GuestPanelLayout