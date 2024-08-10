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
                <ErrorContextProvider>
                    {children}
                    <Alert />
                </ErrorContextProvider>
            </body>
        </html>
    );
}