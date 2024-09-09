import {NextPageWithLayout} from "@/pages/_app";
import UserPanelLayout from "@/app/components/userPanelLayout";
import React, {useEffect, useState} from "react";
import callApi from "@/app/helpers/callApi";
import Cookies from "universal-cookie";
import Contact from "@/app/models/contact";
import NoData from "@/app/components/shared/noData";
import ContactTable from "@/app/components/panel/contacts/table";
import Pagination from "@/app/components/shared/pagination";
import ShowContact from "@/app/components/panel/contacts/show";

const Contacts: NextPageWithLayout = () => {
    const cookie = new Cookies;
    const token = cookie.get('verifyToken');
    const [status, setStatus] = useState('');
    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [showModal, setShowModal] = useState(false);
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [contactId, setContactId] = useState<undefined | number>(undefined);
    const getContacts = async () => {
        try {
            const res = await callApi().get(`/contact${status != '' ? `?is_reviewed=${status}` : ''}`, {
                headers: {
                    Authorization: 'Bearer ' + token,
                }
            });
            if (res.status === 200) {
                setContacts(res.data.data.data);
                setTotalPages(res.data.data.last_page);
                setCurrentPage(res.data.data.current_page);
            }
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getContacts()
    }, [status, currentPage])
    const deleteReview = async (targetContact: any) => {
        const id = targetContact.target.id;
        try {
            const res = await callApi().delete('/contact/' + id, {
                headers: {
                    Authorization: 'Bearer ' + token,
                }
            })
            if (res.status == 200) {
                const newContactList = contacts.filter(function (contact) {
                    return contact.id != id;
                })
                setContacts(newContactList)
            }
        } catch (error) {
            console.log(error)
        }
    }
    const showModalHandler = (id: number) => {
        setContactId(id);
        setTimeout(function () {
            setShowModal(true);
        }, 500)
    }
    const hideModalHandler = () => {
        setShowModal(false);
    }
    return (
        <div>
            <div className="flex flex-col sm:flex-row justify-between items-center">
                <h1 className="text-4xl">
                    Contacts
                </h1>
                <ul className="flex mt-2 sm:mt-0 items-center text-sm font-medium text-gray-900 bg-white rounded-lg sm:flex dark:bg-gray-700 dark:text-white">
                    <li className="w-full border-gray-200 border-r dark:border-gray-600 pr-3">
                        <div className="flex items-center ps-3">
                            <input id="horizontal-list-radio-license" type="radio" value="all" name="status" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                                   onChange={(e) => setStatus('')} checked={status == ''}/>
                            <label htmlFor="horizontal-list-radio-license" className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                All
                            </label>
                        </div>
                    </li>
                    <li className="w-full border-gray-200 border-r dark:border-gray-600 pr-3">
                        <div className="flex items-center ps-3">
                            <input id="horizontal-list-radio-id" type="radio" value="pending" name="status" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                                   onChange={(e) => setStatus('0')} checked={status == '0'}/>
                            <label htmlFor="horizontal-list-radio-id" className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                Pending
                            </label>
                        </div>
                    </li>
                    <li className="w-full border-gray-200 dark:border-gray-600 pr-3">
                        <div className="flex items-center ps-3">
                            <input id="horizontal-list-radio-military" type="radio" value="reviewed" name="status" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                                   onChange={(e) => setStatus('1')} checked={status == '1'}/>
                            <label htmlFor="horizontal-list-radio-military" className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                Reviewed
                            </label>
                        </div>
                    </li>
                </ul>
            </div>
            {
                contacts.length > 0
                    ? <ContactTable contacts={contacts} deleteReview={deleteReview} showModal={showModalHandler}/>
                    : <NoData/>
            }
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage}/>
            <ShowContact showModal={showModal} hideModal={hideModalHandler} contactId={contactId}/>
        </div>
    )
}

Contacts.getLayout = (page) => <UserPanelLayout>{page}</UserPanelLayout>

export default Contacts