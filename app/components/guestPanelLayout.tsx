import {ReactNode} from "react";
import {useRouter} from "next/router";
import Cookies from "universal-cookie";

interface Props {
    children: ReactNode,
}

const GuestPanelLayout = ({children}: Props) => {
    const router = useRouter()
    const cookie = new Cookies;
    const token = cookie.get('verifyToken');
    if (token !== undefined) {
        router.push('/panel');
    }

    return (
        <div className="w-full text-2xl">
            {children}
        </div>
    )
}

export default GuestPanelLayout