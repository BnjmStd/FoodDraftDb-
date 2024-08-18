import { createNewFood } from "@/lib/actions/food";
import { useActionState } from "react";

export const FoodForm = () => {

    const [state, action, isPending] = useActionState(createNewFood, null)

    return (
        <form 
            action={action} 
            className="max-w-md mx-auto p-4 bg-white shadow-md rounded-lg">
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
            <div className="mb-4">
                <label 
                    htmlFor="userId" 
                    className="block text-gray-700 font-bold mb-2"
                >
                    User ID</label>
                <input
                    type="number"
                    id="userId"
                    name="userId"
                    className="w-full px-3 py-2 border rounded-md focus:outline-none 
                    focus:ring focus:ring-indigo-200"
                />
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