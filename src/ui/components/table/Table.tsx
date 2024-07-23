import { 
    FaTrashAlt, 
    FaEdit 
} from 'react-icons/fa';

export default function Table ({ 
    columns, 
    data,
    onEdit,
    onDelete
}:{
    columns: string[];
    data: any[];
    onEdit: (rowIndex: number) => void;
    onDelete: (rowIndex: number) => void;
}) {
    return (
        <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-red-50">
                <tr>
                    {columns.map((column, index) => (
                        <th key={index} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            {column}
                        </th>
                    ))}
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                    </th>
                </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
                {data.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                        {columns.map((column, colIndex) => (
                            <td key={colIndex} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {row[column]}
                            </td>
                        ))}
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 flex items-center justi">
                            <button 
                                onClick={() => onEdit(rowIndex)}
                                className="text-blue-600 hover:text-blue-900 mr-2 p-2 hover:bg-gray-200 rounded-md"
                            >
                                <FaEdit />
                            </button>
                            <button 
                                onClick={() => onDelete(rowIndex)}
                                className="text-red-600 hover:text-red-900 p-2 hover:bg-gray-200 rounded-md"
                            >
                                <FaTrashAlt />
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};