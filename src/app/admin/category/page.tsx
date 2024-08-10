'use client'

/* icons */
import { IoReload } from "react-icons/io5"
import { IoIosAddCircle } from "react-icons/io"

/* components */
import Spinner from "@/ui/components/loading/Spinner"
import Table from "@/ui/components/table/Table"
import Dialog from "@/ui/components/dialog/Dialog"
import SearchAdmin from "@/ui/components/search/searchAdmin"

/* forms */
import { FoodForm } from "@/ui/components/forms/createNewFoodForm"

/* actions */
import { 
    Category, 
} from "@prisma/client"

import { getAllCategory } from "@/lib/actions/category"

/* react */
import React, {
    useEffect,
    useState
} from 'react'


export default function Page () {
    const [categorys, setCategorys] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const column = ["name"]

    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const reloadData = async () => {
        const fetchedCategorys = await getAllCategory();
        setCategorys(fetchedCategorys);
        setLoading(false);
    }

    useEffect(() => {
        const fetchFoods = async () => {
            const fetchedCategorys = await getAllCategory();
            setCategorys(fetchedCategorys);
            setLoading(false);
        };

        fetchFoods();

    }, []);

    if (loading) return <Spinner />

    return (
        <>
            <Dialog 
                isOpen={isDialogOpen} 
                isSetOpen={setIsDialogOpen} 
                title="New Category" 
            >
                <FoodForm />
            </Dialog>

            <div className="flex flex-col gap-2">
                <main className="flex flex-row gap-2 justify-between">
                    <SearchAdmin />
                    <div className="flex items-center">
                        <button
                            className="p-2 hover:bg-gray-200 rounded-md"
                            onClick={reloadData}
                        >
                            <IoReload />
                        </button>
                        <button
                            className="p-2 hover:bg-gray-200 rounded-md"
                            onClick={() => setIsDialogOpen(true)}
                        >
                            <IoIosAddCircle />
                        </button>
                    </div>
                </main>
                <footer className="flex-1">
                    {categorys.length === 0 ? (
                        <p>No foods found.</p>
                    ) : (
                        <Table
                            columns={column}
                            onEdit={() => { }}
                            data={categorys}
                        />
                    )}
                </footer>
            </div>
        </>
    );
}