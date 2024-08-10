import Spinner from "@/ui/components/loading/Spinner";
import Sidebar from "@/ui/components/sidebar/Sidebar";
import { Suspense } from "react";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    return (

        <div className="flex m-20 flex-grow border overflow-auto items-center justify-center">
            <Sidebar />
            <Suspense fallback={<Spinner />}>
                {children}
            </Suspense>
        </div>

    )
}