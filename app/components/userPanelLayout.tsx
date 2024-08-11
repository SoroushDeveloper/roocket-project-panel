import {ReactNode} from "react";
import useAuth from "@/app/hooks/useAuth";
import {useRouter} from "next/router";
import Sidebar from "@/app/components/sidebar";

interface Props {
    children: ReactNode,
}

const UserPanelLayout = ({children}: Props) => {
    const router = useRouter()
    const {user, error, loading} = useAuth()

    if (loading) return <h1>Loading ...</h1>

    if (error) {
        // show error
        router.push('/auth/login');
    }

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