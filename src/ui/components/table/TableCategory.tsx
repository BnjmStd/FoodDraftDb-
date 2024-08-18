'use client'

import { AdminContext } from "@/lib/context/admin"
import { Category } from "@prisma/client"
import { use, useState } from "react"
import Thead from "./thead/Thead"
import Tfoot from "./tfoot/Tfoot"
import TbodyCategory from "./tbody/TbodyCategory"

export default function TableFood({
    data,
    column
}: {
    data: Category[]
    column: string[]
}) {

    const {
        loading,
    } = use(AdminContext)

    const [currentPage, setCurrentPage] = useState(1)
    const [postsPerPage] = useState(5)

    const lastPostIndex = currentPage * postsPerPage // se multiplica la pagina actual por los post por pagina
    const firstPostIndex = lastPostIndex - postsPerPage
    const currentPosts = data.slice(firstPostIndex, lastPostIndex)

    return (
        <table className="w-full border-collapse bg-neutral-400 p-1 ">

            <caption className="text-black text-xl text-center 
            font-bold uppercase p-2">
                Categorys
            </caption>

            <Thead column={column} />

            {loading ? (
                <tbody>
                    <tr>
                        <td colSpan={column.length} className="text-center">Cargando ...</td>
                    </tr>
                </tbody>
            ) : (
                <TbodyCategory data={currentPosts} />
            )}

            <Tfoot
                column={column}
                data={data}
                postsPerPage={postsPerPage}
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
            />

        </table>
    )
}