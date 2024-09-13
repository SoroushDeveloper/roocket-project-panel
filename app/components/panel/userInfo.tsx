import {useAppSelector} from "@/app/hooks";
import {selectUser} from "@/app/store/auth";
import {removeLoginToken} from "@/app/helpers/auth";
import {useRouter} from "next/router";
import Link from "next/link";
import {
    UserIcon,
    UsersIcon,
    PowerIcon,
    FolderIcon,
    NewspaperIcon,
} from "@heroicons/react/24/outline";
import Hr from "../shared/hr";

const UserInfo = () => {
    const user = useAppSelector(selectUser);
    const router = useRouter();
    const logoutHandler = async () => {
        await removeLoginToken();
        await router.push('/auth/login');
    }
    return (
        <>
            <div className="flex flex-col sm:flex-row justify-between items-center p-5">
                <h2 className="text-3xl">
                    Welcome {user}
                </h2>
                <div className="mt-5 sm:mt-0 flex">
                    <Link href="/panel/profile"
                        className="mr-5 bg-none text-yellow-500 border-yellow-500 border-2 hover:bg-yellow-500 hover:text-white dark:hover:text-black rounded p-2 flex">
                        <UserIcon className="flex-shrink-0 h-6 w-6"/>
                        <span className="ms-3">
                            Profile
                        </span>
                    </Link>
                    <button type="button"
                        className="bg-none text-red-500 border-red-500 border-2 hover:bg-red-500 hover:text-white dark:hover:text-black rounded p-2 flex"
                        onClick={logoutHandler}>
                        <PowerIcon className="flex-shrink-0 h-6 w-6"/>
                        <span className="ms-3">
                            Logout
                        </span>
                    </button>
                </div>
            </div>
            <Hr my={false}/>
            <h3 className="text-2xl text-center mt-5">
                Quick Links
            </h3>
            <br/>
            <div className="flex flex-col sm:flex-row justify-center items-center space-y-2 sm:space-y-0 sm:space-x-5">
                <Link href="/panel/categories"
                    className="bg-none text-purple-500 border-purple-500 border-2 hover:bg-purple-500 hover:text-white dark:hover:text-black rounded p-2 flex w-full sm:w-fit">
                    <FolderIcon className="flex-shrink-0 h-6 w-6"/>
                    <span className="ms-3">
                        Article Categories
                    </span>
                </Link>
                <Link href="/panel/articles"
                    className="bg-none text-purple-500 border-purple-500 border-2 hover:bg-purple-500 hover:text-white dark:hover:text-black rounded p-2 flex w-full sm:w-fit">
                    <NewspaperIcon className="flex-shrink-0 h-6 w-6"/>
                    <span className="ms-3">
                        Articles
                    </span>
                </Link>
                <Link href="/panel/contacts"
                    className="bg-none text-purple-500 border-purple-500 border-2 hover:bg-purple-500 hover:text-white dark:hover:text-black rounded p-2 flex w-full sm:w-fit">
                    <UsersIcon className="flex-shrink-0 h-6 w-6"/>
                    <span className="ms-3">
                        Contacts
                    </span>
                </Link>
            </div>
        </>
    )
}

export default UserInfo