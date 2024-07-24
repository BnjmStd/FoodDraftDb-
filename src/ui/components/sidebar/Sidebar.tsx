import { FaUser } from "react-icons/fa";
import { BsNutFill } from "react-icons/bs";
import { IoLogOut } from "react-icons/io5";
import { MdFastfood, MdCategory } from "react-icons/md";

export default function Sidebar({ 
    setContent 
}: {
    setContent: (content: string) => void 
}) {
    return (
        <div className="fixed left-0 top-0 bottom-0 w-16 bg-gray-800 flex flex-col items-center justify-between pt-5">
            <main className="flex flex-col space-y-4">
                <Button icon={<FaUser color='red' />} onClick={() => setContent('Usuarios')} />
                <Button icon={<MdFastfood color='red' />} onClick={() => setContent('Comida')} />
                <Button icon={<MdCategory color='red' />} onClick={() => setContent('Category')} />
            </main>
            <footer className="flex flex-col space-y-4 pb-5">
                <Button icon={<BsNutFill color='red' />} onClick={() => setContent('Nuts')} />
                <Button icon={<IoLogOut color='red' />} onClick={() => setContent('Logout')} />
            </footer>
        </div>
    );
}

function Button({ 
    icon,
    onClick
}:{
    icon: JSX.Element
    onClick: () => void
}) {
    return (
        <button onClick={onClick} className="hover:bg-slate-400 w-16 h-16 flex items-center justify-center">
            {icon}
        </button>
    )
}