'use client'

/* icons */
import { IoReload } from "react-icons/io5"
import { IoIosAddCircle } from "react-icons/io"

/* components */
import Spinner from "@/ui/components/loading/Spinner"
import Table from "@/ui/components/table/Table"
import Dialog from "@/ui/components/dialog/Dialog"
import SearchAdmin from "@/ui/components/search/searchAdmin"

/* forms */
import { UserForm } from "@/ui/components/forms/createNewUserForm"

/* actions */
import {
    User
} from "@prisma/client"

import { getAllUser } from "@/lib/actions/user"

/* react */
import React, {
    useState,
    use,
    Suspense,
    useEffect
} from 'react'

import { ErrorContext } from "@/lib/context/error"
import { BsSearchHeart } from "react-icons/bs"
import { FaEdit, FaTrashAlt } from "react-icons/fa"
import { RiH1 } from "react-icons/ri"
import { getUser } from "./Users"

export function Users() {
    
    const users = use(getUser());

    if ('error' in users && users.error) {
        return <h1>Error</h1>;
    }

    return (
        <ul>
            {Array.isArray(users) && users.map(user => (
                <li key={user.id}>{user.name}</li>
            ))}
        </ul>
    );
}

export default function Page() {
    return (
        <Suspense fallback={<h1>Loading...</h1>}>
            <Users />
        </Suspense>
    );
}
