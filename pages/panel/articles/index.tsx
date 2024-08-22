import {NextPageWithLayout} from "@/pages/_app";
import UserPanelLayout from "@/app/components/userPanelLayout";
import Cookies from "universal-cookie";
import React, {useEffect, useState} from "react";
import callApi from "@/app/helpers/callApi";
import Article from "@/app/models/article";
import NoData from "@/app/components/shared/noData";
import ArticleTable from "@/app/components/panel/articles/table";
import {PlusIcon} from "@heroicons/react/24/solid";
import Category from "@/app/models/category";
import Router from "next/router";
import Link from "next/link";
import Fail from "@/app/components/toasts/fail";

const Articles: NextPageWithLayout = () => {
    const cookie = new Cookies;
    const [articles, setArticles] = useState<Article[]>([])
    const getArticles = async () => {
        try {
            const res = await callApi().get('/article', {
                headers: {
                    Authorization: 'Bearer ' + cookie.get('verifyToken'),
                }
            });
            if (res.status === 200) {
                setArticles(res.data.data.data);
            }
        } catch (error: any) {
            Fail(error.message)
        }
    }
    useEffect(() => {
        getArticles()
    }, [articles])
    return (
        <>
            <div>
                <div className="flex justify-between items-center">
                    <h1 className="text-4xl">
                        Articles
                    </h1>
                    <Link href="/panel/articles/create"
                          className="rounded flex items-center bg-none border-2 border-blue-500 p-2 text-blue-500 hover:bg-blue-500 hover:text-gray-100 hover:dark:text-gray-900">
                        <PlusIcon className="flex-shrink-0 h-5 w-5"/>
                        <span className="hidden sm:block sm:ml-1">
                            Create New Article
                        </span>
                    </Link>
                </div>
                {
                    articles.length > 0
                        ? <ArticleTable articles={articles}/>
                        : <NoData/>
                }
            </div>
        </>
    )
}

Articles.getLayout = (page) => <UserPanelLayout>{page}</UserPanelLayout>

export default Articles