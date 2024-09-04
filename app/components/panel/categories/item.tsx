import Category from "@/app/models/category";
import {PencilIcon, TrashIcon} from "@heroicons/react/24/outline";
import React from "react";

export default function CategoryItem({category, deleteHandler}: { category: Category, deleteHandler: any }) {
    return (
        <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
            <th scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {category.id}
            </th>
            <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {category.title}
            </th>
            <th className="px-6 py-4">
                <div className="flex justify-start items-stretch sm:items-center">
                    <button type="button"
                            className="rounded flex items-center bg-none border-2 border-yellow-500 p-2 text-yellow-500 hover:bg-yellow-500 hover:text-gray-100 hover:dark:text-gray-900">
                        <PencilIcon className="flex-shrink-0 h-5 w-5"/>
                        <span className="hidden sm:block sm:ml-1">
                            Edit
                        </span>
                    </button>
                    <button type="button" onClick={deleteHandler} id={category.id.toString()}
                            className="ml-2 sm:ml-5 rounded flex items-center bg-none border-2 border-red-500 p-2 text-red-500 hover:bg-red-500 hover:text-gray-100 hover:dark:text-gray-900">
                        <TrashIcon className="flex-shrink-0 h-5 w-5"/>
                        <span className="hidden sm:block sm:ml-1">
                            Delete
                        </span>
                    </button>
                </div>
            </th>
        </tr>
    )
}