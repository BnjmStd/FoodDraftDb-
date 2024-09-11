'use client'
import Footer from "@/ui/components/footer/Footer";
import Hero from "@/ui/components/nav/Hero"

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    return (
        <>
            <main className="overflow-y-auto min-h-[100vh]">
                <Hero />
                <div className="mt-8 p-4 flex flex-col gap-2 justify-center items-center w-full">
                        {children}
                </div>
            </main>
            <Footer />
        </>
    )
}