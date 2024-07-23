import Food from '@/ui/icons/Food';
import Link from 'next/link';
import { createNew } from '@/lib/actions/user';

export default function SignUp() {
    return (
        <section className="bg-gray-50 w-full">
            <div className="flex flex-col items-center justify-center px-6 py-6 mx-auto md:h-screen lg:py-0">
                <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
                    <div className="p-6 space-y-4 md:space-y-4 sm:p-8">
                        <p className='text-xl font-bold flex items-center justify-center'>
                            FoodCraft   <Food />
                        </p>
                        <h4 className="text-xl font-bold  tracking-tight text-gray-900 md:text-2xl">
                            Create an account
                        </h4>
                        <form className="space-y-2 md:space-y-6" action={createNew}>
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
                                    className="bg-gray-50 border border-gray-300 text-gray-900 
                                        text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 
                                        block w-full p-2.5"
                                    placeholder="watermelon@yellow.com"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    placeholder="••••••••"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm 
                                    rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full 
                                    p-2.5"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium 
                                text-gray-900">Confirm password</label>
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    id="confirm-password"
                                    placeholder="••••••••"
                                    className="bg-gray-50 border border-gray-300 
                                    text-gray-900 text-sm rounded-lg focus:ring-primary-600 
                                    focus:border-primary-600 block w-full p-2.5"
                                    required
                                />
                            </div>
                            <div className="flex items-start">
                                <div className="flex items-center h-5">
                                    <input
                                        id="terms"
                                        name='check'
                                        aria-describedby="terms"
                                        type="checkbox"
                                        className="w-4 h-4 border border-gray-300 
                                        rounded bg-gray-50 focus:ring-3 
                                        focus:ring-primary-300"
                                        value={'checked'}
                                        required
                                    />
                                </div>
                                <div className="ml-3 text-sm">
                                    <label
                                        htmlFor="terms"
                                        className="font-light text-gray-500">
                                        I accept the
                                        <a
                                            className="font-medium text-primary-600 
                                            hover:underline"
                                            href="#"
                                        >
                                            Terms and Conditions
                                        </a>
                                    </label>
                                </div>
                            </div>
                            <button
                                type="submit"
                                className="w-full text-white bg-blue-500 
                                hover:bg-blue-700 focus:ring-4 focus:outline-none 
                                focus:ring-primary-300 font-medium rounded-lg 
                                text-sm px-5 py-2.5 text-center"
                            >
                                Create an account
                            </button>
                            <p
                                className="text-sm font-light text-gray-500">
                                Already have an account?
                                <Link
                                    href="/login"
                                    className="font-medium text-primary-600 
                                        hover:underline">
                                    Login here
                                </Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};