import Logo from "../Logo";
import Nav from "./Nav";
import Link from "next/link";
import "./HeroStyle.css"
import NavbarSm from "./NavbarSm";

export default function hero() {
    
    const SECCION = ["Home", "Foods", "About", "Pricing"]

    return (
        <header id="landing-header"
            className="h-24 px-4 m-0 text-center flex items-center fixed top-0 w-full 
            justify-between text-black z-40 border-b-2 text-sm"
        >
            <Logo />
            <Nav seccion={SECCION} />

            {/* botones */}
            <div className="hidden md:flex md:flex-row gap-2">
                <Link
                    href={"/login"}
                    className="bg-black gap-2 text-white p-2 rounded-md 
                    hover:bg-neutral-700 ">
                    Login
                </Link>
                <Link
                    href={"/singup"}
                    className="border-2 border-black gap-2 text-black p-2 rounded-md hover:bg-neutral-500 hover:text-white">
                    Sing up
                </Link>
            </div>

             <NavbarSm seccion={SECCION}/>

        </header>
    );
}