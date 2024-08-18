import { 
    deleteUserById, 
    searchById 
} from "@/lib/actions/user";

import { use } from "react";
import { 
    FaEdit, 
    FaTrashAlt 
} from "react-icons/fa";

import { AdminContext } from "@/lib/context/admin";
import { ErrorContext } from "@/lib/context/error";

export default function ActionsUser({
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