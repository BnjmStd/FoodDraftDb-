'use client'

import CardSeccion from "@/ui/components/card/CardSeccion";

/* components */
import Footer from "@/ui/components/footer/Footer";
import Spinner from "@/ui/components/loading/Spinner";
import Hero from "@/ui/components/nav/Hero";
import SearchInputFoods from "@/ui/components/SeccionFoods/SeccionFoods";

/* react */
import {
    lazy,
    Suspense,
    useState
} from "react"

const HomeContent = () => {
    return (
        <h1>HomeContnet</h1>
    )
}

const FoodContent = () => {
    return (
        <div className="flex flex-col">
            <SearchInputFoods />
            <CardSeccion />
        </div>
    )
}

const CompanieContent = () => {
    return (
        <>
            <h1>Hola</h1>
        </>
    )
}

const ContentComponent = ({
    type
}: {
    type: string
}) => {
    switch (type) {
        case '/':
            return <HomeContent />
        case '/Foods':
            return <FoodContent />
        case '/Companies':
            return <CompanieContent />
        default:
            return <div>Contenido no encontrado.</div>;
    }
};

const LazyContentComponent = lazy(() => Promise.resolve({
    default: ContentComponent
}));

const MainContent = ({
    content
}: {
    content: string
}) => (
    <div className="mt-20 p-4 flex justify-center items-center ">
        <Suspense fallback={<Spinner />}>
            <LazyContentComponent type={content} />
        </Suspense>
    </div>
);

export default function Home() {

    const [content, setContent] = useState('/')

    return (
        <>
            <main className="overflow-y-auto">
                <Hero setContent={setContent} />
                <MainContent content={content} />
                <Footer />
            </main>
        </>
    )
}