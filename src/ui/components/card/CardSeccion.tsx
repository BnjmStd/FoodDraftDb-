'use client'

import Spinner from "../loading/Spinner";
import CardBase from "./CardBase";
import { Category } from "@prisma/client";

const COLORS = [
    'bg-red-900',
    'bg-yellow-900',
    'bg-green-900',
    'bg-blue-900',
    'bg-indigo-900',
    'bg-purple-900',
    'bg-pink-900',
    'bg-orange-900',
    'bg-blue-900',
    'bg-green-900',
    'bg-yellow-900',
    'bg-red-900',
    'bg-gray-900',
    'bg-purple-900',
    'bg-pink-900',
];

const IMAGES = [
    'https://user-images.githubusercontent.com/2805249/64069899-8bdaa180-cc97-11e9-9b19-1a9e1a254c18.png',
];

export default function CardSeccion({
    categories,
    loading
}: {
    categories: Category[]
    loading: boolean
}) {

    const updatedFoods = categories.map(category => ({
        ...category,
        image: IMAGES[Math.floor(Math.random() * IMAGES.length)],
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
    }));

    if (loading) return <Spinner />

    return (
        <div className="flex flex-wrap items-center justify-center">
            <div className="p-2 flex flex-wrap items-center justify-center text-pink">
                {updatedFoods.map(({ id, image, name, color }) => (
                    <CardBase
                        key={id}
                        id={id}
                        image={image}
                        name={name}
                        description={'description'}
                        color={color}
                    />
                ))}
            </div>
        </div>
    );
}
