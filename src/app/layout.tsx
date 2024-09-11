import type { Metadata } from "next";
import { poppins } from "@/ui/fonts";
import "./globals.css";
import { ErrorContextProvider } from "@/lib/context/error";
import Alert from "@/ui/components/alert/Alert";

export const metadata: Metadata = {
    title: "FoodCraft-DB",
    description: "Todo sobre tus alimentos, en un solo lugar ...",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="es">
            <body className={`${poppins.className}`}>
            <div className="fixed inset-0 -z-10 h-screen w-screen bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)]"></div>
                <ErrorContextProvider>
                    {children}
                    <Alert />
                </ErrorContextProvider>
            </body>
        </html>
    );
}