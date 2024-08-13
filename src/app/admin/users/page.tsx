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

export default function Page() {

    const { setError } = use(ErrorContext)
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const openDialog = () => setIsDialogOpen(true)

    const [data, setData] = useState<User[]>()
    const [search, setSearch] = useState<string | number | readonly string[] | undefined>()

    const column = ["email", "password"]

    useEffect(() => {
        const fetchUser = async () => {

            const res = await getAllUser()

            if (res.ok) {
                setError({
                    message: 'user ok!',
                    type: 'info'
                })
                setData(res.data)
            } else if (res.error) {
                setError({
                    message: res.message,
                    type: 'error'
                })
            }
        }

        fetchUser()

    }, [])


    const searchUser = () => {

        if (!search) return Promise.resolve()

        return fetch(`https://pokeapi.co/api/v2/pokemon/${search}`)
            .then(res => {
                if (res.ok) return res.json()
                return { error: true, message: 'no pokemon' }
            })
    }

    return (
        <>
            <Dialog
                isOpen={isDialogOpen}
                isSetOpen={setIsDialogOpen}
                title="Create New User"
            >
                <UserForm />
            </Dialog>

            <div className="flex flex-col gap-2">
                <main className="flex flex-row gap-2 justify-between">

                    <form action={() => { }} className="flex items-center justify-center">
                        <input
                            className="p-1 m-1 rounded-md border-neutral-700 border-2"
                            placeholder='banana@split.com'
                            value={search}
                            onChange={e => setSearch(e.target.value)} />
                        <button className="p-2 rounded-md bg-red-200 hover:bg-neutral-400">
                            <BsSearchHeart />
                        </button>
                    </form>

                    <div className="flex items-center">
                        <button
                            className="p-2 hover:bg-gray-200 rounded-md"
                            onClick={() => { }}
                        >
                            <IoReload />
                        </button>
                        <button
                            className="p-2 hover:bg-gray-200 rounded-md"
                            onClick={openDialog}
                        >
                            <IoIosAddCircle />
                        </button>
                    </div>

                </main>

                <footer className="flex-1">
                    <Suspense fallback={<Spinner />}>
                        {search
                            ? (
                                <ShowTable pokemonPromise={searchUser()} />
                            )
                            : (
                                <Table
                                    columns={column}
                                    onEdit={() => { }}
                                    data={data}
                                />
                            )}
                    </Suspense>
                </footer>
            </div>
        </>
    );
}

export const ShowTable = ({ pokemonPromise }) => {
    const pokemon = use(pokemonPromise)

    if (pokemon?.error) {
        return <div>Error: {pokemon.message}</div>
    }

    if (!pokemon) return

    return (
        <div>
            Resultado:
            <h3>{pokemon.name}</h3>
            <img src={pokemon.sprites.front_default} alt={pokemon.name} />
        </div>
    )
}