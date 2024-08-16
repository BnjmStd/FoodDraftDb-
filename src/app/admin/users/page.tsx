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

import { deleteUserById, getAllUser } from "@/lib/actions/user"

/* react */
import React, {
    useState,
    useEffect,
    useOptimistic,
    use,
} from 'react'

import { Pagination } from "./Pagination"
import { FaEdit, FaTrashAlt } from "react-icons/fa"
import { ErrorContext } from "@/lib/context/error"

export default function Page() {

    const [coinsData, setCoinsData] = useState<User[]>([])
    const [loading, setIsLoading] = useState<boolean>(true)
    const [filtering, setFiltering] = useState<string>()

    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

    const filteredData = filtering
        ? coinsData.filter(user =>
            user.email.toLowerCase().includes(filtering.toLowerCase()) ||
            user.id.toString().includes(filtering) ||
            user.type.toLowerCase().includes(filtering.toLowerCase())
        )
        : coinsData;

    const column = ["id", "email", "type", "Actions"]

    const openDialog = () => setIsDialogOpen(true)

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
                isOpen={isDialogOpen} 
                isSetOpen={setIsDialogOpen} 
                title="Create New Users" 
            >
                <UserForm />
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
                            onClick={openDialog}
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
    setCoinsData
}: {
    coinsData: User[] | Food[] | Category[]
    loading: boolean
    column: string[]
    setCoinsData: React.Dispatch<React.SetStateAction<User[]>>
}) {
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

            <Thead column={column}/>

            {loading ? (
                <tbody>
                    <tr>
                        <td colSpan={column.length} className="text-center">Cargando ...</td>
                    </tr>
                </tbody>
            ) : (
                <Tbody column={column} data={currentPosts} setCoinsData={setCoinsData}/>
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

export function Tbody({
    column,
    data,
    setCoinsData
}: {
    column: string[]
    data: User[] | Food[] | Category[]
    setCoinsData: React.Dispatch<React.SetStateAction<User[]>>
}) {
    return (
        <tbody>
            {data.map((date) => (
                <tr className="par hover:bg-yellow-100 cursor-pointer" key={date.id}>
                    <td className="px-6 py-4  text-center whitespace-nowrap text-sm ">{`# ${date.id}`}</td>
                    <td className="px-6 py-4  text-center whitespace-nowrap text-sm ">{date.email}</td>
                    <td className="px-6 py-4  text-center whitespace-nowrap text-sm ">{date.type}</td>
                    <Actions id={date.id} setCoinsData={setCoinsData}/>
                </tr>
            ))}
        </tbody>
    )
}

export function Actions({
    id,
    setCoinsData
}: {
    id: number
    setCoinsData: React.Dispatch<React.SetStateAction<User[]>>
}) {

    const { setError } = use(ErrorContext)

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

    return (
        <td className="px-6 py-4  text-center whitespace-nowrap text-sm flex items-center justify-center">
            <button
                onClick={() => { }}
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