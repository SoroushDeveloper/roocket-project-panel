import Category from "@/app/models/category";
import CategoryItem from "@/app/components/panel/categories/item";
import React from "react";

export default function CategoryTable({categories, deleteCategory}: {
    categories: Category[],
    deleteCategory: any
}) {
    return (
        <>
            <div className="relative overflow-x-auto shadow-md rounded-lg mt-5 dark:border-2 dark:border-gray-700">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead
                        className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            ID
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Title
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Operations
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {categories.map((category: Category, key) => (
                        <CategoryItem key={key} category={category} deleteHandler={deleteCategory}/>
                    ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}