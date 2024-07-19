'use client'

/* components */
import SeccionFoods from "@/ui/components/SeccionFoods/SeccionFoods"
import CardSeccion from "@/ui/components/card/CardSeccion"
import HomeLayout from "@/ui/layout/HomeLayout"

export default function Home() {
    return (
        <>
            <HomeLayout>
                <h1>Hola</h1>
            </HomeLayout>
        </>
    )
}


/* 

Base de datos de alimentos, que garantice o entregue información a los 
usuarios de los compuestos, nutrientes.


información nutricional, filtrando por cualquier categoria. (cantidad de proteinas
cantidad de kcals, sin gluten con gluten, alimentos recomendados para diabetes!, 

)

tiene la posiblidad de filtrar por diferentes compuestos. Para los clientes 
tener un registro o historial de compuestos.

*/