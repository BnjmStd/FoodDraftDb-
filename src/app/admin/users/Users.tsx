'use server'

import { getAllUser } from "@/lib/actions/user";

export async function getUser() {
    const res = await getAllUser();

    if (res.ok) {
        return res.data;

    } else if (res.error) {
        return { error: true, message: 'No user session found' };
    }

    return { error: true, message: 'No user session found' };
}
