import { use } from "react"
import { ErrorContext } from "@/lib/context/error"

const X = () => {

    const { error, setError, clearError } = use(ErrorContext)

    const addError = () => {
        setError('formError', 'Este es un mensaje de error.');
    };

    const removeError = () => {
        clearError('formError');
    };

    return (
        <div>
            {error['formError'] ? (
                <>
                    <p>{error['formError']}</p>
                    <button onClick={removeError}>Limpiar Error</button>
                </>
            ) : (
                <>
                    <p>No hay errores.</p>
                    <button onClick={addError}>Agregar Error</button>
                </>
            )}
        </div>
    );
}

export default X