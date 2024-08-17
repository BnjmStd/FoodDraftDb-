import "./dialog.css"

import { IoMdClose } from 'react-icons/io';

import { 
    use, 
    useEffect, 
    useRef 
} from 'react';

import { ErrorContext } from "@/lib/context/error";
import { AdminContext } from "@/lib/context/admin";

export default function Dialog({
    title = '#',
    children,
}: {
    title: string
    children: React.ReactNode
}) {
    const dialogRef = useRef<HTMLDialogElement | null>(null)
    
    const { isSetOpen, setIsSetOpen } = use(ErrorContext)
    const { setIsSelected } = use(AdminContext)

    useEffect(() => {
        if (isSetOpen && dialogRef.current) {
            dialogRef.current.showModal();
        } else if (dialogRef.current) {
            dialogRef.current.close();
        }
    }, [isSetOpen]);

    const closeDialog = () => {
        setIsSetOpen(false);
        setIsSelected(undefined)
    };

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