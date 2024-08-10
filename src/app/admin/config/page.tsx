import { main } from "@/lib/seeds";
import { IoIosAddCircle } from "react-icons/io";

export default function Page () {
    return (
        <>
            <h1>Config</h1>

            <form action={main} className="flex justify-center items-center">
                <button
                    className="rounded-md bg-green-300 p-2 hover:bg-green-500"
                    type="submit"><IoIosAddCircle /></button>
            </form>

        </>
    )
}