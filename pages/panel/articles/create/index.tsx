import {NextPageWithLayout} from "@/pages/_app";
import UserPanelLayout from "@/app/components/userPanelLayout";
import Hr from "@/app/components/shared/hr";
import React from "react";
import Link from "next/link";
import {ChevronLeftIcon} from "@heroicons/react/24/solid";
import CreateArticleForm from "@/app/forms/panel/article/createArticleForm";
import Back from "@/app/components/shared/back";

const CreateArticle: NextPageWithLayout = () => {
    return (
        <div>
            <div className="flex flex-col sm:flex-row justify-between items-center">
                <h1 className="text-4xl">
                    Create New Article
                </h1>
                <Link href="/panel/articles"
                      className="mt-3 sm:mt-0 rounded flex items-center bg-none border-2 border-gray-500 p-2 text-gray-500 hover:bg-gray-500 hover:text-gray-100 hover:dark:text-gray-900">
                    <ChevronLeftIcon className="flex-shrink-0 h-5 w-5 mr-2"/>
                    Back to Articles
                </Link>
            </div>
            <Hr my={true}/>
            <CreateArticleForm/>
            <Back/>
        </div>
    )
}

CreateArticle.getLayout = (page) => <UserPanelLayout>{page}</UserPanelLayout>

export default CreateArticle