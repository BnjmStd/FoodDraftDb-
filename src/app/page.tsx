'use client'

/* components */
import Hero from "@/ui/components/nav/Hero"
import SeccionFoods from "@/ui/components/SeccionFoods/SeccionFoods"
import AnimatedSvgBackground from "@/ui/components/background/Background"
import CardSeccion from "@/ui/components/card/CardSeccion"

export default function Home() {
    return (
        <>
            <AnimatedSvgBackground />
            <main className="h-screen w-full">
                <Hero />
            </main>
            <SeccionFoods />
            <CardSeccion />
        </>
    )
}