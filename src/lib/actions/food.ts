'use server'

import prisma from "./prisma";
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

export const createNewFood = async (prev, formData: FormData) => {

    const isUser = await verifySession();

    if (!isUser) {
        return { error: true, message: 'No user session found' };
    }

    console.log(isUser.userId)

    /* 
    
        const newFood = await prisma.food.create({
        data: {
            name,
            description,
            userId,
        },
    });

    */

    console.log(formData);

}