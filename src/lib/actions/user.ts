"use server"

const bcrypt = require('bcryptjs');

import prisma from "./prisma"

import {
    cache
} from "react"

import {
    createSession,
    verifySession
} from "./session"

import {
    redirect
} from "next/navigation"
import { User } from "@prisma/client";

export const createNewAdmin = async (prev, formData: FormData) => {

    const errors: {
        [key: string]: string
    } = {}

    // email

    const email = formData.get('email') as string

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        errors.email = 'Invalid email format or missing email'
    }

    // password

    const pwd = formData.get('password') as string | null

    if (!pwd || pwd.length < 8) {
        errors.password = 'Password must be at least 8 characters long'
    }

    // country 

    const country = formData.get('country') as string

    if (!country || country.length < 1) {
        errors.country = 'country must be selected'
    }

    // type

    const type = formData.get('type') as string

    if (!type) {
        errors.type = 'type selected pls'
    }

    // name

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

    const salt = await bcrypt.genSalt(5);
    const hashedPwd = await bcrypt.hash(pwd, salt)

    const newUser = await prisma.user.create({
        data: {
            name: name,
            country: country,
            email: email,
            password: hashedPwd,
            type: type
        }
    })

    return {
        success: true,
        message: 'Usuario agregado' + newUser.name
    }

}

export const createNew = async (prev, formData: FormData) => {

    const errors: {
        [key: string]: string
    } = {}

    // email

    const email = formData.get('email') as string

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        errors.email = 'Invalid email format or missing email'
    }

    // password

    const pwd = formData.get('password') as string | null
    const pwdConfirm = formData.get('confirmPassword') as string | null

    if (!pwd || pwd.length < 8) {
        errors.password = 'Password must be at least 8 characters long'
    }

    if (pwd !== pwdConfirm) {
        errors.confirmPassword = 'Passwords do not match'
    }

    // checkbox

    const checkBox = formData.get('check') as string | null

    if (checkBox !== 'checked') {
        errors.checkBox = 'not checked'
    }

    if (!checkBox) {
        errors.checkBox = 'not checked'
    }

    if (Object.keys(errors).length > 0) {

        return {
            success: false,
            errors
        }
    }

    const salt = await bcrypt.genSalt(5);
    const hashedPwd = await bcrypt.hash(pwd, salt)

    const newUser = await prisma.user.create({
        data: {
            name: '',
            country: '',
            email: email,
            password: hashedPwd,
            type: ''
        }
    })

    // create session

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

    const errors: { [key: string]: string } = {};

    // id
    const formDataId = formData.get('id');

    const id = formDataId !== null ? Number(formDataId) : 0;
    
    if (isNaN(id) || id === 0) {
        errors.id = 'invalid id';
    }

    // email
    const email = formData.get('email') as string;
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        errors.email = 'Invalid email format or missing email';
    }

    // password 
    const pwd = formData.get('password') as string;
    if (pwd && pwd.length < 8) {
        errors.password = 'Password must be at least 8 characters long';
    }

    const newPwd = formData.get('newpassword') as string;
    if (pwd && pwd.length < 8) {
        errors.passwordNew = 'Password must be at least 8 characters long';
    }

    // country
    const country = formData.get('country') as string;
    if (!country || country.length < 1) {
        errors.country = 'Country must be selected';
    }

    // type
    const type = formData.get('type') as string;
    if (!type) {
        errors.type = 'Type must be selected';
    }

    // name
    const name = formData.get('name') as string;
    if (!name || name.length < 3) {
        errors.name = 'Name must be at least 3 characters long';
    }

    // Check for errors
    if (Object.keys(errors).length > 0) {
        return {
            success: false,
            errors
        };
    }

    /*const currentForm = {   
        id: id,
        name: name,
        email: email,
        password: pwd,
        newPassword: newPwd,
        country: country,
        type: type
    }*/

    const existingUser = await prisma.user.findUnique({
        where: { id },
    });

    if (!existingUser) {
        return {
            success: false,
            errors: { general: 'User not found' },
        };
    }

    // Validar la contraseña antigua
    const isPasswordValid = await bcrypt.compare(pwd, existingUser.password);
    if (!isPasswordValid) {
        return {
            success: false,
            errors: { password: 'Old password is incorrect' },
        };
    }

    const updatedData = {
        name: name,
        country: country,
        email: email,
        password: pwd,
        type: type,
        updatedAt: new Date(),
    }

    // Si se proporcionó una nueva contraseña, hash y actualizarla
    if (newPwd) {
        const salt = await bcrypt.genSalt(5);
        const hashedNewPassword = await bcrypt.hash(newPwd, salt);
        updatedData.password = hashedNewPassword
    }

    // Actualizar el usuario en la base de datos
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