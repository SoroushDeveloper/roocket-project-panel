import Article from "@/app/models/article";
import moment from "moment";
import {
    PencilIcon,
    TrashIcon,
    ChatBubbleBottomCenterIcon
} from "@heroicons/react/24/outline";
import React from "react";
import Link from "next/link";

export default function ArticleItem({article}: { article: Article }) {
    const publishedAt = moment(article.published_at).format('MMMM Do YYYY, h:mm:ss A');
    return (
        <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
            <th scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {article.id}
            </th>
            <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {article.title}
            </th>
            <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {article.category_title}
            </th>
            <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {publishedAt}
            </th>
            <th className="px-6 py-4">
                <div className="flex justify-start items-stretch sm:items-center">
                    <Link href={`/panel/articles/${article.slug}/edit`}
                          className="rounded flex items-center bg-none border-2 border-yellow-500 p-2 text-yellow-500 hover:bg-yellow-500 hover:text-gray-100 hover:dark:text-gray-900">
                        <PencilIcon className="flex-shrink-0 h-5 w-5"/>
                        <span className="hidden sm:block sm:ml-1">
                            Edit
                        </span>
                    </Link>
                    <button type="button"
                            className="ml-2 sm:ml-5 rounded flex items-center bg-none border-2 border-red-500 p-2 text-red-500 hover:bg-red-500 hover:text-gray-100 hover:dark:text-gray-900">
                        <TrashIcon className="flex-shrink-0 h-5 w-5"/>
                        <span className="hidden sm:block sm:ml-1">
                            Delete
                        </span>
                    </button>
                    <Link href={`/panel/articles/${article.id}/comments`}
                          className="ml-2 sm:ml-5 rounded flex items-center bg-none border-2 border-purple-500 p-2 text-purple-500 hover:bg-purple-500 hover:text-gray-100 hover:dark:text-gray-900">
                        <ChatBubbleBottomCenterIcon className="flex-shrink-0 h-5 w-5"/>
                        <span className="hidden sm:block sm:ml-1">
                            Comments
                        </span>
                    </Link>
                </div>
            </th>
        </tr>
    )
}