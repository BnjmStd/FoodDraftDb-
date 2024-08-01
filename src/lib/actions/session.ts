import { SignJWT, jwtVerify } from "jose";
import { redirect } from "next/dist/server/api-utils";
import { cookies } from "next/headers";

// conv el secret en un Uint8Array para la firma
const key = new TextEncoder().encode(process.env.JWT_SECRET) 

const cookie = {
    name: 'session',
    options: {
        httpOnly: true, 
        secure: true,
        sameSite: 'lax',
        path: '/'
    },
    duration: 24 * 60 * 60 * 1000
}

export async function encrypt (payload) {
    return new SignJWT(payload) // init new jwt 
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt() // currently time
        .setExpirationTime('1day')
        .sign(key)
}

export async function decrypt(session) {
    try {
        const { payload } = await jwtVerify(session, key, {
            algorithms: ['HS256']
        })
        
        return payload 

    } catch (error) {
        return null
    }
}

export async function createSession(userId) {
    const expires = new Date(Date.now() + cookie.duration)
    const session = await encrypt({ userId, expires})

    cookies().set(cookie.name, session, {...cookie.options, expires })
    redirect('/admin')
}

export async function varifySession() {
    
}

export async function deleteSession() {
    
}