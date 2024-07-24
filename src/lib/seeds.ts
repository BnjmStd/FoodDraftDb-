'use server'

import prisma from "./actions/prisma";

export const main = async () => {
    await prisma.foodCategory.deleteMany();
    await prisma.category.deleteMany();
    await prisma.food.deleteMany();
    await prisma.user.deleteMany();

    // Crear categorías primero
    const category1 = await prisma.category.create({
        data: {
            name: 'Fruits',
        },
    });

    const category2 = await prisma.category.create({
        data: {
            name: 'Citrus',
        },
    });

    // Crear usuario y alimentos, y asignarles categorías
    const user1 = await prisma.user.create({
        data: {
            name: 'Bnjmn AA VK',
            country: 'Chile',
            email: 'admin@admin',
            password: 'kk',
            type: 'admin',
            foods: {
                create: [
                    {
                        name: 'Apple',
                        description: 'A tasty fruit',
                        categories: {
                            create: [
                                { categoryId: category1.id },
                                { categoryId: category2.id },
                            ],
                        },
                    },
                    {
                        name: 'Banana',
                        description: 'A yellow fruit',
                        categories: {
                            create: [
                                { categoryId: category1.id },
                            ],
                        },
                    },
                ],
            },
        },
    });

    console.log({ user1, category1, category2 });
}