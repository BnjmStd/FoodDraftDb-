'use client'

import { FaUser, FaHome } from "react-icons/fa"
import { BsNutFill } from "react-icons/bs"
import { IoLogOut } from "react-icons/io5"
import { MdFastfood, MdCategory } from "react-icons/md"
import { deleteSession } from "@/lib/actions/session"
import { useRouter } from "next/navigation"

import "./sidebar.css"

export default function Sidebar() {
    const router = useRouter()
    const color = 'black'

    const handleCick = (users : string) => {
        const path = users.toLowerCase() 
        router.push(`/admin/${path}`)
    }
 
    return (
        <div className="fixed left-0 top-0 bottom-0 w-16 bg-gray-200 
            flex flex-col items-center justify-between">
            <main className="flex flex-col gap-1">
                <Button 
                    icon={<FaHome color={`${color}`}  />} 
                    onClick={() => {handleCick('')}}
                    content="Home"
                />
                <Button 
                    icon={<FaUser color={`${color}`} />} 
                    onClick={() => {handleCick('users')}}
                    content="users"
                />
                <Button 
                    icon={<MdFastfood color={`${color}`} />} 
                    onClick={() => {handleCick('foods')}}
                    content="foods"
                />
                <Button 
                    icon={<MdCategory color={`${color}`} />} 
                    onClick={() => {handleCick('category')}}
                    content="category"
                />
            </main>
            <footer className="flex flex-col space-y-4 pb-5">
                <Button 
                    icon={<BsNutFill color={`${color}`} />} 
                    onClick={() => {handleCick('config')}}
                    content="config"
                />
                <Button 
                    icon={<IoLogOut color={`${color}`} />} 
                    onClick={() => deleteSession()} 
                    content="Logout"
                />
            </footer>
        </div>
    )
}

function Button({ 
    icon,
    onClick,
    content

}:{
    icon: JSX.Element
    onClick: () => void
    content: string
}) {
    return (
        <button onClick={onClick} 
        info-tooltip={content}
        className="relative icons hover:bg-slate-400 w-16 h-16 flex 
        items-center justify-center
        ">
            {icon}
        </button>
    )
}