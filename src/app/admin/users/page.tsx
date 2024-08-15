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
    Category,
    Food,
    User
} from "@prisma/client"

import { getAllUser } from "@/lib/actions/user"

/* react */
import React, {
    useState,
    useEffect,
    Suspense
} from 'react'

import { Pagination } from "./Pagination"
import { FaEdit, FaTrashAlt } from "react-icons/fa"

export default function Page() {

    const [coinsData, setCoinsData] = useState<User[]>([])

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

    return (
        <div className="w-full border-2 rounded-md">
            <main className="flex gap-2 justify-between p-1">
                <SearchAdmin />
                <div className="flex items-center">
                    <button
                        className="p-2 hover:bg-gray-200 rounded-md"
                        onClick={() => { }}
                    >
                        <IoReload />
                    </button>
                    <button
                        className="p-2 hover:bg-gray-200 rounded-md"
                        onClick={() => { }}
                    >
                        <IoIosAddCircle />
                    </button>
                </div>
            </main>
            <div className="overflow-x-auto p-1 ">
                <Table coinsData={coinsData} />
            </div>
        </div>
    )
}

export function Table({ coinsData }: {
    coinsData: User[] | Food[] | Category[]
}) {
    const column = ["id", "email", "Actions"]

    const [currentPage, setCurrentPage] = useState(1)
    const [postsPerPage] = useState(5)

    const lastPostIndex = currentPage * postsPerPage // se multiplica la pagina actual por los post por pagina
    const firstPostIndex = lastPostIndex - postsPerPage // 
    const currentPosts = coinsData.slice(firstPostIndex, lastPostIndex)

    return (
        <table className="w-full border-collapse bg-neutral-400 p-1 ">

            <caption className="text-black text-xl text-center 
            font-bold uppercase p-2">
                Usuarios
            </caption>

            <Thead column={column} />

            <Tbody
                column={column}
                data={currentPosts}
            />

            <Tfoot
                column={column}
                data={coinsData}
                postsPerPage={postsPerPage}
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
            />

        </table>
    )
}

export function Thead({ column }: { column: String[] }) {
    return (
        <thead className="capitalize bg-neutral-800 text-neutral-300 ">
            <tr className="">
                {column.map((x) => {
                    return (
                        <th className="px-6 py-4 ">{x}</th>
                    )
                })}
            </tr>
        </thead>
    )
}

export function Tbody({
    column,
    data
}: {
    column: string[]
    data: User[] | Food[] | Category[]
}) {
    /* column =  ["id", "email", "Actions"] */
    return (
        
        <tbody>
            {data.map((date) => (
                <tr className="par hover:bg-yellow-100 cursor-pointer" key={date.id}>
                    <td className="px-6 py-4  text-center whitespace-nowrap text-sm ">{date.id}</td>
                    <td className="px-6 py-4  text-left whitespace-nowrap text-sm ">{date.email}</td>
                    <Actions />
                </tr>
            ))}
        </tbody>
    )
}

export function Actions() {
    return (
        <td className="px-6 py-4  text-center whitespace-nowrap text-sm flex items-center justify-center">
            <button
                onClick={() => { }}
                className="text-blue-600 hover:text-blue-900 mr-2 p-2 hover:bg-gray-200 rounded-md"
            >
                <FaEdit />
            </button>
            <button
                onClick={() => { }}
                className="text-red-600 hover:text-red-900 p-2 hover:bg-gray-200 rounded-md"
            >
                <FaTrashAlt />
            </button>
        </td>
    )
}
export function Tfoot({
    column,
    data,
    postsPerPage,
    setCurrentPage,
    currentPage
}: {
    column: String[]
    data: User[] | Food[] | Category[]
    postsPerPage: number
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>
    currentPage: number
}) {

    const totalPost = data.length
    console.log(totalPost)
    console.log(currentPage)

    return (
        <tfoot>
            <tr>
                <td colSpan={column.length}>
                    <Pagination
                        totalPosts={totalPost}
                        postsPerPage={postsPerPage}
                        setCurrentPage={setCurrentPage}
                        currentPage={currentPage}
                    />
                </td>
            </tr>
        </tfoot>
    )
}