'use client'

/* components */
import Footer from "@/ui/components/footer/Footer";
import Spinner from "@/ui/components/loading/Spinner";
import Hero from "@/ui/components/nav/Hero";

/* search */
import HomeContent from "@/ui/pages/Home/Home";
import FoodContent from "@/ui/pages/Food/Food";
import CompanieContent from "@/ui/pages/Companie/Companie";

/* react */
import {
    lazy,
    Suspense,
    useState
} from "react"

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
            <main className="overflow-y-auto min-h-[100vh]">
                <Hero setContent={setContent} />
                <MainContent content={content} />
            </main>
            <Footer />
        </>
    )
}