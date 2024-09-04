import React from "react";
import moment from "moment";
import Comment from "@/app/models/comment"
import {
    EyeIcon,
    TrashIcon
} from "@heroicons/react/24/outline";

export default function CommentItem({showModal, comment, deleteComment}: {
    showModal: any,
    comment: Comment,
    deleteComment: any,
}) {
    let status = '---';
    switch (comment.status_label) {
        case 'در انتظار بررسی':
            status = 'Pending';
            break;
        case 'تایید شده':
            status = 'Approved';
            break;
        case 'رد شده':
            status = 'Rejected';
            break;
    }
    const createdAt = moment(comment.created_at).format('MMMM Do YYYY, h:mm:ss A');
    return (
        <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
            <th scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {comment.id}
            </th>
            <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {comment.name}
            </th>
            <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {status}
            </th>
            <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {createdAt}
            </th>
            <th className="px-6 py-4">
                <div className="flex justify-start items-stretch sm:items-center">
                    <button type="button" onClick={() => showModal(comment.id)}
                            className="rounded flex items-center bg-none border-2 border-cyan-500 p-2 text-cyan-500 hover:bg-cyan-500 hover:text-gray-100 hover:dark:text-gray-900">
                        <EyeIcon className="flex-shrink-0 h-5 w-5"/>
                        <span className="hidden sm:block sm:ml-1">
                            Show
                        </span>
                    </button>
                    <button type="button" onClick={() => deleteComment(comment.id)}
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