import {NextPageWithLayout} from "@/pages/_app";
import UserPanelLayout from "@/app/components/userPanelLayout";
import Hr from "@/app/components/shared/hr";
import React, {useEffect, useState} from "react";
import Link from "next/link";
import {ChevronLeftIcon} from "@heroicons/react/24/solid";
import Cookies from "universal-cookie";
import {useRouter} from "next/router";
import callApi from "@/app/helpers/callApi";
import Fail from "@/app/components/toasts/fail";
import EditArticleForm from "@/app/forms/panel/article/editArticleForm";
import {ArticleFormValuesInterface} from "@/app/contracts/panel";
import Back from "@/app/components/shared/back";

const EditArticle: NextPageWithLayout = () => {
    const cookie = new Cookies;
    const router = useRouter();
    const token = cookie.get('verifyToken');
    const slug = router.query.argument;
    const [article, setArticle] = useState<ArticleFormValuesInterface>();
    const getArticle = async () => {
        try {
            const res = await callApi().get('article/' + slug, {
                headers: {
                    Authorization: 'Bearer ' + token,
                }
            });
            if (res.status === 200) {
                setArticle(res.data.data);
            }
        } catch (error: any) {
            Fail(error.message)
        }
    }
    useEffect(() => {
        getArticle()
    }, [])
    return (
        <div>
            <div className="flex justify-between">
                <h1 className="text-4xl">
                    Edit Article
                </h1>
                <Link href="/panel/articles"
                      className="hidden sm:flex rounded items-center bg-none border-2 border-gray-500 p-2 text-gray-500 hover:bg-gray-500 hover:text-gray-100 hover:dark:text-gray-900">
                    <ChevronLeftIcon className="flex-shrink-0 h-5 w-5 mr-2"/>
                    Back to Articles
                </Link>
            </div>
            <Hr my={true}/>
            {article && <EditArticleForm article={article}/>}
            <Back/>
        </div>
    )
}

EditArticle.getLayout = (page) => <UserPanelLayout>{page}</UserPanelLayout>

export default EditArticle