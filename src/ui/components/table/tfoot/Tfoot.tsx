import { Category, Food, User } from "@prisma/client"
import Pagination from "../Pagination"

export default function Tfoot({
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