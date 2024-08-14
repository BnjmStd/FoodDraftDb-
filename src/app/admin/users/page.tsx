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
    useState,
    use,
    Suspense,
    useEffect
} from 'react'
import { Pagination } from "./Pagination"
import UsersList from "./UsersList"

export default function Page() {

    const [coinsData, setCoinsData] = useState<User[]>([]) // use state para almacenar los datos
    const [currentPage, setCurrentPage] = useState(1) // pagina actual
    const [postsPerPage, setPostsPerPage] = useState(5) // cuantos datos por pagina

    useEffect(() => {
        // Definir la función asíncrona dentro del useEffect
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

    return (
        <div>
            <h1 className="text-2xl">Usuarios</h1>
            <UsersList coinsData={currentPosts} />
            <Pagination
                totalPosts={coinsData.length}
                postsPerPage={postsPerPage}
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
            />
        </div>
    )
}
