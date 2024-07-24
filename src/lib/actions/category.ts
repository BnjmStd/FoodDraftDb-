'use server'

import prisma from "./prisma"

export const getAllCategory = () => {

    return prisma.category.findMany()
        .then(categorys => categorys)
        .catch(error => {
            console.error('Error fetching food:', error)
            return []
        })
}