'use client'

/* icons */
import { IoReload } from "react-icons/io5"
import { IoIosAddCircle } from "react-icons/io"

/* components */
import Spinner from "@/ui/components/loading/Spinner"
import Table from "@/ui/components/table/Table"
import Dialog from "@/ui/components/dialog/Dialog"
import SearchAdmin from "@/ui/components/search/searchAdmin"

/* forms */
import { UserForm } from "@/ui/components/forms/createNewUserForm"

/* actions */
import { 
    User 
} from "@prisma/client"

import { getAllUser } from "@/lib/actions/user"

/* react */
import React, {
    useEffect,
    useState
} from 'react'

export default function Page () {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const reloadData = async () => {
        const fetchedUsers = await getAllUser();
        setUsers(fetchedUsers);
        setLoading(false);
    }

    useEffect(() => {
        const fetchUsers = async () => {
            const fetchedUsers = await getAllUser();
            setUsers(fetchedUsers);
            setLoading(false);
        };

        fetchUsers();

    }, []);

    if (loading) return <Spinner />

    const column = ["id", "name", "email", "password"]

    const openDialog = () => setIsDialogOpen(true)

    return (
        <>
            <Dialog 
                isOpen={isDialogOpen} 
                isSetOpen={setIsDialogOpen} 
                title="Create New User" 
            >
                <UserForm />
            </Dialog>

            <div className="flex flex-col gap-2">
                <main className="flex flex-row gap-2 justify-between">
                    <SearchAdmin />
                    <div className="flex items-center">
                        <button
                            className="p-2 hover:bg-gray-200 rounded-md"
                            onClick={reloadData}
                        >
                            <IoReload />
                        </button>
                        <button
                            className="p-2 hover:bg-gray-200 rounded-md"
                            onClick={openDialog}
                        >
                            <IoIosAddCircle />
                        </button>
                    </div>
                </main>
                <footer className="flex-1">
                    {users.length === 0 ? (
                        <p>No users found.</p>
                    ) : (
                        <Table
                            columns={column}
                            onEdit={() => { }}
                            data={users}
                        />
                    )}
                </footer>
            </div>
        </>
    );
}