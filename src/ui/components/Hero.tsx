import { MdOutlineFastfood } from "react-icons/md";
import { useState } from "react";
import { FaBars, FaTimes } from 'react-icons/fa';
import Logo from "./Logo";
import Nav from "./Nav";
import Link from "next/link";

export default function hero () {

    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <header
            id="landing-header" 
            className="py-2 px-10 flex items-center fixed top-0 w-full 
            justify-between  text-black z-40 border-b-2 text-sm"
        >
            <Logo />
            <Nav />

            <div className="flex sm:hidden">
                <button
                    onClick={toggleMenu}
                    className="text-gray-700 hover:text-gray-900 focus:outline-none focus:text-gray-900"
                >
                    {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                </button>
            </div>

            <Link href={"/login"} className="bg-black hidden gap-2 text-white p-2 rounded-md md:flex
                hover:bg-neutral-700 ">
                Account
                <MdOutlineFastfood />
            </Link>

            {isOpen && (
                <div className="sm:hidden bg-white shadow-md">
                    <nav className="px-2 pt-2 pb-3 space-y-1">
                        <Link href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900">Home</Link>
                        <Link href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900">Database</Link>
                        <Link href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900">Alimentos</Link>
                        <Link href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900">Empresas</Link>
                        <Link href={"/login"} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 ">Account</Link>
                    </nav>
                </div>
            )}
            
        </header>   
    );
}

