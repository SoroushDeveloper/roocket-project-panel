import {NextPageWithLayout} from "@/pages/_app";
import UserPanelLayout from "@/app/components/userPanelLayout";
import Cookies from "universal-cookie";
import React, {useEffect, useState} from "react";
import callApi from "@/app/helpers/callApi";
import Article from "@/app/models/article";
import NoData from "@/app/components/shared/noData";
import ArticleTable from "@/app/components/panel/articles/table";

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
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getArticles()
    }, [])
    return (
        <div>
            <div className="flex justify-between items-center">
                <h1 className="text-4xl">
                    Articles
                </h1>
                <button type="button"
                        className="rounded bg-none border-2 border-blue-500 p-2 text-blue-500 hover:bg-blue-500 hover:text-gray-100 hover:dark:text-gray-900">
                    Create New Article
                </button>
            </div>
            {
                articles.length > 0
                    ? <ArticleTable articles={articles}/>
                    : <NoData/>
            }
        </div>
    )
}

Articles.getLayout = (page) => <UserPanelLayout>{page}</UserPanelLayout>

export default Articles