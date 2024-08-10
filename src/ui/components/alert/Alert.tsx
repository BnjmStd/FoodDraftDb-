'use client'

import { ErrorContext } from "@/lib/context/error";
import { use } from "react";
import { IoMdClose } from "react-icons/io";

export default function Alert() {

    const {
        errors,
        clearError
    } = use(ErrorContext)

    const handleClose = (id: string) => {
        clearError(id);
    }

    const colors = {
        error: 'red',
        warning: 'yellow',
        info: 'blue'
    };

    return (
        <div className="fixed right-3 bottom-3 flex flex-col items-center justify-between  gap-2">
            {errors.map(error => (
                <div
                    key={error.id}
                    className={`bg-${colors[error.type]}-500
                        px-3 py-2 rounded-md flex items-center justify-between 
                        transition-transform hover:scale-105 cursor-pointer`}
                >
                    <span>{error.message}</span>
                    <IoMdClose onClick={() => handleClose(error.id!)} className="ml-2 cursor-pointer" />
                </div>
            ))}
        </div>
    )
}