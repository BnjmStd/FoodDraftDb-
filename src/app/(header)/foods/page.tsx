import CardSeccion from "@/ui/components/card/CardSeccion";
import SearchInputFoods from "@/ui/components/SeccionFoods/SeccionFoods";

export default function FoodContent () {
    return (
        <div className="flex flex-col">
            <SearchInputFoods />
            <CardSeccion />
        </div>
    )
}