import Footer from "../components/footer/Footer";
import Hero from "../components/nav/Hero";

export default function HomeLayout ({
    children
}:Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <Hero />
            { children }
            <Footer />
        </>
    )
}