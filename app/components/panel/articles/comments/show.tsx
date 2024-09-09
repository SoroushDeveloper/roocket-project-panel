import React, {useEffect, useState} from "react";
import callApi from "@/app/helpers/callApi";
import Cookies from "universal-cookie";
import Fail from "@/app/components/toasts/fail";
import Comment from "@/app/models/comment"
import {XCircleIcon, XMarkIcon} from "@heroicons/react/24/outline";
import {CheckIcon} from "@heroicons/react/24/solid";

export default function ShowComment({commentId = undefined, setCommentStatus, showModal, hideModal}: {
    commentId: number | undefined,
    setCommentStatus: any,
    showModal: boolean,
    hideModal: any,
}) {
    const cookie = new Cookies;
    const [comment, setComment] = useState<undefined | Comment>(undefined)
    const getComment = async () => {
        try {
            const res = await callApi().get('comment/' + commentId, {
                headers: {
                    Authorization: 'Bearer ' + cookie.get('verifyToken'),
                }
            });
            if (res.status === 200) {
                setComment(res.data.data);
            }
        } catch (error: any) {
            Fail(error.message)
        }
    }
    useEffect(() => {
        if (commentId != undefined)
            getComment()
    }, [commentId])
    return (
        <>
            {showModal ? (
                comment != undefined ? (
                    <>
                        <div
                            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none shadow-2xl">
                            <div className="relative w-auto my-6 mx-auto max-w-3xl">
                                <div
                                    className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-gray-100 dark:bg-gray-900 outline-none focus:outline-none">
                                    <div
                                        className="flex items-start justify-between p-5 border-b border-solid border-gray-400 dark:border-gray-600 rounded-t">
                                        <h3 className="text-3xl font-semibold text-gray-900 dark:text-gray-100">
                                            Comment {comment.id}
                                        </h3>
                                    </div>
                                    <div className="relative p-6 flex-auto w-96">
                                        <p>
                                            {comment.content}
                                        </p>
                                    </div>
                                    <div
                                        className="flex items-center justify-end p-4 border-t border-solid border-gray-400 dark:border-gray-600 rounded-b">
                                        <div className="flex space-x-2">
                                            {comment.status_label == 'در انتظار بررسی'
                                                ? (
                                                    <>
                                                        <button type="button"
                                                                className="flex items-center border-green-500 border hover:bg-green-500 hover:text-white dark:hover:text-black text-green-500 font-bold py-2 px-4 rounded dark:text-green-500"
                                                                onClick={() => setCommentStatus('approve')}>
                                                            <CheckIcon className="flex-shrink-0 h-5 w-5"/>
                                                            <span className="hidden sm:block sm:ml-1">
                                                                Approve
                                                            </span>
                                                        </button>
                                                        <button type="button"
                                                                className="flex items-center border-red-500 border hover:bg-red-500 hover:text-white dark:hover:text-black text-red-500 font-bold py-2 px-4 rounded dark:text-red-500"
                                                                onClick={() => setCommentStatus('reject')}>
                                                            <XMarkIcon className="flex-shrink-0 h-5 w-5"/>
                                                            <span className="hidden sm:block sm:ml-1">
                                                                Reject
                                                            </span>
                                                        </button>
                                                    </>
                                                )
                                                : null}
                                            <button type="button" onClick={hideModal}
                                                    className="flex items-center border-gray-500 border hover:bg-gray-500 hover:text-white dark:hover:text-black text-gray-500 font-bold py-2 px-4 rounded dark:text-gray-500">
                                                <XCircleIcon className="flex-shrink-0 h-5 w-5"/>
                                                <span className="hidden sm:block sm:ml-1">
                                                Close
                                            </span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                    </>
                ) : Fail('Couldn\'t get comment info')
            ) : null}
        </>
    )
}