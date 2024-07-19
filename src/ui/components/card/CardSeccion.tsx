import CardBase from "./CardBase";

const COLORS = [
    'bg-red-900',
    'bg-yellow-900',
    'bg-green-900',
    'bg-blue-900',
    'bg-indigo-900',
    'bg-purple-900',
    'bg-pink-900',
    'bg-orange-900',
    'bg-blue-900',
    'bg-green-900',
    'bg-yellow-900',
    'bg-red-900',
    'bg-gray-900',
    'bg-purple-900',
    'bg-pink-900',
];

const MOCKSINFO = [
    {
        id: 1,
        image: 'https://user-images.githubusercontent.com/2805249/64069899-8bdaa180-cc97-11e9-9b19-1a9e1a254c18.png',
        name: 'Spaghetti ',
        description: 'A classic Italian pasta dish made with eggs, cheese, pancetta, and pepper.',
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
    },
    {
        id: 2,
        image: 'https://user-images.githubusercontent.com/2805249/64069899-8bdaa180-cc97-11e9-9b19-1a9e1a254c18.png',
        name: 'Chicken ',
        description: 'A popular Indian dish made with marinated chicken pieces simmered in a spiced tomato cream sauce.',
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
    },
    {
        id: 3,
        image: 'https://user-images.githubusercontent.com/2805249/64069899-8bdaa180-cc97-11e9-9b19-1a9e1a254c18.png',
        name: 'Beef ',
        description: 'A rich and creamy dish made with tender strips of beef, mushrooms, and onions in a sour cream sauce.',
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
    },
    {
        id: 4,
        image: 'https://user-images.githubusercontent.com/2805249/64069899-8bdaa180-cc97-11e9-9b19-1a9e1a254c18.png',
        name: 'Vegetable ',
        description: 'A quick and healthy dish featuring a mix of fresh vegetables stir-fried in a savory sauce.',
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
    },
    {
        id: 5,
        image: 'https://user-images.githubusercontent.com/2805249/64069899-8bdaa180-cc97-11e9-9b19-1a9e1a254c18.png',
        name: 'Spaghetti ',
        description: 'A classic Italian pasta dish made with eggs, cheese, pancetta, and pepper.',
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
    },
    {
        id: 6,
        image: 'https://user-images.githubusercontent.com/2805249/64069899-8bdaa180-cc97-11e9-9b19-1a9e1a254c18.png',
        name: 'Chicken ',
        description: 'A popular Indian dish made with marinated chicken pieces simmered in a spiced tomato cream sauce.',
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
    },
    {
        id: 7,
        image: 'https://user-images.githubusercontent.com/2805249/64069899-8bdaa180-cc97-11e9-9b19-1a9e1a254c18.png',
        name: 'Beef ',
        description: 'A rich and creamy dish made with tender strips of beef, mushrooms, and onions in a sour cream sauce.',
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
    },
    {
        id: 8,
        image: 'https://user-images.githubusercontent.com/2805249/64069899-8bdaa180-cc97-11e9-9b19-1a9e1a254c18.png',
        name: 'Vegetable ',
        description: 'A quick and healthy dish featuring a mix of fresh vegetables stir-fried in a savory sauce.',
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
    }
];
    
export default function CardSeccion() {
    return (
        <div className=" flex flex-wrap items-center justify-center">
            {/* card random */}
            <div className="p-2 flex flex-wrap items-center justify-center text-pink">
                {MOCKSINFO.map(({ id, image, name, description, color }) => (
                    <CardBase
                        key={id}
                        id={id}
                        image={image}
                        name={name}
                        description={description}
                        color={color}
                    />
                ))}
            </div>
        </div>
    );
}
