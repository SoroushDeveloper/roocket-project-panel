import {useAppSelector} from "@/app/hooks";
import {selectUser} from "@/app/store/auth";
import {removeLoginToken} from "@/app/helpers/auth";
import {useRouter} from "next/router";
import Link from "next/link";

const UserInfo = () => {
    const user = useAppSelector(selectUser)
    const router = useRouter();
    const logoutHandler = async () => {
        await removeLoginToken();
        await router.push('/auth/login');
    }
    return (
        <>
            <div className="flex justify-between items-center p-5">
                <h2>
                    User : {user}
                </h2>
                <div>
                    <Link href="/panel/profile">
                        <button
                            className="mr-5 bg-none text-yellow-500 border-yellow-500 border-2 hover:bg-yellow-500 hover:text-white dark:hover:text-black rounded p-2">
                            Profile
                        </button>
                    </Link>
                    <button
                        className="bg-none text-red-500 border-red-500 border-2 hover:bg-red-500 hover:text-white dark:hover:text-black rounded p-2"
                        onClick={logoutHandler}>
                        Logout
                    </button>
                </div>
            </div>
        </>
    )
}

export default UserInfo