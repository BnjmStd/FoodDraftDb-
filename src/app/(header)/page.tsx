'use client'

import { 
    useEffect, 
    useRef, 
    useState 
} from "react"

import "./home.css"

export default function HomeContent () {

    const myRef = useRef<HTMLDivElement | null>(null)
    const [myElementIsVisible, setMyElementIsVisible] = useState<boolean>(false)

    useEffect(() => {

        const observer = new IntersectionObserver((entries) => {
            const entry = entries[0]
            setMyElementIsVisible(entry.isIntersecting)
            //observer.unobserve(entry.target);
        }, { threshold: 0.10 });

        if (myRef.current) {
            observer.observe(myRef.current)
        }

        return () => {
            if (myRef.current) {
                observer.unobserve(myRef.current)
            }
        }

    }, [])

    useEffect(() => {
        console.log(myElementIsVisible);
    }, [myElementIsVisible]);

    return (
        <div className="flex flex-col">
            <header className="bg-blue-600 text-white rounded-md ">
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
            </header>

            <section id="features" className="py-16 bg-white">
                <div className={`container mx-auto px-4`}>
                    <div className={`text-center mb-12`}>
                        <h2 className="text-3xl font-bold">Our Features</h2>
                        <p className="mt-4 text-gray-600">Explore the amazing features we offer.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8" >
                        <div className={` opacity-0 bg-gray-50 p-8 rounded-lg shadow ${myElementIsVisible ? 'card' : ''} card-0`}>
                            <h3 className="text-xl font-semibold mb-4">Feature One</h3>
                            <p className="text-gray-700">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                        </div>
                        <div className={`opacity-0 bg-gray-50 p-8 rounded-lg shadow ${myElementIsVisible ? 'card' : ''} card-1`}>
                            <h3 className="text-xl font-semibold mb-4">Feature Two</h3>
                            <p className="text-gray-700">Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                        </div>
                        <div className={`opacity-0 bg-gray-50 p-8 rounded-lg shadow ${myElementIsVisible ? 'card' : ''} card-2`}>
                            <h3 className="text-xl font-semibold mb-4">Feature Three</h3>
                            <p className="text-gray-700">Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.</p>
                        </div>
                    </div>
                </div>
            </section>

            <section id="testimonials" className="py-16 bg-gray-100 rounded-md">
                <div ref={myRef} className=" mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold">What Our Users Say</h2>
                        <p className="mt-4 text-gray-600">Hear from our satisfied customers.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ">
                        <div className="bg-white p-8 rounded-lg shadow border-2 border-neutral-300">
                            <p className="text-gray-700">"This platform has transformed my business. Highly recommend!"</p>
                            <h4 className="mt-4 font-semibold">- Jane Doe</h4>
                        </div>
                        <div className="bg-white p-8 rounded-lg shadow border-2 border-neutral-300">
                            <p className="text-gray-700">"Excellent service and support. A game changer!"</p>
                            <h4 className="mt-4 font-semibold">- John Smith</h4>
                        </div>
                        <div className="bg-white p-8 rounded-lg shadow border-2 border-neutral-300">
                            <p className="text-gray-700">"Amazing features and easy to use. Five stars!"</p>
                            <h4 className="mt-4 font-semibold">- Emily Johnson</h4>
                        </div>
                    </div>
                </div>
            </section>

            <section id="cta" className="py-16 bg-blue-600 text-white">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold">Ready to Get Started?</h2>
                    <p className="mt-4 text-lg">Join us today and take your experience to the next level.</p>
                    <a href="#signup" className="mt-6 inline-block bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition">
                        Sign Up Now
                    </a>
                </div>
            </section>
        </div>
    )
}