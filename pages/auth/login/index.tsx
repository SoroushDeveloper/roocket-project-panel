import Image from "next/image";
import {NextPageWithLayout} from "@/pages/_app";

import LoginForm from "@/app/forms/auth/loginForm";
import {useAppDispatch} from "@/app/hooks";
import {updateVerifyToken} from "@/app/store/auth";
import GuestPanelLayout from "@/app/components/guestPanelLayout";
import Cookies from "universal-cookie";
import Hr from "@/app/components/shared/hr";

const Login: NextPageWithLayout = () => {
    const dispatch = useAppDispatch();

    const setVerifyToken = (token: string) => {
        const cookie = new Cookies;
        cookie.set('verifyToken', token, {
            maxAge: 60 * 60 * 24,
            sameSite: 'lax',
            path: '/',
        });
        dispatch(updateVerifyToken(token));
    }

    return (
        <>
            <section className="bg-gray-50 dark:bg-gray-900 h-screen sm:w-screen">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                        <Image className="w-8 h-8 mr-2" width="60" height="60"
                               src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo"/>
                        Admin Panel
                    </a>
                    <div
                        className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl text-center sm:text-start font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Login to your account
                            </h1>
                            <Hr my={true}/>
                            <LoginForm setToken={setVerifyToken}/>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

Login.getLayout = page => <GuestPanelLayout>{page}</GuestPanelLayout>

export default Login