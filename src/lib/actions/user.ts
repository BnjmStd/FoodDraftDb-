"use server"

const bcrypt = require('bcryptjs');

import prisma from "./prisma"

import { cache } from "react"

import {
    createSession,
    verifySession
} from "./session"

import {
    redirect
} from "next/navigation"

import { validateUserForm } from "../helper";


const typeUser: 'User' | 'Admin' = 'User'

export const createNewAdmin = async (prev, formData: FormData) => {

    const dataPrevUser = {
        name: formData.get('name') as string,
        country: formData.get('country') as string,
        email: formData.get('email') as string,
        password: formData.get('password') as string,
        type: formData.get('type') as string,
    }

    const errors = validateUserForm(dataPrevUser);

    if (Object.keys(errors).length > 0) return { success: false, errors }

    const salt = await bcrypt.genSalt(5);
    const hashedPwd = await bcrypt.hash(dataPrevUser.password, salt)

    try {
        const newUser = await prisma.user.create({
            data: {
                ...dataPrevUser,
                password: hashedPwd
            }
        })

        return {
            success: true,
            message: newUser
        }

    } catch (error) {

        return {
            success: true,
            message: {
                error: error
            }
        }
    }
}

export const createNew = async (prev, formData: FormData) => {

    const dataPrevUser = {
        email: formData.get('email') as string,
        password: formData.get('password') as string
    }

    const errors = validateUserForm({
        ...dataPrevUser,
        confirmPassword: formData.get('confirmPassword') as string,
        checkBox: formData.get('check') as string
    });

    if (Object.keys(errors).length > 0) {
        return {
            success: false,
            errors
        }
    }

    const salt = await bcrypt.genSalt(5);
    const hashedPwd = await bcrypt.hash(dataPrevUser.password, salt)

    const newUser = await prisma.user.create({
        data: {
            ...dataPrevUser,
            password: hashedPwd,
            name: '',
            country: '',
            type: typeUser
        }
    })

    const route = await createSession(newUser.id)
    redirect(`${route}`)
}

export const login = async (prev, formData: FormData) => {

    const errors: {
        [key: string]: string
    } = {}

    const email = formData.get('floating_email')?.toString()
    const password = formData.get('floating_password')?.toString()

    // Validación del email
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        errors.form = 'Invalid email format or missing email'
    }

    // Validación de que el usuario existe
    const user = await prisma.user.findUnique({
        where: { email: email },
    });

    // Validación de la contraseña
    if (user && password) {
        const isPasswordValid = await bcrypt.compare(password, user.password)

        if (!isPasswordValid) {
            errors.form = 'incorrect data'
        }
    }

    if (!user) {
        errors.form = 'incorrect data'
    }

    if (Object.keys(errors).length > 0) {
        return {
            success: false,
            errors
        }
    }

    // create session
    const route = await createSession(user!.id)

    redirect(`${route}`)
}

export const getAllUser = cache(
    async () => {

        const isUser = await verifySession();

        if (!isUser) {
            return { error: true, message: 'No user session found' };
        }

        try {
            const users = await prisma.user.findMany();
            if (users.length > 0) {
                return { ok: true, data: users };
            } else {
                return { error: true, message: 'No users found' };
            }
        } catch (error) {
            return { error: true, message: 'Error fetching users' };
        }
    }
);

export const msgWelcome = async () => {

    const res = await verifySession()

    return prisma.user.findUnique({
        where: {
            id: res?.userId as number,
        },
        select: {
            email: true,
        },
    })
        .then(user => user?.email)
        .catch(error => {
            console.error('Error fetching user email:', error);
            return null;
        });

}

export const deleteUserById = async (userId: number) => {
    try {

        const userCurrentId = await verifySession()

        if (!userCurrentId) return { error: true, message: 'Error al comprobar id' }

        if (userId == userCurrentId.userId) {
            return { error: true, message: 'No te puedes eliminar a ti mismo!' };
        }

        const deletedUser = await prisma.user.delete({
            where: {
                id: userId
            }
        });

        return { ok: true, data: deletedUser };

    } catch (error) {
        return { error: true, message: 'Error al eliminar el usuario' };
    }
}

export const searchById = async (userId: number) => {
    try {
        if (typeof userId !== 'number' || isNaN(userId)) {

            return { error: true, message: 'ID de usuario no válido.' }
        }

        const userCurrentId = await verifySession()

        if (!userCurrentId) {

            return { error: true, message: 'Error al comprobar ID de sesión.' }
        }

        const user = await prisma.user.findUnique({
            where: { id: userId },
        })

        if (!user) {

            return { error: true, message: `Usuario con ID ${userId} no encontrado.` };
        }

        return { ok: true, data: user };

    } catch (error) {

        return { error: true, message: 'Error inesperado al buscar el usuario.' };
    }
}

export const editUser = async (prev, formData: FormData) => {

    const formDataId = formData.get('id');

    const id = formDataId !== null ? Number(formDataId) : 0;

    const dataPrevUser = {
        name: formData.get('name') as string,
        country: formData.get('country') as string,
        email: formData.get('email') as string,
        password: formData.get('password') as string,
        newPassword: formData.get('newpassword') as string,
        type: formData.get('type') as string
    }

    const errors = validateUserForm(dataPrevUser);

    if (isNaN(id) || id === 0) {
        errors.id = 'invalid id';
    }

    // Check for errors
    if (Object.keys(errors).length > 0) {
        return {
            success: false,
            errors
        };
    }

    const existingUser = await prisma.user.findUnique({
        where: { id },
    });

    if (!existingUser) {
        return {
            success: false,
            errors: { general: 'User not found' },
        };
    }

    const isPasswordValid = await bcrypt.compare(dataPrevUser.password, existingUser.password);

    if (!isPasswordValid) {
        return {
            success: false,
            errors: { password: 'Old password is incorrect' },
        };
    }

    const updatedData = {
        name: dataPrevUser.name,
        country: dataPrevUser.country,
        email: dataPrevUser.email,
        password: dataPrevUser.password,
        type: dataPrevUser.type,
        updatedAt: new Date(),
    }

    if (dataPrevUser.newPassword) {
        const salt = await bcrypt.genSalt(5);
        const hashedNewPassword = await bcrypt.hash(dataPrevUser.newPassword, salt);
        updatedData.password = hashedNewPassword
    }

    try {
        const updatedUser = await prisma.user.update({
            where: { id },
            data: updatedData,
        });

        return {
            success: true,
            message: 'Usuario actualizado: ' + updatedUser.name,
        };

    } catch (error) {
        return {
            success: false,
            errors: { general: 'An error occurred while updating the user.' },
        };
    }
}