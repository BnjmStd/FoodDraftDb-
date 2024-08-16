import { BsSearchHeart } from "react-icons/bs";
import { FaSearch } from "react-icons/fa";

export default function SearchAdmin ({
    setFiltering
}:{
    setFiltering: React.Dispatch<React.SetStateAction<string | undefined>>
}) {
    return (
        <>
            <div className="relative">
                <div className="absolute inset-y-0 start-0 flex 
                items-center ps-3 pointer-events-none z-0">
                    <FaSearch />
                </div>
                <input 
                    className="block w-full p-2 ps-10 text-sm text-gray-900 border 
                    border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 
                    focus:border-blue-500" 
                    placeholder="Search" 
                    onChange={(e) => {setFiltering(e.target.value)}}
                />
            </div>
        </>
    )
}