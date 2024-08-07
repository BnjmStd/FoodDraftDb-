'use server'
import 'server-only'

import { SignJWT, jwtVerify } from "jose";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

// conv el secret en un Uint8Array para la firma
const key = new TextEncoder().encode(process.env.JWT_SECRET)

const cookie = {
    name: 'session',
    options: {
        httpOnly: true,
        secure: true,
        sameSite: 'lax' as 'lax' | 'strict' | 'none',
        path: '/'
    },
    duration: 24 * 60 * 60 * 1000
}

export async function encrypt(payload: {}) {
    return new SignJWT(payload) // init new jwt 
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt() // currently time
        .setExpirationTime('1day')
        .sign(key)
}

export async function decrypt(session: string) {
    try {
        const { payload } = await jwtVerify(session, key, {
            algorithms: ['HS256']
        })

        return payload

    } catch (error) {
        return null
    }
}

export async function createSession(userId: string | null | number) {
    const expires = new Date(Date.now() + cookie.duration)
    const session = await encrypt({ userId, expires })

    cookies().set(cookie.name, session, {
        ...cookie.options,
        expires
    })

    return "/admin"
}

export async function verifySession() {
    const cookiep = cookies().get(cookie.name)?.value

    if (!cookiep) return 

    const session = await decrypt(cookiep)

    if (!session?.userId) {
        redirect('/login')
    }

    return { userId: session.userId }
}

export async function deleteSession() {
    cookies().delete(cookie.name)
    redirect('/')
}