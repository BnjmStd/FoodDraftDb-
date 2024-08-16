'use client'

import { createNewAdmin } from "@/lib/actions/user";
import { useState } from "react";
import {
    FaEye,
    FaEyeSlash
} from "react-icons/fa6";

export const UserForm = () => {
    const userTypes = ["Admin", "User"];
    const countrys = ['Chile', 'Argentina', 'Brazil', 'Colombia', 'Mexico', 'Peru', 'Venezuela']
    const [isShowPassword, setIsShowPassword] = useState(false)

    return (
        <form action={createNewAdmin} className="rounded-lg grid sm:grid-cols-2 gap-4 p-4 grid-cols-1">
            <div className="mb-4">
                <label
                    htmlFor="name"
                    className="block text-gray-200 font-bold mb-2"
                >
                    Name
                </label>
                <input
                    type="text"
                    id="name"
                    placeholder="Arroz graneado ..."
                    name="name"
                    className="w-full px-3 py-2 border rounded-md focus:outline-none 
                    focus:ring focus:ring-indigo-200"
                />
            </div>
            <div className="mb-4">
                <label
                    htmlFor="country"
                    className="block text-gray-200 font-bold mb-2"
                >
                    Country
                </label>
                <select
                    id="country"
                    name="country"
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring"
                >
                    {countrys.map(country => (
                        <option key={country} value={country}>
                            {country}
                        </option>
                    ))}
                </select>
            </div>
            <div className="mb-4">
                <label
                    htmlFor="email"
                    className="block text-gray-200 font-bold mb-2"
                >
                    Email
                </label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="jamon@cerrano.cl"
                    className="w-full px-3 py-2 border rounded-md focus:outline-none 
                    focus:ring focus:ring-indigo-200"
                />
            </div>
            <div className="mb-4">
                <label
                    htmlFor="password"
                    className="block text-gray-200 font-bold mb-2"
                >
                    Password
                </label>
                <div className='relative'>
                    <input
                        type={isShowPassword ? 'password' : 'text'}
                        name="password"
                        id="password"
                        placeholder={isShowPassword ? '••••••••' : 'contraseña'}
                        className="input-sing-up"
                        required
                    />
                    <span
                        className="text-primary h-2 cursor-pointer absolute 
                                        bottom-[50%] right-[5%]"
                        onClick={() => setIsShowPassword(!isShowPassword)}
                    >
                        {
                            isShowPassword
                                ? <FaEye />
                                : <FaEyeSlash />
                        }
                    </span>
                </div>
            </div>
            <div className="mb-4">
                <label htmlFor="type" className="block text-gray-200 font-bold mb-2">Type</label>
                <select
                    id="type"
                    name="type"
                    className="w-full px-3 py-2 border rounded-md focus:outline-none 
                    focus:ring focus:ring-indigo-200"
                >
                    {userTypes.map((type) => (
                        <option className="capitalize" key={type} value={type}>
                            {type}
                        </option>
                    ))}
                </select>
            </div>
            <div className="flex justify-center ">
                <button type="submit" className="w-full overflow-hidden px-4 py-2 bg-blue-500 text-white 
                font-bold rounded-md hover:bg-blue-600 focus:outline-none focus:ring 
                focus:ring-blue-200">
                    Submit
                </button>
            </div>
        </form>
    );
};