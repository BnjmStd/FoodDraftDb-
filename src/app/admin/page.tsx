'use client'

import { msgWelcome } from "@/lib/actions/user";
import { ErrorContext } from "@/lib/context/error";
import { use, useEffect, useState } from "react";

export default function page() {
    const { setError } = use(ErrorContext)

    useEffect(() => {

        const fetchError = async () => {
            try {
                const res = await msgWelcome()

                if (!res) {
                    return null; // Retorna null si no se obtiene una sesión válida
                }

                setError({
                    message: 'Bienvenido!' + res,
                    type: 'info'
                });
            } catch (e) {
                console.error('Error al obtener el mensaje de bienvenida:', e);
            }
        };

        // Llamar a la función asincrónica
        fetchError();
    }, []);

    return (
        <div className="flex flex-col gap-2">
            <div className="min-h-screen bg-gray-100 flex flex-col">
                {/* Top bar */}
                <header className="bg-gray-800 text-white p-4 shadow-md">
                    <h1 className="text-2xl font-bold">Welcome</h1>
                </header>

                {/* Main content */}
                <main className="flex-grow p-6">
                    <div className="container mx-auto">
                        <div className="text-gray-700 text-xl font-semibold mb-4">
                            Dashboard Overview
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
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
            </div>

            <AdminForm />
        </div>
    );
};

export function AdminForm() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-6 text-center">User Form</h2>
                <form >
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="country" className="block text-sm font-medium text-gray-700">Country</label>
                        <input
                            type="text"
                            id="country"
                            name="country"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="type" className="block text-sm font-medium text-gray-700">Type</label>
                        <input
                            type="text"
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
            </div>
        </div>
    );
}