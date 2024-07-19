'use client'

import CardSeccion from "@/ui/components/card/CardSeccion";
import SeccionFoods from "@/ui/components/SeccionFoods/SeccionFoods";
import HomeLayout from "@/ui/layout/HomeLayout";

export default function Foods() {

    return (
        <HomeLayout>
            <SeccionFoods />
            <CardSeccion />
        </HomeLayout>
    )
}   