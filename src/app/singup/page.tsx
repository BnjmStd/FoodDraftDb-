'use client'

import Food from '@/ui/icons/Food'
import Link from 'next/link'
import { createNew } from '@/lib/actions/user'
import { useActionState, useState } from 'react'
import { FaEye, FaEyeSlash } from "react-icons/fa"

export default function SignUp() {

    const [
        state,
        action,
        isPending
    ] = useActionState(createNew, null)

    const [isShowPassword, setIsShowPassword] = useState(false)

    return (
        <section className="w-full">
            <div className="flex flex-col items-center justify-center px-6 py-6 mx-auto md:h-screen lg:py-0">
                <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
                    <div className=" space-y-4 md:space-y-2 sm:p-8">
                        <p className='text-xl font-bold flex items-center justify-center'>
                            FoodCraft <Food />
                        </p>
                        <h4 className="text-xl font-bold text-center text-gray-900 md:text-2xl">
                            Create an account
                        </h4>
                        <form className="space-y-2" action={action}>
                            <div>
                                <label
                                    htmlFor="email"
                                    className="block mb-2 text-sm font-medium text-gray-900"
                                >
                                    Your email
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    className="input-sing-up"
                                    placeholder="watermelon@yellow.com"
                                    required
                                />
                                {state?.errors?.email &&
                                    <p className='error'>{state.errors.email}</p>}
                            </div>
                            <div >
                                <label
                                    htmlFor="password"
                                    className="block mb-2 text-sm font-medium text-gray-900">
                                    Password
                                </label>
                                <div className='relative'>
                                    <input
                                        type={isShowPassword ? 'password' : 'text'}
                                        name="password"
                                        id="password"
                                        placeholder="••••••••"
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
                            <div>
                                <label
                                    htmlFor="confirm-password"
                                    className="block mb-2 text-sm font-medium 
                                text-gray-900">Confirm password</label>
                                <div className='relative'>
                                    <input
                                        type={isShowPassword ? 'password' : 'text'}
                                        name="confirmPassword"
                                        id="confirm-password"
                                        placeholder="••••••••"
                                        className="input-sing-up"
                                        required
                                    />
                                    <span
                                        className="text-primary h-2 cursor-pointer 
                                        absolute bottom-[50%] right-[5%]"
                                        onClick={() => setIsShowPassword(!isShowPassword)}
                                    >
                                        {
                                            isShowPassword
                                                ? <FaEye />
                                                : <FaEyeSlash />
                                        }
                                    </span>
                                </div>

                                {state?.errors?.confirmPassword &&
                                    <p className='error'>{state.errors.confirmPassword}</p>}
                            </div>
                            <div className="flex items-start flex-col">
                                <div className="flex items-center gap-2">
                                    <input
                                        id="terms"
                                        name='check'
                                        aria-describedby="terms"
                                        type="checkbox"
                                        className="w-4 h-4 border border-gray-300 
                                        rounded bg-gray-50 "
                                        value={'checked'}
                                        required
                                    />

                                    <label
                                        htmlFor="terms"
                                        className=" text-gray-500 text-sm flex items-center ">
                                        I accept the
                                        <a
                                            className="font-medium text-primary-600 
                                            hover:underline ml-1 text-blue-500"
                                            href="#"
                                        >
                                            Terms and Conditions
                                        </a>
                                    </label>
                                </div>
                                {state?.errors?.checkBox &&
                                    <p className='error'>{state.errors.checkBox}</p>}
                            </div>
                            <button
                                disabled={isPending}
                                type="submit"
                                className="w-full text-white bg-blue-500 
                                hover:bg-blue-700 focus:ring-4 focus:outline-none 
                                focus:ring-primary-300 font-medium rounded-lg 
                                text-sm px-5 py-2.5 text-center"
                            >
                                {isPending ? 'Submitting' : 'Create an account'}
                            </button>
                            <p
                                className="text-sm font-light text-gray-500 flex gap-1">
                                Already have an account?
                                <Link
                                    href="/login"
                                    className="font-medium  text-neutral-500 hover:text-blue-600 
                                        hover:underline">
                                    Login here
                                </Link>
                            </p>
                        </form>
                        {isPending && <p>Loading ...</p>}
                    </div>
                </div>
            </div>
        </section>
    )
}