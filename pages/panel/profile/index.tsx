import {NextPageWithLayout} from "@/pages/_app";
import UserPanelLayout from "@/app/components/userPanelLayout";
import Hr from "@/app/components/shared/hr";
import {useAppSelector} from "@/app/hooks";
import {selectUser} from "@/app/store/auth";

const Profile: NextPageWithLayout = () => {
    const user = useAppSelector(selectUser);
    return (
        <div>
            <h1 className="text-4xl">
                Profile
            </h1>
            <Hr my={true}/>
            <form>
                <div className="grid gap-6 mb-6 md:grid-cols-3">
                    <div>
                        <label htmlFor="name"
                               className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Name
                        </label>
                        <input type="text" id="name" value={user}
                               className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                               placeholder="Your Name" required/>
                    </div>
                    <div>
                        <label htmlFor="password"
                               className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Password
                        </label>
                        <input type="text" id="password"
                               className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                               placeholder="Your Password" required/>
                    </div>
                    <div>
                        <label htmlFor="confirmation"
                               className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Password Confirmation
                        </label>
                        <input type="text" id="confirmation"
                               className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                               placeholder="Your Password Confirmation" required/>
                    </div>
                </div>
                <div className="flex justify-center">
                    <button type="button"
                            className=" rounded flex items-center bg-none border-2 border-green-500 p-2 text-green-500 hover:bg-green-500 hover:text-gray-100 hover:dark:text-gray-900">
                        Update
                    </button>
                </div>
            </form>
        </div>
    )
}

Profile.getLayout = (page) => <UserPanelLayout>{page}</UserPanelLayout>

export default Profile