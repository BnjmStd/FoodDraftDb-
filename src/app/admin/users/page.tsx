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

import { deleteUserById, editUser, getAllUser, searchById } from "@/lib/actions/user"

/* react */
import React, {
    useState,
    useEffect,
    use,
} from 'react'

import { Pagination } from "./Pagination"
import { FaEdit, FaTrashAlt } from "react-icons/fa"
import { ErrorContext } from "@/lib/context/error"

export default function Page() {

    const [coinsData, setCoinsData] = useState<User[]>([])
    const [loading, setIsLoading] = useState<boolean>(true)
    const [filtering, setFiltering] = useState<string>()
    const [selected, setIsSelected] = useState<User | undefined>()

    const { setIsSetOpen } = use(ErrorContext)
    
    const filteredData = filtering
        ? coinsData.filter(user =>
            user.email.toLowerCase().includes(filtering.toLowerCase()) ||
            user.id.toString().includes(filtering) ||
            user.type.toLowerCase().includes(filtering.toLowerCase())
        )
        : coinsData;

    const column = ["id", "email", "type", "Actions"]

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
            } finally {
                setIsLoading(false)
            }
        };
        fetchData();
    }, []);

    return (
        <>
            <Dialog 
                title="Create New Users" 
            >
                <UserForm User={selected} />
            </Dialog>

            <div className="w-full border-2 rounded-md">
                <main className="flex gap-2 justify-between p-1">
                    <SearchAdmin setFiltering={setFiltering} />
                    <div className="flex items-center">
                        <button
                            className="p-2 hover:bg-gray-200 rounded-md"
                            onClick={() => { }}
                        >
                            <IoReload />
                        </button>
                        <button
                            className="p-2 hover:bg-gray-200 rounded-md"
                            onClick={() => {setIsSetOpen(true)}}
                        >
                            <IoIosAddCircle />
                        </button>
                    </div>
                </main>
                <div className="overflow-x-auto p-1">
                    {filteredData.length === 0 ? (
                        <p>No Users found.</p>
                    ) : (
                        <Table column={column}
                            coinsData={filteredData}
                            loading={loading}
                            setCoinsData={setCoinsData}
                            setIsSelected={setIsSelected}
                        />
                    )}
                </div>
            </div>
        </>
    )
}

export function Table({
    coinsData,
    loading,
    column,
    setCoinsData,
    setIsSelected
}: {
    coinsData: User[] 
    loading: boolean
    column: string[]
    setCoinsData: React.Dispatch<React.SetStateAction<User[]>>
    setIsSelected: React.Dispatch<React.SetStateAction<User | undefined>>
}) {
    const [currentPage, setCurrentPage] = useState(1)
    const [postsPerPage] = useState(5)

    const lastPostIndex = currentPage * postsPerPage // se multiplica la pagina actual por los post por pagina
    const firstPostIndex = lastPostIndex - postsPerPage
    const currentPosts = coinsData.slice(firstPostIndex, lastPostIndex)

    return (
        <table className="w-full border-collapse bg-neutral-400 p-1 ">

            <caption className="text-black text-xl text-center 
            font-bold uppercase p-2">
                Usuarios
            </caption>

            <Thead column={column}/>

            {loading ? (
                <tbody>
                    <tr>
                        <td colSpan={column.length} className="text-center">Cargando ...</td>
                    </tr>
                </tbody>
            ) : (
                <TbodyUser data={currentPosts} setCoinsData={setCoinsData} setIsSelected={setIsSelected}/>
            )}

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
    setCoinsData,
    setIsSelected
}: {
    data: User[] 
    setCoinsData: React.Dispatch<React.SetStateAction<User[]>>
    setIsSelected: React.Dispatch<React.SetStateAction<User | undefined>>
}) {
    return (
        <tbody>
            {data.map((date) => (
                <tr className="par hover:bg-yellow-100 cursor-pointer" key={date.id}>
                    <td className="px-6 py-4  text-center whitespace-nowrap text-sm ">{`# ${date.id}`}</td>
                    <td className="px-6 py-4  text-center whitespace-nowrap text-sm ">{date.email}</td>
                    <td className="px-6 py-4  text-center whitespace-nowrap text-sm ">{date.type}</td>
                    <Actions id={date.id} setCoinsData={setCoinsData} setIsSelected={setIsSelected}/>
                </tr>
            ))}
        </tbody>
    )
}

export function Actions({
    id,
    setCoinsData,
    setIsSelected
}: {
    id: number
    setCoinsData: React.Dispatch<React.SetStateAction<User[]>>
    setIsSelected: React.Dispatch<React.SetStateAction<User | undefined>>
}) {

    const { setError, setIsSetOpen } = use(ErrorContext)

    const handleDelete = async (id : number) => {
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
                setCoinsData(prevData => prevData.filter(user => user.id !== id));
            }
        } catch (error) {
            setError({
                message: 'Ocurrió un error inesperado al eliminar el usuario.',
                type: 'error'
            })
        }
    }

    const handleEdit = async (id : number) => {
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
                <FaEdit className="text-blue-600"/>
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