import { FaYoutube, FaXTwitter } from "react-icons/fa6";
import { LuInstagram } from "react-icons/lu";

export default function Footer() {

    const myCompany = "Grid & Code."
    const country = "chile"

    return (
        <footer
            className="flex flex-col gap-2 justify-center items-center
                bg-neutral-600 p-4 text-white min-w-[400px] rounded-md">

            <p>{myCompany} - <strong> {country} </strong></p>

            <ul className="flex flex-col md:flex-row gap-8  py-8 border-b-4 border-t-4 border-gray-500 w-full 
                items-center justify-center ">
                <li className="flex items-center">
                    <a
                        className="p-2 hover:bg-gray-200 hover:text-black rounded-md"
                        href=""
                    >
                        Features
                    </a>
                </li>
                <li
                    className="flex items-center">
                    <a
                        className="p-2 hover:bg-gray-200 hover:text-black rounded-md"
                        href=""
                    >
                        About
                    </a>
                </li>
                <li
                    className="flex items-center"
                >
                    <a
                        className="p-2 hover:bg-gray-200 hover:text-black rounded-md"
                        href=""
                    >
                        Testimonials
                    </a>
                </li>
                <li
                    className="flex items-center">
                    <a
                        className="p-2 hover:bg-gray-200 hover:text-black rounded-md"
                        href=""
                    >
                        Contact
                    </a>
                </li>
                <li className="flex items-center">
                    <a
                        className="p-2 hover:bg-gray-200 hover:text-black rounded-md"
                        href=""
                    >
                        Download
                    </a>
                </li>
            </ul>

            <div className="flex gap-4 py-2 px-2 items-center justify-center">
                <FaYoutube size={'2em'} 
                className="hover:text-green-500 hover:scale-125 transition-all duration-300"/>
                <LuInstagram size={'2em'}
                className="hover:text-green-500 hover:scale-125 transition-all duration-300"/>
                <FaXTwitter size={'2em'} 
                    className="hover:text-green-500 hover:scale-125 transition-all duration-300"/>
            </div>

            <p>All rights reserved</p>

        </footer>
    )
}