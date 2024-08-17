import Spinner from "@/ui/components/loading/Spinner"
import Sidebar from "@/ui/components/sidebar/Sidebar"
import { Suspense } from "react"
import { AdminContextProvider } from "@/lib/context/admin"

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <div className="m-20 ">
            <Sidebar />
            <AdminContextProvider>
                <Suspense fallback={<Spinner />}>
                    {children}
                </Suspense>
            </AdminContextProvider>
        </div>
    )
}