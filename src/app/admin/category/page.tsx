'use client'

/* icons */
import { IoReload } from "react-icons/io5"
import { IoIosAddCircle } from "react-icons/io"

/* components */
import Spinner from "@/ui/components/loading/Spinner"
import Dialog from "@/ui/components/dialog/Dialog"
import SearchAdmin from "@/ui/components/input/search/searchAdmin"

import { getAllCategory } from "@/lib/actions/category"

/* react */
import React, {
    use,
    useEffect,
    useState
} from 'react'
import { AdminContext } from "@/lib/context/admin"
import { ErrorContext } from "@/lib/context/error"
import CategoryForm from "@/ui/components/forms/createNewCategoryForm"
import TableCategory from "@/ui/components/table/TableCategory"

export default function Page () {
    const [filtering, setFiltering] = useState<string>()

    const {
        categoryData,
        setCategoryData,
        setIsLoading,
        loading,
    } = use(AdminContext)

    const {
        setIsSetOpen,
        setError,
    } = use(ErrorContext)

    const reloadData = async () => {
        try {
            const response = await getAllCategory()

            if (response.error) {
                setError({
                    type: 'error',
                    message: response.message
                })
            }

            if (response.ok) {
                setCategoryData(response.data);
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
            setIsLoading(false)
        }
    };

    useEffect(() => {
        reloadData()
    }, [])

    const filteredData = filtering
        ? categoryData.filter(category =>
            category.name.toLowerCase().includes(filtering.toLowerCase()) ||
            category.id.toString().includes(filtering)
        )
        : categoryData;

    const column = ["id", "name", "actions"]

    if (loading) return <Spinner />

    return (
        <>
            <Dialog 
                title="New Category" 
            >
                <CategoryForm />
            </Dialog>

            <div className="flex flex-col gap-2">
                <main className="flex flex-row gap-2 justify-between">
                    <SearchAdmin setFiltering={setFiltering} />
                    <div className="flex items-center">
                        <button
                            className="p-2 hover:bg-gray-200 rounded-md"
                            onClick={reloadData}
                        >
                            <IoReload />
                        </button>
                        <button
                            className="p-2 hover:bg-gray-200 rounded-md"
                            onClick={() => setIsSetOpen(true)}
                        >
                            <IoIosAddCircle />
                        </button>
                    </div>
                </main>
                <div className="overflow-x-auto p-1">
                    {filteredData.length === 0 ? (
                        <p>No category found.</p>
                    ) : (
                        <TableCategory column={column} data={filteredData} />
                    )}
                </div>
            </div>
        </>
    );
}