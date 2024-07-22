'use client'

import CardSeccion from "@/ui/components/card/CardSeccion";
import Header from "@/ui/components/Header";
import SearchInputFoods from "@/ui/components/SeccionFoods/SeccionFoods";
import HomeLayout from "@/ui/layout/HomeLayout";

export default function Foods() {

    return (
        <HomeLayout>
            <div className="pt-40 border-2 rounded-md border-red-800">
                <Header />
            </div>
            <SearchInputFoods />
            <CardSeccion />
        </HomeLayout>
    )
}   