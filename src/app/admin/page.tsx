'use client'

import { useMsgInit } from "@/hooks/useMsgInit";

export default function page() {

    const name = useMsgInit({
        message: 'Bienvenido!',
        type: 'info'
    })

    return (
        <div className="flex gap-2 items-center justify-center">
            <div className="min-h-screen w-full bg-gray-100 flex flex-col ">

                {/* Top bar */}
                <header className="bg-gray-800 text-white p-4 shadow-md">
                    <h1 className="text-2xl font-bold"> Welcome </h1>
                </header>
                <InfoAdmin />
            </div>

            <Collapsible summary={'Change Password'}>
                <FormChangePwd />
            </Collapsible>

            <Collapsible summary={'Change Information'}>
                <AdminForm />
            </Collapsible>
        </div>
    )
}

export const Collapsible = ({
    summary,
    children
}: {
    summary: String,
    children: React.ReactNode
}) => {
    return (
        <details className="px-4 rounded-md bg-red-200 cursor-pointer">
            <summary className="flex p-4 -mx-4 rounded-md text-2xl cursor-pointer justify-between list-none after:content-['+'] open:after:content-['-'] open:shadow-[0_4px]">
                {summary}
            </summary>
            <div className="pt-4">
                {children}
            </div>
        </details>
    );
};

export const InfoAdmin = () => {
    return (
        <main className="flex-grow p-6">
            <div className="container mx-auto">
                <div className="text-gray-700 text-xl font-semibold mb-4">
                    Dashboard Overview
                </div>

                <div className="flex flex-col gap-2">
                    {/* Card 1 */}
                    <div className="bg-white border rounded-lg shadow-lg p-6">
                        <div className="text-gray-700 text-lg font-semibold">Total Users</div>
                        <div className="text-3xl font-bold text-gray-900 mt-2">150</div>
                    </div>

                    {/* Card 2 */}
                    <div className="bg-white border rounded-lg shadow-lg p-6">
                        <div className="text-gray-700 text-lg font-semibold">New Signups</div>
                        <div className="text-3xl font-bold text-gray-900 mt-2">25</div>
                    </div>

                    {/* Card 3 */}
                    <div className="bg-white border rounded-lg shadow-lg p-6">
                        <div className="text-gray-700 text-lg font-semibold">Server Uptime</div>
                        <div className="text-3xl font-bold text-gray-900 mt-2">99.9%</div>
                    </div>

                    {/* Card 4 */}
                    <div className="bg-white border rounded-lg shadow-lg p-6">
                        <div className="text-gray-700 text-lg font-semibold">Pending Orders</div>
                        <div className="text-3xl font-bold text-gray-900 mt-2">12</div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export function AdminForm() {
    return (

        <form >
            <div className="mb-4">
                <label htmlFor="name" className="text-gray-700 text-lg font-semibold">Name</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    required
                />
            </div>

            <div className="mb-4">
                <label htmlFor="country" className="text-gray-700 text-lg font-semibold">Country</label>
                <input
                    type="text"
                    id="country"
                    name="country"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    required
                />
            </div>

            <div className="mb-4">
                <label htmlFor="email" className="text-gray-700 text-lg font-semibold">Email</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    required
                />
            </div>

            <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                Submit
            </button>
        </form>
    )
}

export const FormChangePwd = () => {
    return (
        <form action="">
            <div className="mb-4">
                <label htmlFor="password" className="text-gray-700 text-lg font-semibold">Password</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    required
                />
            </div>

            <div className="mb-4">
                <label htmlFor="type" className="text-gray-700 text-lg font-semibold">Repeat Password</label>
                <input
                    type="password"
                    id="type"
                    name="type"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
            </div>

            <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                Submit
            </button>
        </form>
    )
}