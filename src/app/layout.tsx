import type { Metadata } from "next";
import { poppins } from "@/ui/fonts";
import "./globals.css";

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
            <body 
                className={`${poppins.className}`}
            >
                {children}
            </body>
        </html>
    );
}