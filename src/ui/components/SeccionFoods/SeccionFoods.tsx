'use client'

import ArrowDown from '@/ui/icons/ArrowDown';
import Search from '@/ui/icons/Search';
import { 
    useState, 
    useEffect 
} from 'react';

export default function SearchInputFoods() {
    const [isDropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setDropdownOpen(!isDropdownOpen);
    };

    const handleClickOutside = (event) => {
        if (!event.target.closest('#dropdown-button') && !event.target.closest('#dropdown')) {
            setDropdownOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="w-full mt-24">
            <form className="max-w-lg mx-auto">
                <div className="relative flex">
                    <button
                        id="dropdown-button"
                        onClick={toggleDropdown}
                        className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 
                        text-sm font-medium text-center text-gray-900 bg-gray-100 border 
                        border-gray-300 rounded-s-lg hover:bg-gray-200 focus:ring-4 focus:outline-none 
                        focus:ring-gray-100"
                        type="button"
                    >
                        categories
                        <ArrowDown />
                    </button>
                    <div
                        id="dropdown"
                        className={`absolute z-10 
                            ${isDropdownOpen 
                                ? 'block' 
                                : 'hidden'
                            } bg-white divide-y divide-gray-100 rounded-lg shadow w-44 mt-1`}
                        style={{ 
                            top: '100%', 
                            left: 0 
                        }}
                    >
                        <ul 
                            className="py-2 text-sm text-gray-700" 
                            aria-labelledby="dropdown-button">
                            
                           { /* rellenar todo con bd  */}

                            <li>
                                <a 
                                    type="button" 
                                    className="inline-flex w-full px-4 py-2 hover:bg-gray-100"
                                >
                                    Mockups
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="relative w-full">
                        <input
                            type="search"
                            id="search-dropdown"
                            className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 
                            rounded-e-lg border-s-gray-50 border-s-2 border border-gray-300 
                            focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Cereals ... "
                            required
                        />
                        <button
                            type="submit"
                            className="absolute top-0 end-0 p-2.5 text-sm font-medium h-full 
                            text-white bg-green-700 rounded-e-lg border border-green-700 
                            hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
                        >
                            <Search />
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}