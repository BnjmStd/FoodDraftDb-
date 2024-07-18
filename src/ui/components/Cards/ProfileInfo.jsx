import { getInitials } from "../../utils/helper";

export default function ProfileInfo({ onLogout }) {
    return (
        <div className="flex items-center gap-3">
            <div className="w-12 h12 flex items-center justify-center rounded-full text-slate-950 font-medium bg-slate-100"> 
                {getInitials("user nombre")}
            </div>

            <div>
                <p className="text-sm font-medium"> Willeam </p>
                <button className="text-sm text-slate-700 underline">
                    Logout
                </button>
            </div>
        </div>
    )
}