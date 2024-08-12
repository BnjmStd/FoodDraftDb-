
import { msgWelcome } from "@/lib/actions/user"
import { ErrorContext } from "@/lib/context/error"
import { 
    use, 
    useEffect,
    useState
} from "react"

export const useMsgInit = ({
    message, 
    type
}: {
    message: string;
    type: 'warning' | 'info' | 'error'
}) => {

    const [name, isSetName] = useState<String>('') 
    const { setError } = use(ErrorContext)

    useEffect(() => {

        const fetchError = async () => {

            try {
                const res = await msgWelcome()

                if (!res) {
                    return null
                }

                setError({
                    message: message + res,
                    type: type
                })

                isSetName(res)

            } catch (e) {
                console.error('~Error:', e);
            }
        };

        fetchError();

    }, []);


    return name
}
