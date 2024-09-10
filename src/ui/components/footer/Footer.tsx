import { FaYoutube, FaXTwitter } from "react-icons/fa6";
import { LuInstagram } from "react-icons/lu";

export default function Footer() {

    const myCompany = "Grid & Code."
    const country = "chile"

    return (
        <footer
            className="flex w-full flex-col gap-2 p-4  justify-center items-center
                bg-neutral-600 text-white rounded-md px-4">

            <p>{myCompany} - <strong> {country} </strong></p>

            <div className="">
                <ul className="space-x-4 flex flex-col md:flex-row border-b-4 border-t-4 
                border-gray-500 items-center justify-center ">
                    <li className="flex items-center">
                        <a
                            className=" hover:bg-gray-200 hover:text-black rounded-md"
                            href=""
                        >
                            Features
                        </a>
                    </li>
                    <li
                        className="flex items-center">
                        <a
                            className=" hover:bg-gray-200 hover:text-black rounded-md"
                            href=""
                        >
                            About
                        </a>
                    </li>
                    <li
                        className="flex items-center"
                    >
                        <a
                            className=" hover:bg-gray-200 hover:text-black rounded-md"
                            href=""
                        >
                            Testimonials
                        </a>
                    </li>
                    <li
                        className="flex items-center">
                        <a
                            className=" hover:bg-gray-200 hover:text-black rounded-md"
                            href=""
                        >
                            Contact
                        </a>
                    </li>
                    <li className="flex items-center">
                        <a
                            className=" hover:bg-gray-200 hover:text-black rounded-md"
                            href=""
                        >
                            Download
                        </a>
                    </li>
                </ul>
            </div>

            <div className="flex  items-center justify-center">
                <FaYoutube size={'2em'}
                    className="hover:text-green-500 hover:scale-125 transition-all duration-300" />
                <LuInstagram size={'2em'}
                    className="hover:text-green-500 hover:scale-125 transition-all duration-300" />
                <FaXTwitter size={'2em'}
                    className="hover:text-green-500 hover:scale-125 transition-all duration-300" />
            </div>

            <p>All rights reserved</p>

        </footer>
    )
}