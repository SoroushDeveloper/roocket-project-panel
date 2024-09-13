import React, {useEffect, useState} from "react";
import callApi from "@/app/helpers/callApi";
import Cookies from "universal-cookie";
import Fail from "@/app/components/toasts/fail";
import Contact from "@/app/models/contact";
import moment from "moment/moment";
import {XCircleIcon} from "@heroicons/react/24/outline";

export default function ShowContact({contactId = undefined, showModal, hideModal}: {
    contactId: number | undefined,
    showModal: boolean,
    hideModal: any,
}) {
    const cookie = new Cookies;
    const [contact, setContact] = useState<undefined | Contact>(undefined);
    const [createdAt, setCreatedAt] = useState('');
    const getContact = async () => {
        try {
            const res = await callApi().get('contact/' + contactId, {
                headers: {
                    Authorization: 'Bearer ' + cookie.get('verifyToken'),
                }
            });
            if (res.status === 200) {
                setContact(res.data.data);
            }
        } catch (error: any) {
            Fail(error.message)
        }
    }
    useEffect(() => {
        if (contactId != undefined) {
            getContact();
            setCreatedAt(moment(contact?.created_at).format('MMMM Do YYYY, h:mm:ss A'))
        }
    }, [contactId])
    return (
        <>
            {showModal ? (
                contact != undefined ? (
                    <>
                        <div
                            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none shadow-2xl">
                            <div className="relative w-auto my-6 mx-auto max-w-3xl">
                                <div
                                    className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-gray-100 dark:bg-gray-900 outline-none focus:outline-none">
                                    <div
                                        className="flex items-start justify-between p-5 border-b border-solid border-gray-400 dark:border-gray-600 rounded-t">
                                        <h3 className="text-3xl font-semibold text-gray-900 dark:text-gray-100">
                                            Contact {contact.id}
                                        </h3>
                                    </div>
                                    <div className="relative p-6 flex-auto w-96">
                                        <p>
                                            Name : {contact.name}
                                        </p>
                                        <p>
                                            Email : {contact.email}
                                        </p>
                                        <p>
                                            Message : {contact.content}
                                        </p>
                                        <p>
                                            Status : {contact.is_reviewed ? 'Reviewed' : 'Not Reviewed'}
                                        </p>
                                        <p className="mt-5 rounded-3xl text-center bg-gray-800 p-2">
                                            {createdAt}
                                        </p>
                                    </div>
                                    <div className="flex items-center justify-end p-4 border-t border-solid border-gray-400 dark:border-gray-600 rounded-b">
                                        <button type="button" onClick={hideModal}
                                                className="flex items-center border-gray-500 border hover:bg-gray-500 hover:text-white dark:hover:text-black text-gray-500 font-bold py-2 px-4 rounded dark:text-gray-500">
                                                    <XCircleIcon className="flex-shrink-0 h-5 w-5"/>
                                                    <span className="hidden sm:block sm:ml-1">
                                                        Close
                                                    </span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                    </>
                ) : Fail('Couldn\'t get contact info')
            ) : null}
        </>
    )
}