'use client'

/* icons */
import { IoReload } from "react-icons/io5"
import { IoIosAddCircle } from "react-icons/io"

/* components */
import Spinner from "@/ui/components/loading/Spinner"
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
    useState,
    useEffect
} from 'react'

import { Pagination } from "./Pagination"
import UsersList from "./UsersList"

export default function Page() {

    const [coinsData, setCoinsData] = useState<User[]>([])
    const [currentPage, setCurrentPage] = useState(1)
    const [postsPerPage] = useState(5)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getAllUser()

                if (response.error) return

                if (response.ok) {
                    setCoinsData(response.data);
                }


            } catch (error) {
                console.error('Error al obtener los datos:', error);
            }
        };
        fetchData();
    }, []);

    const lastPostIndex = currentPage * postsPerPage // se multiplica la pagina actual por los post por pagina
    const firstPostIndex = lastPostIndex - postsPerPage // 
    const currentPosts = coinsData.slice(firstPostIndex, lastPostIndex)

    const column = ["id", "email", "Actions"]

    return (
        <div className="w-full">
            <main className="flex gap-2 justify-between p-1">
                <SearchAdmin />
                <div className="flex items-center">
                    <button
                        className="p-2 hover:bg-gray-200 rounded-md"
                        onClick={() => {}}
                    >
                        <IoReload />
                    </button>
                    <button
                        className="p-2 hover:bg-gray-200 rounded-md"
                        onClick={() => {}}
                    >
                        <IoIosAddCircle />
                    </button>
                </div>
            </main>
            <div className="overflow-x-scroll pt-1 ">
                <table className="w-full border-collapse bg-neutral-400 p-1 ">

                    <caption className="text-black text-xl text-center 
                        font-bold uppercase p-2">
                        Usuarios
                    </caption>

                    <thead className="capitalize bg-neutral-800 text-neutral-300 ">
                        <tr className="">
                            {column.map((x) => {
                                return (
                                    <th className="px-6 py-4 ">{x}</th>
                                )
                            })}
                        </tr>
                    </thead>

                    <UsersList data={currentPosts} />
                    <tfoot>
                        <tr>
                            <td colSpan={column.length}>
                                <Pagination
                                    totalPosts={coinsData.length}
                                    postsPerPage={postsPerPage}
                                    setCurrentPage={setCurrentPage}
                                    currentPage={currentPage}
                                />
                            </td>
                        </tr>
                    </tfoot>

                </table>
            </div>
        </div>
    )
}
