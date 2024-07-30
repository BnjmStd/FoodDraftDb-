'use client'

import { login } from "@/lib/actions/user";
import Link from "next/link";
import { useState } from "react"
import { FaEye, FaEyeSlash } from "react-icons/fa";

import "./Nav.css"

export default function Login() {

    const [password, setPassword] = useState('')
    const handleChangePwd = (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)
    const [error, setError] = useState<string | null>(null)
    const [isShowPassword, setIsShowPassword] = useState(false)
    const toggleShowPassword = () => {
        setIsShowPassword(!isShowPassword)
    }

    return (
        <>

            <nav className="nav">

                <div className="nav__container">

                    <figure className="nav__figure">
                        <img className="nav__logo"
                            src="" alt="" />
                    </figure>

                    <label
                        className="nav__togle"
                    >

                        <input
                            type="checkbox"
                            id="menu-input"
                            className="nav__input"
                        />

                    </label>

                    <ul className="nav__list">
                        <li className="nav__item">
                            <a 
                                href="#"
                                className="nav__link"
                            >
                                Gallery
                            </a>
                        </li>

                        <li className="nav__item">
                            <a 
                                href="#"
                                className="nav__link"
                            >
                                Miaus
                            </a>
                        </li>
                    </ul>

                </div>

            </nav>


            <div className="flex items-center justify-center mt-28">
                <div className="w-96 border rounded bg-while px-7 py-10">
                    <form action={login}>
                        <h4 className="text-2xl mb-2 text-center">Login</h4>

                        <div className="relative z-0 w-full mb-5 group">
                            <input
                                type="email"
                                name="floating_email"
                                id="floating_email"
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent 
                                border-0 border-b-2 border-gray-300 appearance-none dark:text-white 
                                dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 
                                focus:border-blue-600 peer"
                                placeholder=" "
                                required
                            />

                            <label
                                htmlFor="floating_email"
                                className="peer-focus:font-medium absolute text-sm text-gray-500 
                                dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 
                                -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 
                                peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 
                                peer-placeholder-shown:translate-y-0 peer-focus:scale-75 
                                peer-focus:-translate-y-6"
                            >
                                Email
                            </label>
                        </div>

                        <div className="relative z-0 w-full mb-5 group flex items-center">
                            <input
                                type={isShowPassword ? "text" : "password"}
                                name="floating_password"
                                id="floating_password"
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 
                                border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 
                                focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                placeholder=" "
                                required
                            />

                            <label
                                htmlFor="floating_password"
                                className="peer-focus:font-medium absolute text-sm 
                                text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 
                                scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 
                                peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 
                                peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                                Password
                            </label>

                            <span
                                className="text-primary cursor-pointer "
                                onClick={toggleShowPassword}
                            >
                                {
                                    isShowPassword
                                        ? <FaEye />
                                        : <FaEyeSlash />
                                }
                            </span>
                        </div>

                        {error && <p className="text-red-500 text-xs pb-1">{error}</p>}

                        <button type="submit" className="bg-green-300 p-2 rounded-md hover:bg-green-500">
                            Login
                        </button>
                        <p className="text-sm text-center mt-4">
                            not registered yet?
                            <Link href={'/singup'} className="font-medium text-bold cursor-pointer text-red-500 hover:text-blue-600"> Create account </Link>
                        </p>
                    </form>
                </div>
            </div>
        </>
    )
}