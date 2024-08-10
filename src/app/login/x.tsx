import { use } from "react"
import { ErrorContext } from "@/lib/context/error"

const X = () => {

    const { setError } = use(ErrorContext)

    const addError = () => {

        setError({
            message: 'This is an error message',
            type: 'error'
        })
        
        setError({ 
            message: 'This is an error message',
            type: 'warning'
        })

        setError({ 
            message: 'This is an error message',
            type: 'info'
        })

    }

    return (
        <>
            <button className="bg-red-600 px-3 rounded-md cursor-pointer
            hover:bg-red-400" onClick={addError}>Agregar Error</button>
        </>
    )
}

export default X