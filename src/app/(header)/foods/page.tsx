'use client'

import { getAllCategory } from "@/lib/actions/category";
import { ErrorContext } from "@/lib/context/error";
import CardSeccion from "@/ui/components/card/CardSeccion";
import { DropdownCategory, SearchFood } from "@/ui/components/SeccionFoods/SeccionFoods";
import { Category } from "@prisma/client";
import { use, useEffect, useState } from "react";

export default function FoodContent() {

    const [categories, setCategories] = useState<Category[]>([])

    const [loading, setLoading] = useState(true)

    const { setError } = use(ErrorContext)

    const fetchCategory = async () => {
        try {
            const response = await getAllCategory()

            if (response.error) {
                setError({
                    type: 'error',
                    message: response.message
                })
            }

            if (response.ok) {
                setCategories(response.data);
                setError({
                    type: 'info',
                    message: 'category ok'
                })
            }
        } catch (error) {
            setError({
                type: 'error',
                message: 'Algo salío mal'
            })
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchCategory()
    }, [])


    if (loading) return <div>Loading...</div>

    return (
        <div className="flex flex-col">
            <header className="flex flex-col items-center justify-center px-20">
                <span className="flex gap-2">
                    <DropdownCategory categories={categories} />
                    <SearchFood />
                </span>
            </header>
            <main>
                <CardSeccion categories={categories} loading={loading} />
            </main>
            <footer>
            </footer>
        </div>
    )
}