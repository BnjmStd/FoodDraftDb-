'use server'

import { cache } from "react"
import { verifySession } from "./session"
import prisma from "./prisma"

export const getAllCategory = cache(
    async () => {

        try {
            const categorys = await prisma.category.findMany()
            if (categorys.length > 0) {

                return { ok: true, data: categorys }
            } else {

                return { error: true, message: 'No category found' }
            }
        } catch (error) {

            return { error: true, message: 'Error fetching category' }
        }
    }
);

export const deleteCategory = async (categoryId: number) => {
    try {

        const userCurrentId = await verifySession()

        if (!userCurrentId) return { error: true, message: 'Error al comprobar id' }

        const deletedCategory = await prisma.category.delete({
            where: {
                id: categoryId
            }
        });

        return { ok: true, data: deletedCategory };

    } catch (error) {

        return { error: true, message: 'Error al eliminar la categoria' };
    }
}

export const newCategory = async (prev, formData: FormData) => {
    
    const isUser = await verifySession()

    if (!isUser) {
        return { error: true, message: 'No user session found' }
    }
    
    const errors: {
        [key: string]: string
    } = {}

    const name = formData.get('name') as string

    if (!name || name.length < 3) {
        errors.name = 'name must be at least 3 characters long'
    }

    if (Object.keys(errors).length > 0) {

        return {
            success: false,
            errors
        }
    }

    try {
        const category = await prisma.category.create({
            data: {
                name: name
            },
        });

        return {
            success: true,
            message: {
                id: category.id,
                name: category.name
            }
        };

    } catch (error) {

        return {
            success: false,
            errors: { general: 'An error occurred while category create.' },
        };
    }
} 