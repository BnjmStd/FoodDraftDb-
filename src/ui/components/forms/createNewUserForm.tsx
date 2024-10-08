'use client'

import {
    createNewAdmin,
    editUser
} from "@/lib/actions/user";

import { ErrorContext } from "@/lib/context/error";
import { AdminContext } from "@/lib/context/admin";

import {
    useActionState,
    useRef,
    use,
    useEffect
} from "react";

import InputPassword from "../input/password/InputPassword";

const userTypes = ["Admin", "User"];
const countrys = ['Chile', 'Argentina', 'Brazil', 'Colombia', 'Mexico', 'Peru', 'Venezuela']

export const UserForm = () => {

    const formRef = useRef<HTMLFormElement | null>(null)

    const { setIsSetOpen, isSetOpen } = use(ErrorContext)

    const [
        state,
        action,
        isPending
    ] = useActionState(createNewAdmin, null);

    useEffect(() => {
        if (state?.success && state.message) {
            // setUserData(prevState => [...prevState, state?.message]);
            formRef.current?.reset();
            setIsSetOpen(false);
        }
        if (!isSetOpen) {
            formRef.current?.reset()
        }
    }, [state?.success, setIsSetOpen, state?.message]);

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
                <InputPassword label={'Password'} name={'password'} />
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
}

export const EditUserForm = () => {

    const formRef = useRef<HTMLFormElement | null>(null)

    const { setIsSetOpen, isSetOpen } = use(ErrorContext)

    const { selected } = use(AdminContext)

    const User = selected

    const [
        state,
        action,
        isPending
    ] = useActionState(editUser, null);

    useEffect(() => {
        if (state?.success && state.message) {
            formRef.current?.reset();
            setIsSetOpen(false);
        }
        if (!isSetOpen) {
            formRef.current?.reset()
        }
    }, [state?.success, setIsSetOpen, state?.message]);

    return (
        <form ref={formRef} action={action} className="rounded-lg grid gap-2 p-2 grid-cols-1">
            <div className="hidden">
                <input type="text"
                    name="id"
                    defaultValue={User?.id} />
            </div>
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
                    defaultValue={User?.name || ""}
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
                        <option key={country} value={country} defaultValue={User?.country || ""}>
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
                    defaultValue={User?.email || ""}
                />
                {state?.errors?.email &&
                    <p className='error'>{state.errors.email}</p>}
            </div>
            <div className="mb-4">
                <InputPassword label={'Password'} name={'password'} />
                {state?.errors?.password &&
                    <p className='error'>{state.errors.password}</p>}
            </div>

            <div className="mb-4">
                <InputPassword label={'New Password'} name={"newpassword"} />
                {state?.errors?.passwordNew &&
                    <p className='error'>{state.errors.passwordNew}</p>}
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
                        <option className="capitalize" key={type} value={type} defaultValue={User?.type || ""}>
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
}