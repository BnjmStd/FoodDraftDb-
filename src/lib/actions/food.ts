'use server'

import prisma from "./prisma";
import { redirect } from "next/navigation"

export const getAllFood = () => {

    return prisma.food.findMany()
        .then(foods => foods)
        .catch(error => {
            console.error('Error fetching food:', error)
            return []
        })
}

export const createNewFood = async (formData: FormData) => {
    
    const name = formData.get('name')?.toString() || '';
    const description = formData.get('description')?.toString() || '';
    const userId = Number(formData.get('userId'));

    if (!name || !description || !userId) {
        throw new Error('All fields are required');
    }

    const newFood = await prisma.food.create({
        data: {
            name,
            description,
            userId,
        },
    });

    console.log(newFood);

    redirect("/admin");
}