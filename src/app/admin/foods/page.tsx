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
    Food 
} from "@prisma/client"

import { getAllFood } from "@/lib/actions/food"

/* react */
import React, {
    useEffect,
    useState
} from 'react'

export default function Page () {
    const [foods, setFoods] = useState<Food[]>([]);
    const [loading, setLoading] = useState(true);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const reloadData = async () => {
        const fetchedFoods = await getAllFood();
        setFoods(fetchedFoods);
        setLoading(false);
    }

    useEffect(() => {
        const fetchFoods = async () => {
            const fetchedUsers = await getAllFood();
            setFoods(fetchedUsers);
            setLoading(false);
        };

        fetchFoods();

    }, []);

    if (loading) return <Spinner />

    const column = ["name", "description", "categories"]

    const openDialog = () => setIsDialogOpen(true)

    return (
        <>
            <Dialog 
                isOpen={isDialogOpen} 
                isSetOpen={setIsDialogOpen} 
                title="Create New Foods" 
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
                            onClick={openDialog}
                        >
                            <IoIosAddCircle />
                        </button>
                    </div>
                </main>
                <footer className="flex-1">
                    {foods.length === 0 ? (
                        <p>No foods found.</p>
                    ) : (
                        <Table
                            columns={column}
                            onEdit={() => { }}
                            data={foods}
                        />
                    )}
                </footer>
            </div>
        </>
    );
}