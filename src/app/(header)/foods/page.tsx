'use client'

import CardSeccion from "@/ui/components/card/CardSeccion";
import SearchInputFoods from "@/ui/components/SeccionFoods/SeccionFoods";

export default function FoodContent() {
    return (
        <div className="flex">
            <FilterArea />
            <CardSeccion />
        </div>
    )
}

const FilterArea = () => {
    return (
        <div className="p-4 bg-white rounded-lg shadow-md flex-col">
            <div className="flex flex-col justify-center items-start">
                <SearchInputFoods />
            </div>

            <div className="mt-4 flex justify-end">
                <button
                    className="bg-indigo-600 text-white px-4 py-2 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Apply Filters
                </button>
            </div>
        </div>
    );
};