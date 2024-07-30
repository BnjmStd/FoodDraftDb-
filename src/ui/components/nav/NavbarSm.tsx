import { FaBars, FaTimes } from 'react-icons/fa';
import "./respon.css"
export default function NavbarSm({
    seccion
}: {
    seccion: string[]
}) {
    return (
        <nav className="nav md:hidden flex z-41 h-full">
            <div className="nav__container">
                <label className="nav__toggle" htmlFor="menu-input">
                    <input type="checkbox" id="menu-input" className="nav__input" />
                    <div className="icon-container">
                        <div className="icon-open">
                            <FaBars color="black" />
                        </div>
                        <div className="icon-close">
                            <FaTimes color="white" />
                        </div>
                    </div>
                </label>

                <ul className="nav__list">
                    {
                        seccion.map((x, xid) => {
                            return (
                                <li className="nav__item" id={`${xid}`}>
                                    <a href="#" className="nav__link">
                                        {x}
                                    </a>
                                </li>
                            );
                        })
                    }
                </ul>
            </div>
        </nav>
    )
}
