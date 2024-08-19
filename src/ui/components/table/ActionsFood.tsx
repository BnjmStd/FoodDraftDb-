import { deleteFood } from "@/lib/actions/food";
import { AdminContext } from "@/lib/context/admin";
import { ErrorContext } from "@/lib/context/error";
import { use } from "react";
import { FaTrashAlt } from "react-icons/fa";

export default function ActionFood({
    id,
}: {
    id: number
}) {

    const { setFoodData } = use(AdminContext)
    const { setError } = use(ErrorContext)

    const handleDelete = async (id: number) => {
        try {
            const response = await deleteFood(id);

            if (response.error) {
                setError({
                    message: response.message,
                    type: 'error'
                })
            } else {
                
                setError({
                    message: 'Food eliminada',
                    type: 'info'
                })

                setFoodData(prevData => prevData.filter(food => food.id !== id));
            }
        } catch (error) {
            setError({
                message: 'Ocurrió un error inesperado al eliminar la Food.',
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