import {NextPageWithLayout} from "@/pages/_app";
import UserPanelLayout from "@/app/components/userPanelLayout";
import Cookies from "universal-cookie";
import React, {useEffect, useState} from "react";
import callApi from "@/app/helpers/callApi";
import Article from "@/app/models/article";
import NoData from "@/app/components/shared/noData";
import ArticleTable from "@/app/components/panel/articles/table";
import {PlusIcon} from "@heroicons/react/24/solid";
import Link from "next/link";
import Fail from "@/app/components/toasts/fail";
import Pagination from "@/app/components/shared/pagination";

const Articles: NextPageWithLayout = () => {
    const cookie = new Cookies;
    const [search, setSearch] = useState('');
    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [articles, setArticles] = useState<Article[]>([]);
    const getArticles = async () => {
        try {
            const res = await callApi().get(`/article?page=${currentPage}&title=${search}`, {
                headers: {
                    Authorization: 'Bearer ' + cookie.get('verifyToken'),
                }
            });
            if (res.status === 200) {
                setArticles(res.data.data.data);
                setTotalPages(res.data.data.last_page);
                setCurrentPage(res.data.data.current_page);
            }
        } catch (error: any) {
            Fail(error.message)
        }
    }
    useEffect(() => {
        getArticles()
    }, [currentPage, search]);
    const searchHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
        // @ts-ignore
        setSearch(e.target.value)
    }
    return (
        <>
            <div>
            <div className="flex flex-col sm:flex-row justify-between items-center">
                <h1 className="text-4xl">
                    Articles
                </h1>
                <div className="w-80 sm:w-96 mt-3 sm:mt-0">
                    <label htmlFor="default-search"
                           className="text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true"
                                 xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                      strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                            </svg>
                        </div>
                        <input type="search" id="default-search" onKeyUp={(e) => searchHandler(e)}
                               className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                               placeholder="Search Articles" required/>
                        <button type="submit"
                                className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            Search
                        </button>
                    </div>
                </div>
                <Link href="/panel/articles/create"
                        className="mt-2 sm:mt-0 rounded flex items-center bg-none border-2 border-blue-500 p-2 text-blue-500 hover:bg-blue-500 hover:text-gray-100 hover:dark:text-gray-900">
                    <PlusIcon className="flex-shrink-0 h-5 w-5"/>
                    <span className="ml-1">
                        Create New Article
                    </span>
                </Link>
            </div>
                {
                    articles.length > 0
                        ? <ArticleTable articles={articles}/>
                        : <NoData/>
                }
                <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage}/>
            </div>
        </>
    )
}

Articles.getLayout = (page) => <UserPanelLayout>{page}</UserPanelLayout>

export default Articles