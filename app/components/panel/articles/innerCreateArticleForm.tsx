import {ErrorMessage, Field, Form, FormikProps} from "formik";

import Input from "@/app/components/shared/form/input";
import {ArticleFormValuesInterface} from "@/app/contracts/panel";
import React, {useEffect, useState} from "react";
import Category from "@/app/models/category";
import callApi from "@/app/helpers/callApi";
import Fail from "@/app/components/toasts/fail";
import Cookies from "universal-cookie";
import {CheckCircleIcon} from "@heroicons/react/24/solid";
import Textarea from "../../shared/form/textarea";
import Checkbox from "../../shared/form/checkbox";
import TextEditor from "@/app/components/shared/form/textEditor";

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
                        <Field id="categories" name="category_id" as='select'
                               className="bg-gray-200 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option>Choose a category</option>
                            {categories.map((category, key) =>
                                <option key={key} value={category.id}>{category.title}</option>)}
                        </Field>
                    </div>
                </div>
                <div className="grid gap-6 mb-6 md:grid-cols-3">
                    <div>
                        <Textarea name="keywords" label="Keywords"/>
                    </div>
                    <div>
                        <Textarea name="description" label="Description"/>
                    </div>
                    <div>
                        <Textarea name="summary" label="Summary"/>
                    </div>
                </div>
                <div className="grid gap-6 mb-6 md:grid-cols-1">
                    <div>
                        <label htmlFor="content"
                               className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Content
                        </label>
                        <Field id="content" name="content" as="textarea" rows={4} component={TextEditor}
                               className="bg-gray-200 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                        <ErrorMessage name="content" component="div"
                                      className="mt-2 p-1 text-center rounded-md opacity-75 bg-red-500 text-gray-100 dark:text-gray-900 text-sm"/>
                    </div>
                </div>
                <div className="grid gap-6 mb-6 md:grid-cols-1">
                    <div>
                        <Input name="image_url" label="Image URL"/>
                    </div>
                </div>
                <div className="grid gap-6 mb-6 md:grid-cols-1">
                    <Checkbox name="is_published" label="Publish This Article"/>
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