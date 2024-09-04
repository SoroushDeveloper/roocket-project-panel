import {ReactNode, useEffect} from "react";
import {useRouter} from "next/router";
import Sidebar from "@/app/components/sidebar";
import Cookies from "universal-cookie";
import useAuth from "@/app/hooks/useAuth";

interface Props {
    children: ReactNode,
}

const UserPanelLayout = ({children}: Props) => {
    const router = useRouter()
    const cookie = new Cookies;
    const token = cookie.get('verifyToken');
    useEffect(() => {
        if (token === undefined) {
            // show error
            router.push('/auth/login');
        }
    }, [])
    useAuth()

    return (
        <>
            <Sidebar/>
            <div className="p-4 sm:ml-64">
                <div className="p-5 bg-gray-100 dark:bg-gray-900 rounded">
                    {children}
                </div>
            </div>
        </>
    )
}

export default UserPanelLayout