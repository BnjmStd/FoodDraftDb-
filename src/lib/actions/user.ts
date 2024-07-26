"use server"

import prisma from "./prisma"
import { validateEmail } from '@/lib/utils/helper'
import { redirect } from "next/navigation"

interface UserType {
    ADMIN: "admin";
    COLLABORATOR: "collaborator";
    COMPANY: "company";
    NORMAL: "normal";
}

export const createNew = async (formData: FormData) => {
    const email = formData.get('email')?.toString()
    const password = formData.get('password')?.toString()
    const check = formData.get('check')?.toString()
    const confirmPassword = formData.get('confirmPassword')?.toString()
    const country = 'chile'

    if (!email || !password || !check || !country) return
    if (!validateEmail(email)) return 
    if (password !== confirmPassword) return 
    if (check === undefined) return

    const newCompanie = await prisma.user.create({
        data: {
            name: "?",
            country: country,
            email: email,
            password: password,
            type: "admin"
        }
    })

    console.log(newCompanie)

    redirect("/")
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