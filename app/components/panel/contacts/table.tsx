import Contact from "@/app/models/contact";
import ContactItem from "@/app/components/panel/contacts/item";
import React from "react";

export default function ContactTable({showModal, contacts, deleteReview}: { showModal: any, contacts: Contact[], deleteReview: any }) {
    return (
        <>
            <div className="relative overflow-x-auto shadow-md rounded-lg mt-5 dark:border-2 dark:border-gray-700">

                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            ID
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Name
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Email
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Submit Date & Time
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Review Status
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Operations
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {contacts.map((contact: Contact) => (
                        <ContactItem key={contact.id} contact={contact} deleteHandler={deleteReview} showModal={showModal}/>
                    ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}