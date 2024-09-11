'use client'

import "./home.css"
import "./About.css"
import "./pricing.css"

import { useState } from "react"

export default function HomeContent() {
    return (
        <>
            <Home />
            <Services />
            <Pricing />
            <About />
        </>
    )
}

const Home = () => {
    return (
        <SectionLanding id="home">
            <div className="home__container container mx-auto px-4 flex flex-col justify-center items-center ">
                <a href="#" className="home__info">Get to know our public API ⭐</a>
                <h1 className="home__title">🍌 Welcome to FoodCraft 🍊</h1>
                <p className="home__description">Discover all the information about food.
                    We improve the <strong>health</strong> of Chileans, and educate them in your own way
                </p>
                <div className="home__actions">
                    <a
                        href="#"
                        className="home__actions-link">
                        Start now -
                    </a>
                    <a href="#" className="home__actions-link">
                        Go to GitHub
                    </a>
                </div>
            </div>
        </SectionLanding>
    )
}

const About = () => {
    return (
        <SectionLanding id={'about'} >
            <div className="about__container container mx-auto px-4 text-center">
                <h1 className="about__title"> Grid & Code  Experience  &  Skilled Team </h1>
                <p className="about__description">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Perferendis sapiente iste quisquam nemo deserunt temporibus, nihil minima, ex, dicta hic doloribus commodi reiciendis voluptatum voluptate eveniet. Temporibus quia dignissimos aliquid.</p>
                <div className="about__skills">
                    <div className="about__skill-card">
                        <h1>60+</h1>
                        <h3>Succes skill</h3>
                        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis voluptates inventore nesciunt et cons</p>
                    </div>

                    <div className="about__skill-card">
                        <div className="about__card-bg"></div>
                        <h1>60+</h1>
                        <h3>Succes skill</h3>
                        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis voluptates inventore nesciunt et cons</p>
                    </div>

                    <div className="about__skill-card">
                        <h1>60+</h1>
                        <h3>Succes skill</h3>
                        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis voluptates inventore nesciunt et cons</p>
                    </div>

                    <div className="about__skill-card">
                        <h1>60+</h1>
                        <h3>Succes skill</h3>
                        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis voluptates inventore nesciunt et cons</p>
                    </div>

                </div>
            </div>
        </SectionLanding>
    )
}

const Services = () => {

    const [active, setActive] = useState<number>(1)

    const handleClick = (id: number) => {
        setActive(id)
    }

    return (
        <SectionLanding id={'services'}>

            <div className="sv__container container mx-auto px-4 text-center">
                <h1 className="sv__title">
                    Services
                </h1>
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
            </div>
        </SectionLanding>
    )
}

const Pricing = () => {
    return (
        <SectionLanding id={'pricing'} >
            <div className="services__container container mx-auto px-4 text-center">
                <h2 className="services__title">Pricing</h2>
                <main className="services__cards">
                    <div className="animated_card">
                        <span className="">$</span>
                    </div>

                    <div className="animated_card">
                        <span className="">$</span>
                    </div>

                    <div className="animated_card">
                        <span className="">$</span>
                    </div>
                </main>
            </div>
        </SectionLanding>
    )
}

const SectionLanding = ({
    children,
    id,
}: {
    children: React.ReactNode,
    id: String
}) => {
    return (
        <section id={`${id}`} className={`w-full text-black rounded-md`}>
            {children}
        </section>
    )
}