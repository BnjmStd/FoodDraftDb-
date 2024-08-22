'use client'

import Link from "next/link";

import {
    FaEye,
    FaEyeSlash
} from "react-icons/fa";

import {
    useActionState,
    useState
} from "react"

import { login } from "@/lib/actions/user";

import "./loginForm.css"

export default function Login() {

    const [
        state,
        action,
        isPending
    ] = useActionState(login, null)

    const [isShowPassword, setIsShowPassword] = useState(false)

    console.log(isShowPassword)

    return (

        <div className="container--hero">
            <nav>
                <a className="logo-link"></a>
            </nav>

            <div className="form-wrapper">
                <h2>Login</h2>
                <form action={action}>
                    <div className="form-control">
                        <input
                            name="floating_email"
                            required
                            type="email"
                            placeholder=" " />
                        <label>Email</label>
                    </div>
                    <div className="form-control">
                        <input
                            required
                            name="floating_password"
                            type="password"
                            placeholder=" " />
                        <label>Password</label>
                        <span
                            onClick={() => setIsShowPassword(!isShowPassword)}
                        >
                            { isShowPassword ? <FaEye /> : <FaEyeSlash /> }
                        </span>
                    </div>

                    {state?.errors?.form && <p className='error mb-5'>{state.errors.form}</p>}

                    <button>
                        Sing In
                    </button>

                    <div className="form-help">
                        <div className="remember-me">
                            <input type="checkbox" id="remember-me" />
                            <label htmlFor="remember-me"> Remember me </label>
                        </div>
                        <a href="#"> Need help </a>
                    </div>
                </form>
                <p>New to MetaFoodCraft?</p> <a href="#">Sing up now</a>
            </div>
        </div>
    )
}