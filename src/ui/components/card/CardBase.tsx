import BgCard from "@/ui/icons/BgCards"

export default function CardBase({
    id,
    image,
    name,
    description,
    color,
}: {
    id: number
    image: string
    name: string
    description: string
    color: string
}) {
    return (
        <div
            className={`flex-shrink-0 m-6 relative overflow-hidden 
                rounded-lg max-w-xs shadow-lg ${color}`}
        >
            <div className="absolute bottom-0 left-0 w-full h-full">
                <BgCard />
            </div>
            <div className="relative pt-10 px-10 flex items-center justify-center">
                <div className="absolute w-48 h-48 bottom-0 left-0 -mb-24 ml-3 
                bg-gradient-radial from-black to-transparent opacity-20 
                transform rotate-12 scale-y-60"></div>
                <img className="relative w-40" src={image} alt={description} />
            </div>
            <div className="relative px-6 pb-6 mt-6">
                <div className="flex justify-center overflow-hidden text-wrap">
                    <a className="block font-semibold text-xl text-while p-2 
                    bg-neutral-200 cursor-pointer hover:bg-neutral-400 rounded-md">
                        {name}
                    </a>
                </div>
            </div>
        </div>
    )
}