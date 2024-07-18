'use client'

import PasswordInput from "@/ui/components/Input/PasswordInput";
import Link from "next/link";
import { useState } from "react"
import { validateEmail } from "../../lib/utils/helper"

export default function Login() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState<string | null>(null)

    // form
    const handleLogin = async (e) => {
        e.preventDefault()

        if (!validateEmail(email)) {
            setError('please enter a valid email address')
            return
        }

        if (!password) {
            setError('please enter the password')
            return
        }
        setError(null)

        // login api call
    }

    const handleChangePwd = (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)

    return (
        <>
            <div className="flex items-center justify-center mt-28">
                <div className="w-96 border rounded bg-while px-7 py-10">
                    <form onSubmit={handleLogin}>

                        <h4 className="text-2xl mb-2 text-center">Login</h4>

                        <div className="relative z-0 w-full mb-5 group">
                            <input
                                type="email"
                                name="floating_email"
                                id="floating_email"
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                placeholder=" "
                                required
                            />
                            <label
                                htmlFor="floating_email"
                                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                Email address
                            </label>
                        </div>

                        <div className="relative z-0 w-full mb-5 group">
                            <input
                                type="password"
                                name="floating_password"
                                id="floating_password"
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                placeholder=" "
                                required
                            />

                            <label
                                htmlFor="floating_password"
                                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                Password
                            </label>
                        </div>

                        {error && <p className="text-red-500 text-xs pb-1">{error}</p>}

                        <button type="submit" className="bg-green-300 p-2 rounded-md hover:bg-green-500">
                            Login
                        </button>
                        <p className="text-sm text-center mt-4">
                            not registered yet?{" "}
                            <a className="font-medium text-bold cursor-pointer text-red-900"> Create account </a>
                        </p>
                    </form>
                </div>
            </div>
        </>
    )
}