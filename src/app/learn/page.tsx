import "./aside.css"
import { FaHome } from "react-icons/fa";
import { IoFastFoodSharp } from "react-icons/io5";
import { TiThMenu } from "react-icons/ti";

export default function App() {
    return (
        <>
            <Aside />
        
        </>
    )
}

export function Aside() {
    return (
        <aside className="sidebar">
            <ul className="sidebar__list">
                <li className="sidebar__element">

                        <TiThMenu className="sidebar__icon sidebar__icon--logo"/>

                        <div className="sidebar__hide">
                            <p className="sidebar__logo">MetaFoodCraft</p>
                        </div>

                </li>

                <li className="sidebar__element">

                    <FaHome className="sidebar__icon"/>
                    
                    <div className="sidebar__hide">
                        <p className="sidebar__text">
                            Home
                        </p>
                    </div>

                </li>

                <li className="sidebar__element">
                    
                    <IoFastFoodSharp className="sidebar__icon" />
                    
                    <div className="sidebar__hide">
                        <p className="sidebar__text">
                            Alimentos
                        </p>
                    </div>

                </li>

                <li className="sidebar__element sidebar__element--avatar">

                    <img src="/assets/jeje.avif" alt="" className="sidebar__icon sidebar__icon--avatar" />

                        <div className="sidebar__hide">
                            <h3 className="sidebar__title">Grid & Code</h3>
                            <p className="sidebar__info">MetaFoodCraft</p>
                        </div>

                </li>

            </ul>
        </aside>
    )
}