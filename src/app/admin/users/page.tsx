'use client'

/* icons */
import { IoReload } from "react-icons/io5"
import { IoIosAddCircle } from "react-icons/io"
import { FaEdit, FaTrashAlt } from "react-icons/fa"

/* components */
import Spinner from "@/ui/components/loading/Spinner"
import Dialog from "@/ui/components/dialog/Dialog"
import SearchAdmin from "@/ui/components/search/searchAdmin"
import { Pagination } from "./Pagination"

/* forms */
import { UserForm } from "@/ui/components/forms/createNewUserForm"

/* actions */
import {
    Category,
    Food,
    User
} from "@prisma/client"

import {
    deleteUserById,
    getAllUser,
    searchById
} from "@/lib/actions/user"

/* react */
import React, {
    useState,
    useEffect,
    use,
    Suspense,
} from 'react'

/* contexts */
import { ErrorContext } from "@/lib/context/error"
import { AdminContext } from "@/lib/context/admin"

export default function Page() {

    const [filtering, setFiltering] = useState<string>()

    const {
        userData,
        setUserData,
        setIsLoading,
    } = use(AdminContext)

    const {
        setIsSetOpen,
        setError
    } = use(ErrorContext)

    const filteredData = filtering
        ? userData.filter(user =>
            user.email.toLowerCase().includes(filtering.toLowerCase()) ||
            user.id.toString().includes(filtering) ||
            user.type.toLowerCase().includes(filtering.toLowerCase())
        )
        : userData;

    console.log(filteredData)

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

    const newRegistrations = userData.filter(user => {
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

        return new Date(user.createdAt) >= oneWeekAgo;
    })

    return (
        <>
            <Dialog
                title="Create New Users"
            >
                <UserForm />
            </Dialog>

            <div className="w-full border-2 rounded-md space-y-2">


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
                        <TableUser column={column} />
                    )}
                </div>
            </div>
        </>
    )
}

export function TableUser({
    column
}: {
    column: string[]
}) {

    const {
        userData,
        loading,
    } = use(AdminContext)

    const [currentPage, setCurrentPage] = useState(1)
    const [postsPerPage] = useState(5)

    const lastPostIndex = currentPage * postsPerPage // se multiplica la pagina actual por los post por pagina
    const firstPostIndex = lastPostIndex - postsPerPage
    const currentPosts = userData.slice(firstPostIndex, lastPostIndex)

    return (
        <table className="w-full border-collapse bg-neutral-400 p-1 ">

            <caption className="text-black text-xl text-center 
            font-bold uppercase p-2">
                Usuarios
            </caption>

            <Thead column={column} />

            {loading ? (
                <tbody>
                    <tr>
                        <td colSpan={column.length} className="text-center">Cargando ...</td>
                    </tr>
                </tbody>
            ) : (
                <TbodyUser data={currentPosts} />
            )}

            <Tfoot
                column={column}
                data={userData}
                postsPerPage={postsPerPage}
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
            />

        </table>
    )
}

export function Thead({
    column
}: {
    column: String[]
}) {
    return (
        <thead className="capitalize bg-neutral-800 text-neutral-300 ">
            <tr>
                {column.map((x, index) => (
                    <th key={index} className="px-6 py-4">{x}</th>
                ))}
            </tr>
        </thead>
    )
}

export function TbodyUser({
    data,
}: {
    data: User[]
}) {

    return (
        <tbody>
            {data.map((date) => (
                <tr className="par hover:bg-yellow-100 cursor-pointer" key={date.id}>
                    <td className="px-6 py-4  text-center whitespace-nowrap text-sm ">{`# ${date.id}`}</td>
                    <td className="px-6 py-4  text-center whitespace-nowrap text-sm ">{date.email}</td>
                    <td className="px-6 py-4  text-center whitespace-nowrap text-sm ">{date.type}</td>
                    <Actions id={date.id} />
                </tr>
            ))}
        </tbody>
    )
}

export function Actions({
    id,
}: {
    id: number
}) {

    const {
        setUserData,
        setIsSelected
    } = use(AdminContext)

    const { setError, setIsSetOpen } = use(ErrorContext)

    const handleDelete = async (id: number) => {
        try {
            const response = await deleteUserById(id);

            if (response.error) {
                setError({
                    message: response.message,
                    type: 'error'
                })
            } else {
                setError({
                    message: 'Usuario eliminado',
                    type: 'info'
                })
                setUserData(prevData => prevData.filter(user => user.id !== id));
            }
        } catch (error) {
            setError({
                message: 'Ocurrió un error inesperado al eliminar el usuario.',
                type: 'error'
            })
        }
    }

    const handleEdit = async (id: number) => {
        const user = await searchById(id)

        if (user.error) {
            setError({
                message: user.message,
                type: 'error'
            })
        }

        if (user.ok) {
            setIsSelected(user.data)
            setIsSetOpen(true)
        }
    }

    return (
        <td className="px-6 py-4  text-center whitespace-nowrap text-sm flex items-center justify-center">
            <button
                onClick={() => handleEdit(id)}
                className="text-blue-600 hover:text-blue-900 mr-2 p-2 hover:bg-neutral-400 rounded-md"
            >
                <FaEdit className="text-blue-600" />
            </button>
            <button
                onClick={() => handleDelete(id)}
                className="text-red-600 hover:text-red-900 p-2 hover:bg-neutral-400 rounded-md"
            >
                <FaTrashAlt className="text-red-600" />
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
    return (
        <tfoot>
            <tr>
                <td colSpan={column.length}>
                    <Pagination
                        totalPosts={data.length}
                        postsPerPage={postsPerPage}
                        setCurrentPage={setCurrentPage}
                        currentPage={currentPage}
                    />
                </td>
            </tr>
        </tfoot>
    )
}