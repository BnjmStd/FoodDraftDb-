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
                                <li key={xid} className="nav__item">
                                    <a href="#" className="nav__link">
                                        {x}
                                    </a>
                                </li>
                            );
                        })
                    }
                    <div>
                        <a className="nav__link" href="">Sing Up</a>
                        <a className="nav__link" href="">Login</a>
                    </div>
                </ul>
            </div>
        </nav>
    )
}
