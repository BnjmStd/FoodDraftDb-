'use client'

export default function page () {
    return <AdminDashboard />
}

const AdminDashboard = () => {
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">
            {/* Top bar */}
            <header className="bg-gray-800 text-white p-4 shadow-md">
                <h1 className="text-2xl font-bold">Welcome, Admin</h1>
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
    );
};