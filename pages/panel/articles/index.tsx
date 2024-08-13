import {NextPageWithLayout} from "@/pages/_app";
import UserPanelLayout from "@/app/components/userPanelLayout";
import Cookies from "universal-cookie";
import {useEffect, useState} from "react";
import callApi from "@/app/helpers/callApi";
import Article from "@/app/models/article";
import ArticleItem from "@/app/components/panel/articles/item";

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
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-5">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            ID
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Title
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Category
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Published At
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Operations
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {articles.map((article: Article, key) => (
                        <ArticleItem article={article} key={key}/>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

Articles.getLayout = (page) => <UserPanelLayout>{page}</UserPanelLayout>

export default Articles