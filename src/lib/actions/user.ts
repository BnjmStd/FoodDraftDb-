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

export const createNewAdmin = async (formData: FormData) => {
    console.log(formData)
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

        const isUser = await verifySession()

        return prisma.user.findMany()
            .then(users => users)
            .catch(error => {
                console.error('Error fetching users:', error);
                return [];
            });
    }

)

export const deleteUserById = async (userId: number) => {

    try {
        console.log('hola')
        const deletedUser = await prisma.user.delete({
            where: {
                id: userId
            }
        });

        console.log('Usuario eliminado:', deletedUser);

    } catch (error) {

        console.error('Error al eliminar el usuario:', error);

    }

}