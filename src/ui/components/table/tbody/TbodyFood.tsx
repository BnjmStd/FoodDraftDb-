import { Food } from "@prisma/client"
import ActionsFood from "../ActionsFood"

export default function TbodyFood({
    data,
}: {
    data: Food[]
}) {

    return (
        <tbody>
            {data.map((date) => (
                <tr className="par hover:bg-yellow-100 cursor-pointer" key={date.id}>
                    <td className="px-6 py-4  text-center whitespace-nowrap text-sm ">{`# ${date.id}`}</td>
                    <td className="px-6 py-4  text-center whitespace-nowrap text-sm ">{date.name}</td>
                    <td className="px-6 py-4  text-center whitespace-nowrap text-sm ">{date.description}</td>
                    <ActionsFood id={date.id} />
                </tr>
            ))}
        </tbody>
    )
}