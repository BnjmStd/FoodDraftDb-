'use client'

/* icons */
import { IoReload } from "react-icons/io5"
import { IoIosAddCircle } from "react-icons/io"

/* components */
import Spinner from "@/ui/components/loading/Spinner"
import Dialog from "@/ui/components/dialog/Dialog"

/* forms */
import { FoodForm } from "@/ui/components/forms/createNewFoodForm"

import { getAllFood } from "@/lib/actions/food"

/* react */
import React, {
    use,
    useEffect,
    useState
} from 'react'

import SearchAdmin from "@/ui/components/input/search/searchAdmin"
import TableFood from "@/ui/components/table/TableFood"

import { AdminContext } from "@/lib/context/admin"
import { ErrorContext } from "@/lib/context/error"

export default function Page() {

    const [filtering, setFiltering] = useState<string>()

    const {
        foodData,
        setFoodData,
        setIsLoading,
        loading,
    } = use(AdminContext)

    const {
        setIsSetOpen,
        setError,
    } = use(ErrorContext)

    const filteredData = filtering
        ? foodData.filter(food =>
            food.name.toLowerCase().includes(filtering.toLowerCase()) ||
            food.id.toString().includes(filtering) ||
            food.description.toLowerCase().includes(filtering.toLowerCase())
        )
        : foodData;

    const reloadData = async () => {
        try {
            const response = await getAllFood()

            if (response.error) {
                setError({
                    type: 'error',
                    message: response.message
                })
            }

            if (response.ok) {
                setFoodData(response.data);
                setError({
                    type: 'info',
                    message: 'foods ok'
                })
            }
        } catch (error) {
            setError({
                type: 'error',
                message: 'Algo salío mal'
            })
        } finally {
            setIsLoading(false)
        }
    };

    useEffect(() => {
        reloadData()
    }, [])

    const column = ["id", "name", "description", "categories"]

    if (loading) return <Spinner />

    return (
        <>
            <Dialog
                title="Create New Foods"
            >
                <FoodForm />
            </Dialog>
            <div className="flex flex-col gap-2">
                <main className="flex flex-row gap-2 justify-between">
                    <SearchAdmin setFiltering={setFiltering} />
                    <div className="flex items-center">
                        <button
                            className="p-2 hover:bg-gray-200 rounded-md"
                            onClick={() => { }}
                        >
                            <IoReload />
                        </button>
                        <button
                            className="p-2 hover:bg-gray-200 rounded-md"
                            onClick={() => { setIsSetOpen(true) }}
                        >
                            <IoIosAddCircle />
                        </button>
                    </div>
                </main>
                <div className="overflow-x-auto p-1">
                    {filteredData.length === 0 ? (
                        <p>No Foods found.</p>
                    ) : (
                        <TableFood column={column} data={filteredData} />
                    )}
                </div>
            </div>
        </>
    );
}