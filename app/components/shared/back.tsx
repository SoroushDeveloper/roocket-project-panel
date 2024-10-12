import {ArrowLeftIcon} from "@heroicons/react/24/solid";
import router from "next/router";
import React from "react";

export default function Back() {
    return (
        <button onClick={() => router.back()}
                className="fixed bottom-4 left-4 bg-red-500 rounded-full shadow-2xl shadow-black p-3 sm:hidden">
            <ArrowLeftIcon className="h-6 w-6"/>
        </button>
    )
}