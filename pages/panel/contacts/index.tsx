import {NextPageWithLayout} from "@/pages/_app";
import UserPanelLayout from "@/app/components/userPanelLayout";
import {useEffect, useState} from "react";
import callApi from "@/app/helpers/callApi";
import Cookies from "universal-cookie";
import Contact from "@/app/models/contact";
import ContactItem from "@/app/components/panel/contacts/item";

const states = [
    'All',
    'Pending',
    'Reviewed',
]

const Contacts: NextPageWithLayout = () => {
    const cookie = new Cookies;
    const token = cookie.get('verifyToken');
    const [category, setCategory] = useState('All')
    const [contacts, setContacts] = useState<Contact[]>([])
    const [filteredContacts, setFilteredContacts] = useState<Contact[]>([])
    const getContacts = async () => {
        try {
            const res = await callApi().get('/contact', {
                headers: {
                    Authorization: 'Bearer ' + token,
                }
            });
            if (res.status === 200) {
                setContacts(res.data.data.data);
                setFilteredContacts(res.data.data.data);
            }
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getContacts()
    }, [])
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
    const changeStateHandler = (value: string) => {
        setCategory(value)
        let newContacts = []
        newContacts = contacts.filter(function (contact) {
            return value == 'All' || (value == 'Reviewed' && contact.is_reviewed) || (value == 'Pending' && !contact.is_reviewed);
        })
        setFilteredContacts(newContacts)
    }
    return (
        <div>
            <div className="flex justify-between items-center">
                <h1 className="text-4xl">
                    Contacts
                </h1>
                <select id="categories" name="category"
                        onChange={(e) => changeStateHandler(e.target.value)}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-min p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    {
                        states.map((state, key) =>
                            <option key={key} value={state} selected={state == category}>
                                {state}
                            </option>)
                    }
                </select>
            </div>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-5">
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
                    {filteredContacts.map((contact: Contact, key) => (
                        <ContactItem key={key} contact={contact} deleteHandler={deleteReview}/>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

Contacts.getLayout = (page) => <UserPanelLayout>{page}</UserPanelLayout>

export default Contacts