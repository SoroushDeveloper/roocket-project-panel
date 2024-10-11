import {NextPageWithLayout} from "@/pages/_app";
import UserPanelLayout from "@/app/components/userPanelLayout";
import Cookies from "universal-cookie";
import React, {useEffect, useState} from "react";
import callApi from "@/app/helpers/callApi";
import NoData from "@/app/components/shared/noData";
import Fail from "@/app/components/toasts/fail";
import {useRouter} from 'next/router'
import Comment from "@/app/models/comment"
import Success from "@/app/components/toasts/success";
import CommentItem from "@/app/components/panel/articles/comments/item";
import ShowComment from "@/app/components/panel/articles/comments/show";
import Pagination from "@/app/components/shared/pagination";
import Link from "next/link";
import {ChevronLeftIcon} from "@heroicons/react/24/solid";
import Back from "@/app/components/shared/back";

const Comments: NextPageWithLayout = () => {
    const cookie = new Cookies;
    const router = useRouter();
    const token = cookie.get('verifyToken');
    const articleId = router.query.argument;
    const [status, setStatus] = useState('');
    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [showModal, setShowModal] = useState(false);
    const [comments, setComments] = useState<Comment[]>([]);
    const [commentId, setCommentId] = useState<undefined | number>(undefined);
    const getComments = async () => {
        try {
            const res = await callApi().get(`article/${articleId}/comments?page=${currentPage}&status=${status}`, {
                headers: {
                    Authorization: 'Bearer ' + token,
                }
            });
            if (res.status === 200) {
                setComments(res.data.data.data);
                setTotalPages(res.data.data.last_page);
                setCurrentPage(res.data.data.current_page);
            }
        } catch (error: any) {
            Fail(error.message)
        }
    }
    useEffect(() => {
        getComments()
    }, [status, currentPage])
    const setCommentStatus = async (status: string) => {
        try {
            const res = await callApi().patch('comment/' + commentId + '/' + status, {}, {
                headers: {
                    Authorization: 'Bearer ' + token,
                }
            });
            if (res.status === 200) {
                const text = status == 'approve' ? 'Approved' : 'Rejected';
                Success('Comment ' + text + ' Successfully');
                hideModalHandler();
                const newCommentsList = comments.filter(function (comment) {
                    if (comment.id == commentId)
                        comment.status_label = text;
                    return comment;
                })
                setComments(newCommentsList)
            }
        } catch (error: any) {
            Fail(error.message)
        }
    }
    const showModalHandler = (id: number) => {
        setCommentId(id)
        setTimeout(function () {
            setShowModal(true);
        }, 500)
    }
    const hideModalHandler = () => {
        setShowModal(false);
    }
    const deleteComment = async (id: number) => {
        try {
            const res = await callApi().delete('comment/' + id, {
                headers: {
                    Authorization: 'Bearer ' + token,
                }
            })
            if (res.status == 200) {
                const newCommentsList = comments.filter(function (comment) {
                    return comment.id != id;
                })
                setComments(newCommentsList)
                Success('Comment Deleted Successfully')
            }
        } catch (error: any) {
            Fail(error.message)
        }
    }

    return (
        <>
            <div>
                <div className="flex flex-col sm:flex-row justify-between items-center">
                    <h1 className="text-4xl">
                        Article {articleId} Comments
                    </h1>
                    <div className="mt-3 sm:mt-0 flex items-center">
                        <Link href="/panel/articles"
                            className="mr-2 rounded hidden sm:flex items-center bg-none border-2 border-gray-500 p-2 text-gray-500 hover:bg-gray-500 hover:text-gray-100 hover:dark:text-gray-900">
                            <ChevronLeftIcon className="flex-shrink-0 h-5 w-5 mr-2"/>
                            Articles
                        </Link>
                        <select id="categories" name="category" value={status}
                                className="bg-gray-200 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                onChange={(e) => setStatus(e.target.value)}>
                            <option value="">All</option>
                            <option value="waiting">Pending</option>
                            <option value="approved">Approved</option>
                            <option value="rejected">Rejected</option>
                        </select>
                    </div>
                </div>
                {comments.length > 0
                    ? (
                        <div
                            className="relative overflow-x-auto shadow-md rounded-lg mt-5 dark:border-2 dark:border-gray-700">
                            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                <thead
                                    className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        ID
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Name
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Status
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Created At
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Operations
                                    </th>
                                </tr>
                                </thead>
                                <tbody>
                                {comments.map((comment: Comment, key) => (
                                    <CommentItem key={key} comment={comment} showModal={showModalHandler}
                                                 deleteComment={deleteComment}/>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    )
                    : <NoData/>}
            </div>
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage}/>
            <ShowComment showModal={showModal} hideModal={hideModalHandler}
                         commentId={commentId} setCommentStatus={setCommentStatus}/>
            <Back/>
        </>
    )
}

Comments.getLayout = (page) => <UserPanelLayout>{page}</UserPanelLayout>

export default Comments