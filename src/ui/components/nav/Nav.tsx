import {
    useEffect,
    useRef,
    useState
} from "react";

export default function Nav({
    setContent,
    seccion
} : {
    setContent: React.Dispatch<React.SetStateAction<string>>
    seccion: string[]
}) {

    const [activeIndex, setActiveIndex] = useState<number | null>(0);

    const handleSetActive = (index: number, content: string) => {
        setActiveIndex(index);
        setContent(content)
    }

    return (
        <>
            <nav className="items-center justify-center hidden md:flex">
                <ul
                    className={`flex [&>li>a]:text-current [&>li>a]:transition-colors 
                    [&>li>a]:duration-500 [&>li>a]:inline-block 
                    [&>li>a]:px-4 [&>li>a]:py-2 cursor-pointer`}
                >
                    {seccion.map((item, index) => (
                        <li key={index}>
                            <a
                                onClick={() => handleSetActive(index, index == 0 ? "/" : `/${item}`)}
                                className={activeIndex === index ? "underline-custom" : ""}
                            >
                                {item}
                            </a>
                        </li>
                    ))}
                </ul>
                <MenuBackdrop />
            </nav>
        </>
    )
}

const MenuBackdrop = () => {
    const menuBackdropRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const listItem = document.querySelectorAll("#landing-header li");

        listItem.forEach((item) => {
            const handleMouseEnter = () => {
                const { left, top, width, height } = item.getBoundingClientRect();
                const menuBackdrop = menuBackdropRef.current;

                if (menuBackdrop) {
                    menuBackdrop.style.setProperty("--left", `${left}px`);
                    menuBackdrop.style.setProperty("--top", `${top}px`);
                    menuBackdrop.style.setProperty("--width", `${width}px`);
                    menuBackdrop.style.setProperty("--height", `${height}px`);
                    menuBackdrop.style.opacity = "1";
                    menuBackdrop.style.visibility = "visible";
                }
            }

            const handleMouseLeave = () => {
                const menuBackdrop = menuBackdropRef.current;

                if (menuBackdrop) {
                    menuBackdrop.style.opacity = "0";
                    menuBackdrop.style.visibility = "hidden";
                }
            }

            item.addEventListener("mouseenter", handleMouseEnter);
            item.addEventListener("mouseleave", handleMouseLeave);

            return () => {
                item.removeEventListener("mouseenter", handleMouseEnter);
                item.removeEventListener("mouseleave", handleMouseLeave);
            }
        })
    }, [])

    return (
        <div
            ref={menuBackdropRef}
            id="menu-backdrop"
            className="absolute left-0 top-0 bg-black/5 backdrop-blur-lg rounded
                    translate-x-[var(--left)] translate-y-[var(--top)]
                    w-[var(--width)] h-[var(--height)]
                    transition-all duration-300
                    ease-in-out opacity-0 -z-10
                    "
        />
    )
}