import { createNewAdmin } from "@/lib/actions/user";

export const UserForm = () => {
    return (
        <form action={createNewAdmin} className=" bg-white rounded-lg">
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
                    htmlFor="country" 
                    className="block text-gray-700 font-bold mb-2"
                >
                    Country
                </label>
                <input
                    type="text"
                    id="country"
                    name="country"
                    className="w-full px-3 py-2 border rounded-md focus:outline-none 
                    focus:ring focus:ring-indigo-200"
                />
            </div>
            <div className="mb-4">
                <label 
                htmlFor="email" 
                className="block text-gray-700 font-bold mb-2"
                >
                    Email
                </label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full px-3 py-2 border rounded-md focus:outline-none 
                    focus:ring focus:ring-indigo-200"
                />
            </div>
            <div className="mb-4">
                <label 
                    htmlFor="password" 
                    className="block text-gray-700 font-bold mb-2"
                >
                    Password
                </label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    className="w-full px-3 py-2 border rounded-md focus:outline-none 
                    focus:ring focus:ring-indigo-200"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="type" className="block text-gray-700 font-bold mb-2">Type</label>
                <input
                    type="text"
                    id="type"
                    name="type"
                    className="w-full px-3 py-2 border rounded-md focus:outline-none 
                    focus:ring focus:ring-indigo-200"
                />
            </div>
            <div className="flex justify-center">
                <button type="submit" className="px-4 py-2 bg-blue-500 text-white 
                font-bold rounded-md hover:bg-blue-600 focus:outline-none focus:ring 
                focus:ring-blue-200">
                    Submit
                </button>
            </div>
        </form>
    );
};