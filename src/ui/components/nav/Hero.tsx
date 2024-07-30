import { useState } from "react";
import { FaBars, FaTimes } from 'react-icons/fa';
import Logo from "../Logo";
import Nav from "./Nav";
import Link from "next/link";
import "./HeroStyle.css"

export default function hero ({
    setContent
} : {
    setContent: React.Dispatch<React.SetStateAction<string>>
}) {

    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <header
            id="landing-header" 
            className="py-2 px-10 flex items-center fixed top-0 w-full 
            justify-between text-black z-40 border-b-2 text-sm"
        >
            <Logo />
            <Nav setContent={setContent} />

            <div className="flex sm:hidden">
                <button
                    onClick={toggleMenu}
                    className="text-gray-700 hover:text-gray-900 focus:outline-none focus:text-gray-900"
                >
                    {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                </button>
            </div>


            <div className="hidden md:flex md:flex-row gap-2 ">
                <Link 
                    href={"/login"} 
                    className="bg-black gap-2 text-white p-2 rounded-md 
                    hover:bg-neutral-700 ">
                    Login
                </Link>
                <Link 
                    href={"/singup"} 
                    className="border-2 border-black gap-2 text-black p-2 rounded-md hover:bg-neutral-500 hover:text-white">
                    Sing up
                </Link>
            </div>

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

