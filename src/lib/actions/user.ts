"use server"

import prisma from "./prisma"
import { validateEmail } from '@/lib/utils/helper'
import { redirect } from "next/navigation"

export const createNewAdmin = async (formData: FormData) => {
    console.log(formData)
}

/*
    const newCompanie = await prisma.user.create({
        data: {
            name: "?",
            country: country,
            email: email,
            password: password,
            type: "admin"
        }
    })

    // create session

    // redirect("/")
*/

export const createNew = async (prev, formData: FormData) => {
    try {
        const errors: { 
            [key: string]: string 
        } = {}

        // email

        const email = formData.get('email') as string | null

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

        return { success: true }

    } catch (error) {

        return {
            success: false,
            error: "an error occurred."
        }
    }
}

export const login = async (formData: FormData) => {

    const email = formData.get('floating_email')?.toString()
    const password = formData.get('floating_password')?.toString()

    // Buscar el usuario por email
    const user = await prisma.user.findUnique({
        where: { email: email },
    });

    if (!user) {
        throw new Error('Usuario no encontrado');
    }

    // Verificar la contraseña
    //const isPasswordValid = await bcrypt.compare(password, user.password);

    //if (!isPasswordValid) {
    //throw new Error('Contraseña incorrecta');
    //}

    // Generar un token JWT
    //const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });
    console.log('login')
    return {
        user,
        //token,
    };
}

export const getAllUser = () => {
    return prisma.user.findMany()
        .then(users => users)
        .catch(error => {
            console.error('Error fetching users:', error);
            return [];
        });
};