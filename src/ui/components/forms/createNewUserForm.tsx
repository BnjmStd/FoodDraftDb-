'use client'

import { createNewAdmin } from "@/lib/actions/user";
import { ErrorContext } from "@/lib/context/error";

import { 
    useActionState, 
    useState, 
    useRef, 
    use,
    useEffect
} from "react";

import {
    FaEye,
    FaEyeSlash
} from "react-icons/fa6";

import {
    User
} from "@prisma/client"

export const UserForm = ({
    User
}:{
    User?: User
}) => {

    const userTypes = ["Admin", "User"];
    const countrys = ['Chile', 'Argentina', 'Brazil', 'Colombia', 'Mexico', 'Peru', 'Venezuela']
    const formRef = useRef<HTMLFormElement | null>(null)

    const [isShowPassword, setIsShowPassword] = useState(false)
    const { setIsSetOpen, isSetOpen } = use(ErrorContext)
    
    const [
        state,
        action,
        isPending
    ] = useActionState(createNewAdmin, null)

    useEffect(() => {
        if (state?.success) {
            formRef.current?.reset();
            setIsSetOpen(false);
        }
        if (!isSetOpen) {
            formRef.current?.reset()
        }
    }, [state?.success, setIsSetOpen]);

    return (
        <form ref={formRef} action={action} className="rounded-lg grid sm:grid-cols-2 gap-4 p-4 grid-cols-1">
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
                    defaultValue={User?.email || ""}
                />
                {state?.errors?.name &&
                    <p className='error'>{state.errors.name}</p>}
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
                {state?.errors?.country &&
                    <p className='error'>{state.errors.country}</p>}
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
                {state?.errors?.email &&
                    <p className='error'>{state.errors.email}</p>}
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
                {state?.errors?.password &&
                    <p className='error'>{state.errors.password}</p>}
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
                {state?.errors?.type &&
                    <p className='error'>{state.errors.type}</p>}
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