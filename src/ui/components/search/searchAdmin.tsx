import { BsSearchHeart } from "react-icons/bs";

export default function SearchAdmin () {
    return (
        <form className="flex gap-2">
            <label htmlFor="search" className="text-sm flex-1 text-gray-900 sr-only">Search</label>
            <div className="relative">
                <div className="absolute inset-y-0 start-0 flex 
                items-center ps-3 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-500"
                        aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                        fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                    </svg>
                </div>
                <input type="search" id="search"
                    className="block w-full p-2 ps-10 text-sm text-gray-900 border 
                border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 
                focus:border-blue-500" placeholder="Search" required />
            </div>
            <button className="p-2 rounded-md bg-red-200 hover:bg-neutral-400">
                <BsSearchHeart />
            </button>
        </form>
    )
}