import { useState } from "react"
import { FaEye, FaEyeSlash } from "react-icons/fa6"

export const InputPassword = ({ 
    name,
    label
}:{ 
    name: string 
    label: string
}) => {
    const [isShowPassword, setIsShowPassword] = useState(false)
    return (
        <>
            <label
                htmlFor="password"
                className="block text-gray-200 font-bold mb-2"
            >
                {label}
            </label>
            <div className='relative'>
                <input
                    type={isShowPassword ? 'password' : 'text'}
                    name={name}
                    id="password"
                    placeholder={isShowPassword ? '••••••••' : 'contraseña actual'}
                    className="input-sing-up"
                    required
                />
                <span
                    className="text-primary h-2 cursor-pointer absolute 
                                        bottom-[50%] right-[5%]"
                    onClick={() => setIsShowPassword(!isShowPassword)}
                >
                    {
                        isShowPassword
                            ? <FaEye />
                            : <FaEyeSlash />
                    }
                </span>
            </div>
        </>
    )
}

export default InputPassword