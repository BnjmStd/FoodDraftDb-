import "./dialog.css"
import { IoMdClose } from 'react-icons/io';
import { useRef } from 'react';

export default function Dialog({
    title = '#',
    children,
    isOpen,
    isSetOpen
}: {
    title: string
    children: React.ReactNode
    isOpen: boolean
    isSetOpen: React.Dispatch<React.SetStateAction<boolean>>
}) {
    const dialogRef = useRef<HTMLDialogElement | null>(null)
    if (isOpen && dialogRef.current) dialogRef.current.showModal()

    const closeDialog = () => {
        dialogRef.current?.close()
        isSetOpen(false)
    }

    return (
        <dialog ref={dialogRef} className="dialog rounded-md p-5 bg-neutral-500">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-center text-white">{title}</h2>
                <button 
                    onClick={closeDialog} 
                    className="p-2 bg-red-500 
                    text-white rounded hover:bg-red-600">
                    <IoMdClose />
                </button>
            </div>
            {children}
        </dialog>
    )
}