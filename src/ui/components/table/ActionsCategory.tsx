import { use } from "react";
import { 

    FaTrashAlt 
} from "react-icons/fa";

export default function ActionsUser({
    id,
}: {
    id: number
}) {

    const handleDelete = async (id: number) => {
        console.log(id)
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