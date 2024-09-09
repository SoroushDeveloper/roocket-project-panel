import React, {useState} from "react";

import {
    HomeIcon,
    UserIcon,
    UsersIcon,
    XMarkIcon,
    PowerIcon,
    FolderIcon,
    NewspaperIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import SidebarItems from "@/app/components/sidebar/items";
import {removeLoginToken} from "@/app/helpers/auth";
import router from "next/router";
import Link from "next/link";
import Hr from "@/app/components/shared/hr";

export default function Sidebar() {
    const navigation = [
        {name: 'Dashboard', href: '/panel', icon: HomeIcon},
        {name: 'Article Categories', href: '/panel/categories', icon: FolderIcon},
        {name: 'Articles', href: '/panel/articles', icon: NewspaperIcon},
        {name: 'Contacts', href: '/panel/contacts', icon: UsersIcon},
        {name: 'Profile', href: '/panel/profile', icon: UserIcon},
    ];
    const [showSidebar, setShowSidebar] = useState(false)
    const showSidebarHandler = () => {
        setShowSidebar(!showSidebar)
    }
    const logoutHandler = async () => {
        await removeLoginToken();
        await router.push('/auth/login');
    }
    return (
        <>
            <button data-drawer-target="logo-sidebar" data-drawer-toggle="logo-sidebar" aria-controls="logo-sidebar"
                    type="button" onClick={showSidebarHandler} hidden={showSidebar}
                    className={`inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 ${showSidebar ? 'opacity-0' : ''}`}>
                <span className="sr-only">Open sidebar</span>
                <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20"
                     xmlns="http://www.w3.org/2000/svg">
                    <path clipRule="evenodd" fillRule="evenodd"
                          d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                </svg>
            </button>
            <button type="button" onClick={logoutHandler}
                    className={`inline-flex float-end items-center p-2 mt-2 me-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 ${showSidebar ? 'opacity-0' : ''}`}>
                <span className="sr-only">Logout</span>
                <PowerIcon className="flex-shrink-0 h-6 w-6"/>
            </button>
            <Link href="/panel/profile"
                    className={`inline-flex float-end items-center p-2 mt-2 me-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 ${showSidebar ? 'opacity-0' : ''}`}>
                <span className="sr-only">Profile</span>
                <UserIcon className="flex-shrink-0 h-6 w-6"/>
            </Link>
            <aside id="logo-sidebar"
                   className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform shadow-2xl shadow-gray-100 dark:shadow-gray-900 sm:shadow-none ${!showSidebar ? '-translate-x-full' : ''} sm:translate-x-0`}
                   aria-label="Sidebar">
                <div className="h-full px-3 py-4 overflow-y-auto bg-gray-100 dark:bg-gray-900 sm:mt-4 sm:ml-2 sm:rounded">
                    <div className="flex justify-start items-center mb-5">
                        <button data-drawer-target="logo-sidebar" data-drawer-toggle="logo-sidebar"
                                aria-controls="logo-sidebar"
                                type="button" onClick={showSidebarHandler}
                                className="inline-flex items-center me-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                            <span className="sr-only">Open sidebar</span>
                            <XMarkIcon className="flex-shrink-0 h-6 w-6"/>
                        </button>
                        <Link href="/panel"
                              className="flex justify-start items-center border-gray-400 dark:border-gray-600 border-l-2 pl-3 sm:border-none">
                            <Image src="https://flowbite.com/docs/images/logo.svg"
                                   className="h-6 sm:h-7 hidden sm:block"
                                   alt="Flowbite Logo" width="60" height="60"/>
                            <span
                                className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
                            Admin Panel
                        </span>
                        </Link>
                    </div>
                    <Hr my={false}/>
                    <div className="flex flex-col justify-between">
                        <ul className="space-y-2 font-medium mt-3 w-56">
                            {navigation.slice(0, 4).map((nav, key) =>
                                <SidebarItems key={key} name={nav.name} link={nav.href}
                                              hideSidebar={showSidebarHandler}>
                                    <nav.icon className="flex-shrink-0 h-6 w-6"/>
                                </SidebarItems>
                            )}
                        </ul>
                        <ul className="space-y-2 font-medium mt-3 fixed bottom-2 w-56">
                            {navigation.slice(4, 5).map((nav, key) =>
                                <SidebarItems key={key} name={nav.name} link={nav.href}
                                              hideSidebar={showSidebarHandler}>
                                    <nav.icon className="flex-shrink-0 h-6 w-6"/>
                                </SidebarItems>
                            )}
                            <li>
                                <button
                                    className="flex items-center p-2 text-gray-900 bg-red-500 rounded-lg dark:text-gray-100 group hover:bg-red-700 w-full"
                                    onClick={logoutHandler}>
                                    <PowerIcon className="flex-shrink-0 h-6 w-6"/>
                                    <span className="ms-3">
                                        Logout
                                    </span>
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </aside>
        </>
    )
}