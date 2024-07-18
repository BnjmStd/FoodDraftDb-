'use client'

import { useState } from "react"
import { FaLock, FaUnlock } from "react-icons/fa";

export default function PasswordInput({
    name,
    id,
    value, 
    onChange, 
    placeholder,
    styleInput
}: {
    name: string;
    id: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder: string;
    styleInput: string;
})  {
  
    const [isShowPassword, setIsShowPassword] = useState(false)

    const toggleShowPassword = () => {
        setIsShowPassword(!isShowPassword)
    }
  
    return (
        <div className="flex items-center bg-transparent border-[1.5px] px-5 rounded mb-4">
            <input 
                name={name}
                id={id}
                value={value}
                onChange={onChange}
                type={isShowPassword ? "text" : "password"}
                placeholder={placeholder || "Password"}
                className={styleInput}  
                required
            />
            {isShowPassword ? (
                <span
                    className="text-primary cursor-pointer"
                    onClick={toggleShowPassword}
                >
                    <FaUnlock />
                </span>
            ) : (
                <span
                    className="text-primary cursor-pointer"
                    onClick={toggleShowPassword}
                >
                    <FaLock />
                </span>
            )}
        </div>
    )
}
