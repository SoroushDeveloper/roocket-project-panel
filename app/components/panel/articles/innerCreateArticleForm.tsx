import {Form, FormikProps} from "formik";

import Input from "@/app/components/shared/form/input";
import {ArticleFormValuesInterface} from "@/app/contracts/panel";
import React, {useEffect, useState} from "react";
import Category from "@/app/models/category";
import callApi from "@/app/helpers/callApi";
import Fail from "@/app/components/toasts/fail";
import Cookies from "universal-cookie";
import {CheckCircleIcon} from "@heroicons/react/24/solid";
import Editor from "@/app/components/shared/editor";

const InnerCreateArticleForm = (props: FormikProps<ArticleFormValuesInterface>) => {
    const cookie = new Cookies;
    const token = cookie.get('verifyToken')
    const [categories, setCategories] = useState<Category[]>([])
    const getCategories = async () => {
        try {
            const res = await callApi().get('article-category', {
                headers: {
                    Authorization: 'Bearer ' + token,
                }
            });
            if (res.status === 200) {
                setCategories(res.data.data.data);
            }
        } catch (error: any) {
            Fail(error.message)
        }
    }
    useEffect(() => {
        getCategories()
    }, [])
    return (
        <>
            <Form className="space-y-4 md:space-y-6">
                <div className="grid gap-6 mb-6 md:grid-cols-3">
                    <div>
                        <Input type="text" name="title" label="Title"/>
                    </div>
                    <div>
                        <Input type="text" name="slug" label="Slug"/>
                    </div>
                    <div>
                        <label htmlFor="categories"
                               className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Category
                        </label>
                        <select id="categories" name="category_id"
                                className="bg-gray-200 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option selected>Choose a category</option>
                            {categories.map((category, key) =>
                                <option key={key} value={category.id}>{category.title}</option>)}
                        </select>
                    </div>
                </div>
                <div className="grid gap-6 mb-6 md:grid-cols-3">
                    <div>
                        <label htmlFor="keywords"
                               className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Keywords
                        </label>
                        <textarea id="keywords" rows={4} name="keywords"
                                  className="resize-none block p-2.5 w-full text-sm text-gray-900 bg-gray-200 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                  placeholder="Separate with commas"></textarea>
                    </div>
                    <div>
                        <label htmlFor="description"
                               className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Description
                        </label>
                        <textarea id="description" rows={4} name="description"
                                  className="resize-none block p-2.5 w-full text-sm text-gray-900 bg-gray-200 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                  placeholder="Write a description for this article"></textarea>
                    </div>
                    <div>
                        <label htmlFor="summary"
                               className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Summary
                        </label>
                        <textarea id="summary" rows={4} name="summary"
                                  className="resize-none block p-2.5 w-full text-sm text-gray-900 bg-gray-200 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                  placeholder="Write a summary about this article"></textarea>
                    </div>
                </div>
                <div className="grid gap-6 mb-6 md:grid-cols-1">
                <textarea name="content" id="content" rows={4}
                            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-200 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Write your thoughts here..."></textarea>
                </div>
                <div className="grid gap-6 mb-6 md:grid-cols-1">
                    <div>
                        <Input name="image_url" label="Image URL"/>
                    </div>
                </div>
                <div
                    className="flex items-center justify-end pt-5 border-t border-solid border-gray-400 dark:border-gray-600 rounded-b">
                    <div className="flex space-x-2">
                        <button type="submit"
                                className="flex items-center border-green-500 border hover:bg-green-500 hover:text-white dark:hover:text-black text-green-500 font-bold py-2 px-4 rounded dark:text-green-500">
                            <CheckCircleIcon className="flex-shrink-0 h-5 w-5 mr-2"/>
                            Submit
                        </button>
                    </div>
                </div>
            </Form>
        </>
    )
}

export default InnerCreateArticleForm