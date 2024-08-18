'use server'

import prisma from "./prisma";
import { redirect } from "next/navigation"
import { verifySession } from "./session";

export const getAllFood = async () => {

    const isUser = await verifySession();

    if (!isUser) {
        
        return { error: true, message: 'No user session found' };
    }

    try {

        const foods = await prisma.food.findMany();

        if (foods.length > 0) {

            return { ok: true, data: foods };

        } else {

            return { error: true, message: 'No foods found' };
        }

    } catch (error) {

        return { error: true, message: 'Error fetching foods' };
    }
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