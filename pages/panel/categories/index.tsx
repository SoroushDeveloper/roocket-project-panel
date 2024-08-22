import {NextPageWithLayout} from "@/pages/_app";
import UserPanelLayout from "@/app/components/userPanelLayout";
import React, {useEffect, useState} from "react";
import Category from "@/app/models/category";
import callApi from "@/app/helpers/callApi";
import Cookies from "universal-cookie";
import CreateCategory from "@/app/components/panel/categories/create";
import Fail from "@/app/components/toasts/fail";
import Success from "@/app/components/toasts/success";
import NoData from "@/app/components/shared/noData";
import CategoryTable from "@/app/components/panel/categories/table";

const Categories: NextPageWithLayout = () => {
    const cookie = new Cookies;
    const token = cookie.get('verifyToken');
    const [showModal, setShowModal] = useState(false);
    const [categories, setCategories] = useState<Category[]>([])
    const [filteredCategories, setFilteredCategories] = useState<Category[]>([])
    const getCategories = async () => {
        try {
            const res = await callApi().get('article-category', {
                headers: {
                    Authorization: 'Bearer ' + token,
                }
            });
            if (res.status === 200) {
                setCategories(res.data.data.data);
                setFilteredCategories(res.data.data.data);
            }
        } catch (error: any) {
            Fail(error.message)
        }
    }
    useEffect(() => {
        getCategories()
    }, [categories])
    const searchHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
        const newCategories = categories.filter(function (category) {
            // @ts-ignore
            return category.title.includes(e.target.value)
        })
        setFilteredCategories(newCategories)
    }
    const showModalHandler = () => {
        setShowModal(true);
    }
    const hideModalHandler = () => {
        setShowModal(false);
    }
    const handleSetNewCategory = (data: Category) => {
        const newCategories = {
            ...categories, data
        }
        setCategories(newCategories);
    };
    const deleteCategory = async (targetContact: any) => {
        const id = targetContact.target.id;
        try {
            const res = await callApi().delete('article-category/' + id, {
                headers: {
                    Authorization: 'Bearer ' + token,
                }
            })
            if (res.status == 200) {
                const newCategoryList = categories.filter(function (category) {
                    return category.id != id;
                })
                setCategories(newCategoryList)
                Success('Category deleted successfully')
            }
        } catch (error: any) {
            Fail(error.message)
        }
    }

    return (
        <div>
            <div className="flex flex-col sm:flex-row justify-between items-center">
                <h1 className="text-4xl">
                    Article Categories
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
                               placeholder="Search Categories" required/>
                        <button type="submit"
                                className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            Search
                        </button>
                    </div>
                </div>
                <button type="button" onClick={showModalHandler}
                        className="mt-3 sm:mt-0 rounded bg-none border-2 border-blue-500 p-2 text-blue-500 hover:bg-blue-500 hover:text-gray-100 hover:dark:text-gray-900">
                    Create New Category
                </button>
            </div>
            {
                filteredCategories.length > 0
                    ? <CategoryTable categories={filteredCategories} deleteCategory={deleteCategory}/>
                    : <NoData/>
            }
            <CreateCategory showModal={showModal} hideModal={hideModalHandler} setNewCategory={handleSetNewCategory}/>
        </div>
    )
}

Categories.getLayout = (page) => <UserPanelLayout>{page}</UserPanelLayout>

export default Categories