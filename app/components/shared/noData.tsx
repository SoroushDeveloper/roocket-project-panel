import {ExclamationCircleIcon} from "@heroicons/react/24/solid";
import React from "react";

export default function NoData() {
    return (
        <>
            <div className="text-center bg-gray-200 dark:bg-gray-800 p-5 mt-5 rounded flex justify-center">
                <ExclamationCircleIcon className="flex-shrink-0 h-6 w-6"/>
                <h2 className="ml-2">
                    No Data Available
                </h2>
            </div>
        </>
    )
}