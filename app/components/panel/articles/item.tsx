import Article from "@/app/models/article";
import moment from "moment";

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
                <div className="flex flex-col sm:flex-row justify-start items-stretch">
                    <button type="button"
                            className="rounded bg-none border-2 border-yellow-500 p-2 text-yellow-500 hover:bg-yellow-500 hover:text-gray-100 hover:dark:text-gray-900">
                        Edit
                    </button>
                    <button type="button"
                            className="mt-2 sm:mt-0 sm:ml-5 rounded bg-none border-2 border-red-500 p-2 text-red-500 hover:bg-red-500 hover:text-gray-100 hover:dark:text-gray-900">
                        Delete
                    </button>
                </div>
            </th>
        </tr>
    )
}