'use client'
import Footer from "@/ui/components/footer/Footer";
import Spinner from "@/ui/components/loading/Spinner";
import Hero from "@/ui/components/nav/Hero"
import { Suspense } from "react";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    return (
        <>
            <main className="overflow-y-auto min-h-[100vh]">
                <Hero />
                <div className="mt-20 p-4 flex justify-center items-center">
                    <Suspense fallback={<Spinner />}>
                        {children}
                    </Suspense>
                </div>
            </main>
            <Footer />
        </>
    )
}