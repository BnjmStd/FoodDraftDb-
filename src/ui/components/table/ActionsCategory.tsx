import { deleteCategory } from "@/lib/actions/category";
import { AdminContext } from "@/lib/context/admin";
import { ErrorContext } from "@/lib/context/error";
import { use } from "react";
import { 
    FaTrashAlt 
} from "react-icons/fa";

export default function ActionCategory({
    id,
}: {
    id: number
}) {

    const { setCategoryData } = use(AdminContext)
    const { setError } = use(ErrorContext)

    const handleDelete = async (id: number) => {
        try {
            const response = await deleteCategory(id);

            if (response.error) {
                setError({
                    message: response.message,
                    type: 'error'
                })
            } else {
                
                setError({
                    message: 'Category eliminada',
                    type: 'info'
                })

                setCategoryData(prevData => prevData.filter(category => category.id !== id));
            }
        } catch (error) {
            setError({
                message: 'Ocurrió un error inesperado al eliminar la categoria.',
                type: 'error'
            })
        }
    }

    return (
        <td className="px-6 py-4  text-center whitespace-nowrap text-sm flex items-center justify-center">
            <button
                onClick={() => handleDelete(id)}
                className="text-red-600 hover:text-red-900 p-2 hover:bg-neutral-400 rounded-md"
            >
                <FaTrashAlt className="text-red-600" />
            </button>
        </td>
    )
}