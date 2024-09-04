import Article from "@/app/models/article";
import ArticleItem from "@/app/components/panel/articles/item";
import React from "react";

export default function ArticleTable({articles}: { articles: Article[] }) {
    return (
        <>
            <div className="relative overflow-x-auto shadow-md rounded-lg mt-5 dark:border-2 dark:border-gray-700">
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
                        <ArticleItem key={key} article={article}/>
                    ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}