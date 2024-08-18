'use client'

/* icons */
import { IoReload } from "react-icons/io5"
import { IoIosAddCircle } from "react-icons/io"

/* components */
import Dialog from "@/ui/components/dialog/Dialog"
import SearchAdmin from "@/ui/components/input/search/searchAdmin"
import TableUser from "@/ui/components/table/TableUser"
import Spinner from "@/ui/components/loading/Spinner"

/* forms */
import { UserForm } from "@/ui/components/forms/createNewUserForm"

import {
    getAllUser,
} from "@/lib/actions/user"

/* react */
import React, {
    useState,
    useEffect,
    use,
} from 'react'

/* contexts */
import { ErrorContext } from "@/lib/context/error"
import { AdminContext } from "@/lib/context/admin"

export default function Page() {

    const [filtering, setFiltering] = useState<string>()

    const {
        userData,
        setUserData,
        loading,
        setIsLoading
    } = use(AdminContext)

    const {
        setIsSetOpen,
        setError,
    } = use(ErrorContext)

    const filteredData = filtering
        ? userData.filter(user =>
            user.email.toLowerCase().includes(filtering.toLowerCase()) ||
            user.id.toString().includes(filtering) ||
            user.type.toLowerCase().includes(filtering.toLowerCase())
        )
        : userData;

    const column = ["id", "email", "type", "Actions"]

    const reloadData = async () => {
        try {
            const response = await getAllUser()

            if (response.error) {
                setError({
                    type: 'error',
                    message: response.message
                })
            }

            if (response.ok) {
                setUserData(response.data);
                setError({
                    type: 'info',
                    message: 'Users ok'
                })
            }
        } catch (error) {
            setError({
                type: 'error',
                message: 'Algo salío mal'
            })
        } finally {
            setIsLoading(false)
        }
    };

    useEffect(() => {
        reloadData()
    }, []);

    if (loading) return <Spinner />

    return (
        <>
            <Dialog
                title="Create New Users"
            >
                <UserForm />
            </Dialog>

            <div className="w-full border-2 rounded-md space-y-2">
                <UserStats />
                <main className="flex gap-2 justify-between p-1">
                    <SearchAdmin setFiltering={setFiltering} />
                    <div className="flex items-center">
                        <button
                            className="p-2 hover:bg-gray-200 rounded-md"
                            onClick={reloadData}
                        >
                            <IoReload />
                        </button>
                        <button
                            className="p-2 hover:bg-gray-200 rounded-md"
                            onClick={() => { setIsSetOpen(true) }}
                        >
                            <IoIosAddCircle />
                        </button>
                    </div>
                </main>
                <div className="overflow-x-auto p-1">
                    {filteredData.length === 0 ? (
                        <p>No Users found.</p>
                    ) : (
                        <TableUser column={column} userData={filteredData}/>
                    )}
                </div>
            </div>
        </>
    )
}

export function UserStats() {

    const { userData } = use(AdminContext)

    const newRegistrations = userData.filter(user => {
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

        return new Date(user.createdAt) >= oneWeekAgo;
    })

    return (
        <div className="grid sm:grid-cols-3 w-full gap-6 content-center grid-cols-1">
            <div className="bg-neutral-300 h-[150px] rounded-md flex flex-col gap-2 items-center justify-center shadow-md">
                <h1 className="text-center text-3xl font-semibold"></h1>
                <p className="text-center text-3xl font-semibold">Total User: {userData.length} </p>
            </div>
            <div className="bg-neutral-300 h-[150px] rounded-md flex items-center justify-center shadow-md">
                <p className="text-center text-3xl font-semibold">New Registrations: {newRegistrations.length} </p>
            </div>
            <div className="bg-neutral-300 h-[150px] rounded-md flex items-center justify-center shadow-md">
                <p className="text-center text-3xl font-semibold">Premium Users: 0</p>
            </div>
        </div>
    )
}