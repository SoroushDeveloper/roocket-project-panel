import React, {Dispatch, useState} from "react";
import callApi from "@/app/helpers/callApi";
import Cookies from "universal-cookie";
import Fail from "@/app/components/toasts/fail";
import Success from "@/app/components/toasts/success";
import Warning from "@/app/components/toasts/warning";
import Category from "@/app/models/category";

export default function CreateCategory({showModal, hideModal, setNewCategory}: {
    setNewCategory: Dispatch<Category>,
    showModal: boolean,
    hideModal: any,
}) {
    const cookie = new Cookies;
    const [title, setTitle] = useState('');
    const inputHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            saveHandler();
        } else {
            // @ts-ignore
            setTitle(event.target.value);
        }
    }
    const saveHandler = async () => {
        if (title !== "") {
            let data = {
                title: title,
            }
            try {
                const res = await callApi().post('article-category', data, {
                    headers: {
                        Authorization: 'Bearer ' + cookie.get('verifyToken'),
                    }
                })
                if (res.status == 200) {
                    setNewCategory({title: title, id: 0});
                    Success('New Category Saved');
                    hideModal();
                }
            } catch (error: any) {
                Fail(error)
            }
        } else {
            Warning('Title is required');
        }
    }
    return (
        <>
            {showModal ? (
                <>
                    <div
                        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none shadow-2xl">
                        <div className="relative w-auto my-6 mx-auto max-w-3xl">
                            <div
                                className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-gray-100 dark:bg-gray-900 outline-none focus:outline-none">
                                <div
                                    className="flex items-start justify-between p-5 border-b border-solid border-gray-400 dark:border-gray-600 rounded-t">
                                    <h3 className="text-3xl font-semibold text-gray-900 dark:text-gray-100">
                                        New Category
                                    </h3>
                                </div>
                                <div className="relative p-6 flex-auto w-96">
                                    <input type="text" id="title" onKeyUp={(e) => inputHandler(e)}
                                           className="bg-gray-200 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                           placeholder="Category Title" required/>
                                </div>
                                <div
                                    className="flex items-center justify-end p-4 border-t border-solid border-gray-400 dark:border-gray-600 rounded-b">
                                    <div className="flex space-x-2">
                                        <button type="button" onClick={hideModal}
                                                className="flex items-center border-red-500 border hover:bg-red-500 hover:text-white dark:hover:text-black text-red-500 font-bold py-2 px-4 rounded dark:text-red-500">
                                            Cancel
                                        </button>
                                        <button type="button" onClick={saveHandler}
                                                className="flex items-center border-green-500 border hover:bg-green-500 hover:text-white dark:hover:text-black text-green-500 font-bold py-2 px-4 rounded dark:text-green-500">
                                            Save
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            ) : null}
        </>
    )
}