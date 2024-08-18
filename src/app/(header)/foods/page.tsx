'use client'

import CardSeccion from "@/ui/components/card/CardSeccion";
import SearchInputFoods from "@/ui/components/SeccionFoods/SeccionFoods";
import { useState } from "react";

export default function FoodContent() {
    return (
        <div className="flex flex-col">
            <FilterArea />
            <CardSeccion />
        </div>
    )
}

const FilterArea = () => {
    const [category, setCategory] = useState('');
    const [priceRange, setPriceRange] = useState([0, 100]);

    const applyFilters = () => {
        console.log('Filtros aplicados:', { category, priceRange });
    };

    return (
        <div className="p-4 bg-white rounded-lg shadow-md ">
            <div className="flex flex-col justify-center items-start">
                <SearchInputFoods />
                <div>
                    <label className="block text-sm font-medium text-gray-700">Category</label>
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    >
                        <option value="">All Categories</option>
                        <option value="electronics">Electronics</option>
                        <option value="fashion">Fashion</option>
                        <option value="home">Home</option>
                        <option value="beauty">Beauty</option>
                    </select>
                </div>

                <div className="flex flex-col space-y-4">
                    <label className="block text-sm font-medium text-gray-700">Price Range</label>
                    <div className="flex space-x-2">
                        <input
                            type="number"
                            value={priceRange[0]}
                            onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            placeholder="Min"
                        />
                        <input
                            type="number"
                            value={priceRange[1]}
                            onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            placeholder="Max"
                        />
                    </div>
                </div>
            </div>

            <div className="mt-4 flex justify-end">
                <button
                    onClick={applyFilters}
                    className="bg-indigo-600 text-white px-4 py-2 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Apply Filters
                </button>
            </div>
        </div>
    );
};