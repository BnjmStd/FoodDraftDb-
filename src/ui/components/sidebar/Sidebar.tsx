import { FaUser } from "react-icons/fa";
import { BsNutFill } from "react-icons/bs";
import { IoLogOut } from "react-icons/io5";
import { MdFastfood, MdCategory } from "react-icons/md";
import "./sidebar.css"
import { deleteSession } from "@/lib/actions/session";
export default function Sidebar({ 
    setContent 
}: {
    setContent: (content: string) => void 
}) {

    const color = 'pink'

    return (
        <div className="fixed left-0 top-0 bottom-0 w-16 bg-gray-800 
            flex flex-col items-center justify-between pt-5">
            <main className="flex flex-col space-y-4">
                <Button 
                    icon={<FaUser color={`${color}`} />} 
                    onClick={() => setContent('Usuarios')} 
                    content="User"
                />
                <Button 
                    icon={<MdFastfood color={`${color}`} />} 
                    onClick={() => setContent('Comida')}
                    content="Food"
                />
                <Button 
                    icon={<MdCategory color={`${color}`} />} 
                    onClick={() => setContent('Category')}
                    content="Category"     
                />
            </main>
            <footer className="flex flex-col space-y-4 pb-5">
                <Button 
                    icon={<BsNutFill color={`${color}`} />} 
                    onClick={() => setContent('Setting')}
                    content="Setting"
                />
                <Button 
                    icon={<IoLogOut color={`${color}`} />} 
                    onClick={() => deleteSession()} 
                    content="Logout"
                />
            </footer>
        </div>
    );
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