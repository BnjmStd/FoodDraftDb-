import { Category } from "@prisma/client"
import ActionsCategory from "../ActionsCategory"

export default function TbodyCategory({
    data,
}: {
    data: Category[]
}) {

    return (
        <tbody>
            {data.map((date) => (
                <tr className="par hover:bg-yellow-100 cursor-pointer" key={date.id}>
                    <td className="px-6 py-4  text-center whitespace-nowrap text-sm ">{`# ${date.id}`}</td>
                    <td className="px-6 py-4  text-center whitespace-nowrap text-sm ">{date.name}</td>
                    <ActionsCategory id={date.id} />
                </tr>
            ))}
        </tbody>
    )
}