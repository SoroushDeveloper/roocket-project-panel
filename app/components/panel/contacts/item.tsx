import Contact from "@/app/models/contact";
import moment from "moment/moment";

import {
    InformationCircleIcon,
    TrashIcon,
} from "@heroicons/react/24/outline";
import React, {useState} from "react";
import callApi from "@/app/helpers/callApi";
import Cookies from "universal-cookie";

export default function ContactItem({showModal, contact, deleteHandler}: { showModal: any, contact: Contact, deleteHandler: any }) {
    const cookie = new Cookies;
    const createdAt = moment(contact.created_at).format('MMMM Do YYYY, h:mm:ss A');
    const [reviewStatus, setReviewStatus] = useState(contact.is_reviewed)
    const changeReviewHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const status = e.target.checked;
        try {
            const res = await callApi().patch('/contact/' + contact.id + '/status', {}, {
                headers: {
                    Authorization: 'Bearer ' + cookie.get('verifyToken'),
                }
            })
            if (res.status == 200)
                setReviewStatus(status)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
            <th scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {contact.id}
            </th>
            <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {contact.name}
            </th>
            <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {contact.email}
            </th>
            <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {createdAt}
            </th>
            <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                <label className="inline-flex items-center cursor-pointer">
                    <input type="checkbox" value="" className="sr-only peer" checked={reviewStatus}
                           onChange={(e) => changeReviewHandler(e)}/>
                    <div
                        className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                </label>
                {/*{*/}
                {/*    contact.is_reviewed*/}
                {/*        ? <CheckIcon className="flex-shrink-0 h-6 w-6 text-green-500"/>*/}
                {/*        : <XMarkIcon className="flex-shrink-0 h-6 w-6 text-red-500"/>*/}
                {/*}*/}
            </th>
            <th className="px-6 py-4">
                <div className="flex justify-start items-stretch sm:items-center">
                    <button type="button" onClick={() => showModal(contact.id)}
                            className="rounded flex items-center bg-none border-2 border-cyan-500 p-2 text-cyan-500 hover:bg-cyan-500 hover:text-gray-100 hover:dark:text-gray-900">
                        <InformationCircleIcon className="flex-shrink-0 h-5 w-5"/>
                        <span className="hidden sm:block sm:ml-1">
                            Details
                        </span>
                    </button>
                    <button type="button" onClick={deleteHandler} id={contact.id.toString()}
                            className="ml-2 sm:ml-5 rounded flex items-center bg-none border-2 border-red-500 p-2 text-red-500 hover:bg-red-500 hover:text-gray-100 hover:dark:text-gray-900">
                        <TrashIcon className="flex-shrink-0 h-5 w-5"/>
                        <span className="hidden sm:block sm:ml-1">
                            Delete
                        </span>
                    </button>
                </div>
            </th>
        </tr>
    )
}