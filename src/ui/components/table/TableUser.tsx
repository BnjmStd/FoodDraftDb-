'use client'

import { AdminContext } from "@/lib/context/admin"
import { User } from "@prisma/client"
import { use, useState } from "react"
import TbodyUser from "./tbody/TbodyUser"
import Thead from "./thead/Thead"
import Tfoot from "./tfoot/Tfoot"

export default function TableUser({
    userData,
    column
}: {
    userData: User[]
    column: string[]
}) {

    const {
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