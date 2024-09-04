import React from "react";
import Link from "next/link";
import {useRouter} from "next/router";

interface Props {
    children: React.ReactElement,
    classNames?: string,
    hideSidebar: any,
    name: string,
    link: string,
    as?: string,
}

export default function SidebarItems({children, classNames = '', name, link, as = '', hideSidebar}: Props) {
    const {asPath} = useRouter();
    const active = asPath === link || asPath === as;
    return (
        <>
            <li>
                <Link href={link} onClick={hideSidebar}
                      className={`${classNames} flex items-center p-2 text-gray-900 rounded-lg dark:text-white group ${active ? 'bg-blue-500 hover:bg-blue-600' : 'hover:bg-gray-300 dark:hover:bg-gray-700'}`}>
                    {children}
                    <span className="ms-3">
                        {name}
                    </span>
                </Link>
            </li>
        </>
    )
}