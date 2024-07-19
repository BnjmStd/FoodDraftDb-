import Food from '@/ui/icons/Food';
import './AnimatedSvgBackground.css';

const svgs = [
    <Food />,
    <Food />,
    <Food />,
    <Food />,
    <Food />
];

export default function AnimatedSvgBackground() {
    return (
        <ul className="circles relative w-full h-screen flex flex-wrap bg-green-300">
            {svgs.map((svg, i) => (
                <li 
                    key={i} 
                    className="circle absolute block list-none w-[40px] h-[40px]" 
                    >
                        {svg}
                </li>
            ))}
        </ul>
    );
};