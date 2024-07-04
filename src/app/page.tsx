import MenuBackdrop from "@/ui/components/MenuBackDrop";

export default function Home() {
    return (
        <header
            id="landing-header" 
            className="py-6 px-10 flex items-center fixed top-0 w-full justify-center  text-black z-40"
        >
            <nav>
                <ul className="flex text-sm [&>li>a]:text-current [&>li>a]:transition-colors [&>li>a]:duration-500 [&>li>a]:inline-block [&>li>a]:px-4 [&>li>a]:py-2">
                    <li><a href="">Home</a></li>
                    <li><a href="">Database</a></li>
                    <li><a href="">Alimentos</a></li>
                    <li><a href="">Empresas</a></li>
                </ul>
            </nav>

            <MenuBackdrop />
        </header>   
    );
}