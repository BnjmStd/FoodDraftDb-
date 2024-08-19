import { getAllCategory } from "@/lib/actions/category";
import { createNewFood } from "@/lib/actions/food";
import { AdminContext } from "@/lib/context/admin";
import { use, useActionState, useEffect } from "react";

export const FoodForm = () => {

    const [state, action, isPending] = useActionState(createNewFood, null)

    const {setIsLoading, setCategoryData, categoryData} = use(AdminContext)

    const reloadData = async () => {
        try {
            const response = await getAllCategory()

            if (response.error) {
                console.log({
                    type: 'error',
                    message: response.message
                })
            }

            if (response.ok) {
                setCategoryData(response.data);
                console.log({
                    type: 'info',
                    message: 'category ok'
                })
            }
        } catch (error) {
            console.log({
                type: 'error',
                message: 'Algo salío mal'
            })
        } finally {
            setIsLoading(false)
        }
    };

    useEffect(() => {
        reloadData()
    }, [])

    return (
        <form 
            action={action} 
            className="rounded-lg grid sm:grid-cols-2 gap-4 p-4 grid-cols-1">
            <div className="mb-4">
                <label 
                    htmlFor="name" 
                    className="block text-gray-700 font-bold mb-2"
                >
                        Name
                </label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    className="w-full px-3 py-2 border rounded-md focus:outline-none 
                    focus:ring focus:ring-indigo-200"
                />
            </div>
            <div className="mb-4">
                <label 
                    htmlFor="description" 
                    className="block text-gray-700 font-bold mb-2"
                >
                    Description
                </label>
                <textarea
                    id="description"
                    name="description"
                    className="w-full px-3 py-2 border rounded-md focus:outline-none 
                    focus:ring focus:ring-indigo-200"
                />
            </div>
            <div>
                <label htmlFor="categoryId" className="block text-gray-700 font-bold mb-2 ">Category:</label>
                <select
                    id="categoryId"
                    name="categoryId"
                    className="p-2"
                    required
                >
                    <option value="">Select a category</option>
                    {categoryData.map(category => (
                        <option key={category.id} value={category.id}>
                            {category.name}
                        </option>
                    ))}
                </select>
            </div>
            <div className="flex justify-center">
                <button 
                    type="submit" 
                    className="px-4 py-2 bg-blue-500 text-white font-bold rounded-md 
                    hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200"
                >
                    Submit
                </button>
            </div>
        </form>
    );
};
