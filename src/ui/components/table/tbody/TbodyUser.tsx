import { User } from "@prisma/client"
import ActionsUser from "../ActionsUser"

export default function TbodyUser({
    data,
}: {
    data: User[]
}) {

    return (
        <tbody>
            {data.map((date) => (
                <tr className="par hover:bg-yellow-100 cursor-pointer" key={date.id}>
                    <td className="px-6 py-4  text-center whitespace-nowrap text-sm ">{`# ${date.id}`}</td>
                    <td className="px-6 py-4  text-center whitespace-nowrap text-sm ">{date.email}</td>
                    <td className="px-6 py-4  text-center whitespace-nowrap text-sm ">{date.type}</td>
                    <ActionsUser id={date.id} />
                </tr>
            ))}
        </tbody>
    )
}