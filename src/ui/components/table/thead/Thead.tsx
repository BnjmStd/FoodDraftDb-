export default function Thead({
    column
}: {
    column: String[]
}) {
    return (
        <thead className="capitalize bg-neutral-800 text-neutral-300 ">
            <tr>
                {column.map((x, index) => (
                    <th key={index} className="px-6 py-4">{x}</th>
                ))}
            </tr>
        </thead>
    )
}