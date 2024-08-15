import { User } from "@prisma/client"
import { FaEdit, FaTrashAlt } from "react-icons/fa"

const UsersList = ({
    data
}: {
    data: User[]
}) => {
    return (
        <tbody>
            {data.map((user) => (
                <tr className="par hover:bg-yellow-100 cursor-pointer" key={user.id}>
                    <td className="px-6 py-4  text-center whitespace-nowrap text-sm ">{user.id}</td>
                    <td className="px-6 py-4  text-left whitespace-nowrap text-sm ">{user.email}</td>
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
                </tr>
            ))}
        </tbody>
    )
}

export default UsersList