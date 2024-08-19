import { newCategory } from "@/lib/actions/category"
import { AdminContext } from "@/lib/context/admin"
import { ErrorContext } from "@/lib/context/error"
import { use, useActionState, useEffect } from "react"

export default function CategoryForm() {

    const { setCategoryData } = use(AdminContext)
    const { setIsSetOpen } = use(ErrorContext)
    const [state, action, isPending] = useActionState(newCategory, null)
    
    useEffect(() => {
        if (state?.success && state.message) {
            setCategoryData(prevState => [...prevState, state?.message]);
            setIsSetOpen(false)
        }
    }, [state?.success, state?.message]);

    return (
        <form action={action} className="rounded-lg grid gap-1  grid-cols-1">
            <div className="">
                <label
                    htmlFor="name"
                    className="block text-gray-200 font-bold mb-2"
                >
                    Name
                </label>
                <input
                    type="text"
                    id="name"
                    placeholder="Arroz graneado ..."
                    name="name"
                    className="w-full px-3 py-2 border rounded-md focus:outline-none 
                    focus:ring focus:ring-indigo-200"
                />
            </div>
            {state?.errors?.name &&
                    <p className='error font-bold'>{state.errors.name}</p>}
            <div className="flex justify-center ">
                <button onClick={() => {}} type="submit" className="w-full overflow-hidden px-4 py-2 bg-blue-500 text-white 
                font-bold rounded-md hover:bg-blue-600 focus:outline-none focus:ring 
                focus:ring-blue-200">
                    Submit
                </button>
            </div>
        </form>
    )
}