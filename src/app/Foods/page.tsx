'use client'

import AnimatedSvgBackground from "@/ui/components/background/Background";
import CardSeccion from "@/ui/components/card/CardSeccion";
import Hero from "@/ui/components/nav/Hero";
import SeccionFoods from "@/ui/components/SeccionFoods/SeccionFoods";

export default function Foods () {

    return (
        <>
        {/* <AnimatedSvgBackground />  */}
        <main>
            <Hero />
        </main>
        <SeccionFoods />
        <CardSeccion />
    </>
    )
}   