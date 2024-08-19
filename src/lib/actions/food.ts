'use server'

import { validateFoodForm } from "../helper";
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

    const prevFood = {
        name: formData.get('name') as string,
        description: formData.get('description') as string,
        categories: {
          create: [
            {
              category: {
                connect: {
                  id: Number(formData.get('categoryId')),
                },
              },
            },
          ],
        },
        userId: Number(isUser.userId),
      };

    const errors = validateFoodForm(prevFood);

    if (Object.keys(errors).length > 0) return { success: false, errors }

    try {
        const newFood = await prisma.food.create({
            data:
                prevFood
        })

        return {
            success: true,
            message: newFood
        };

    } catch (error) {
        console.log(error)
        return {
            success: false,
            errors: { general: 'An error occurred while food create.' },
        };
    }
}

export const deleteFood = async (foodId: number) => {
    try {

        const userCurrentId = await verifySession()

        if (!userCurrentId) return { error: true, message: 'Error al comprobar id' }

        const deletedFood = await prisma.food.delete({
            where: {
                id: foodId
            }
        });

        return { ok: true, data: deletedFood };

    } catch (error) {

        return { error: true, message: 'Error al eliminar el food' };
    }
}