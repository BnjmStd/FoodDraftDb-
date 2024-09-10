'use client'

import "./home.css"
import "./About.css"

import { useState } from "react"

export default function HomeContent() {
    return (
        <>
            <Home />
            <About />
            <Pricing />
        </>
    )
}

const Home = () => {
    return (
        <SectionLanding id="home" color={'bg-black'}>
            <div className="container mx-auto px-4 py-14 text-center ">
                <h1 className="text-4xl font-bold">Welcome to FoodCraft</h1>
                <p className="mt-4 text-lg">Discover all the information about food</p>
                <a
                    href="#features"
                    className="mt-6 inline-block bg-white text-blue-600 px-8 
                py-3 rounded-full font-semibold hover:bg-gray-300 transition">
                    Learn More
                </a>
            </div>
        </SectionLanding>
    )
}

const About = () => {
    return (
        <SectionLanding id={'about'} color={'bg-pink-600'}>
            <div className="container mx-auto px-4 text-center">
                <h2 className="text-3xl font-bold">Ready to Get Started?</h2>
                <p className="mt-4 text-lg">Join us today and take your experience to the next level.</p>
                <a href="#signup" className="mt-6 inline-block bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition">
                    Sign Up Now
                </a>
            </div>
        </SectionLanding>
    )
}

const Pricing = () => {

    const [active, setActive] = useState<number>(2)

    console.log(active)

    const handleClick = (id: number) => {
        console.log(`soy el id: ${id}`)
        setActive(id)
    }

    return (
        <SectionLanding id={'pricing'} color={''}>
            <div className="card-container">
                <div className={`card ${active === 1 ? 'active' : ''}`} 
                
                onClick={() => handleClick(1)} data-title="Card 1" data-description="Description of Card 1">
                    <h2>Card 1</h2>
                    <p>soy la card</p>
                </div>
                <div className={`card ${active === 2 ? 'active' : ''}`} 
                
                onClick={() => handleClick(2)}

                data-title="Card 2" data-description="Description of Card 2">
                    <h2>Card 2</h2>
                    <p>soy la card</p>
                </div>
                <div className={`card ${active === 3 ? 'active' : ''}`} 
                
                onClick={() => handleClick(3)} data-title="Card 3" data-description="Description of Card 3">
                    <h2>Card 3</h2>
                    <p>soy la card</p>
                </div>
            </div>
        </SectionLanding>
    )
}

const SectionLanding = ({
    children,
    id,
    color
}: {
    children: React.ReactNode,
    id: String
    color: String
}) => {
    return (
        <section id={`${id}`} className={`w-full py-16 ${color} text-white rounded-md`}>
            {children}
        </section>
    )
}