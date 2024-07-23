'use client'

/* icons */
import { IoReload } from "react-icons/io5";
import { IoIosAddCircle } from "react-icons/io";
import { BsSearchHeart } from "react-icons/bs";

/* components */
import Spinner from "@/ui/components/loading/Spinner";
import Sidebar from "@/ui/components/sidebar/Sidebar";
import Table from "@/ui/components/table/Table";
import Modal from 'react-modal'

/* actions */
import { User } from "@prisma/client";
import { getAll } from "@/lib/actions/user";

/* react */
import {
    lazy,
    memo,
    Suspense,
    useEffect,
    useState
} from 'react';

const SearchAdmin = () => {
    return (
        <form className="flex gap-2">
            <label htmlFor="search" className="text-sm flex-1 text-gray-900 sr-only">Search</label>
            <div className="relative">
                <div className="absolute inset-y-0 start-0 flex 
                items-center ps-3 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-500"
                        aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                        fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                    </svg>
                </div>
                <input type="search" id="search" 
                className="block w-full p-2 ps-10 text-sm text-gray-900 border 
                border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 
                focus:border-blue-500" placeholder="Search" required />
            </div>
            <button className="p-2 rounded-md bg-red-200 hover:bg-neutral-400">
                <BsSearchHeart />
            </button>
        </form>
    )
}

const UserComponent = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const openModal = () => setModalIsOpen(true);
    const closeModal = () => setModalIsOpen(false);


    const reloadData = async () => {
        const fetchedUsers = await getAll();
        setUsers(fetchedUsers);
        setLoading(false);
    }

    useEffect(() => {
        const fetchUsers = async () => {
            const fetchedUsers = await getAll();
            setUsers(fetchedUsers);
            setLoading(false);
        };

        fetchUsers();
    }, []);

    if (loading) return <Spinner />

    const column = ["name", "email", "password"]

    return (
        <>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Example Modal"
                className="fixed inset-0 flex items-center justify-center p-4"
                overlayClassName="fixed inset-0 bg-black bg-opacity-50"
            >
                <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                    <h2 className="text-xl font-semibold mb-4">Modal Title</h2>
                    <p className="mb-4">Some content for the modal...</p>
                    <button onClick={closeModal} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
                        Close Modal
                    </button>
                </div>
            </Modal>

            <div className="w-full flex flex-col gap-2">
                <main className="flex flex-row gap-2 justify-between">
                    <SearchAdmin />
                    <div className="flex items-center">
                        <button
                            className="p-2 hover:bg-gray-200 rounded-md"
                            onClick={reloadData}
                        >
                            <IoReload />
                        </button>
                        <button
                            className="p-2 hover:bg-gray-200 rounded-md"
                            onClick={openModal}
                        >
                            <IoIosAddCircle />
                        </button>
                    </div>
                </main>
                <footer className="flex-1">
                    {users.length === 0 ? (
                        <p>No users found.</p>
                    ) : (
                        <Table
                            columns={column}
                            onEdit={() => { }}
                            onDelete={() => { }}
                            data={users}
                        />
                    )}
                </footer>
            </div>
        </>
    );
};

const FoodComponent = () => {
    return (
        <h1>Food</h1>
    )
}

const ConfigComponent = () => {
    return (
        <h1>Config</h1>
    )
}

const LogoutComponent = () => {
    return (
        <h1>Logout</h1>
    )
}

const ContentComponent = ({
    type
}: {
    type: string
}) => {
    switch (type) {
        case 'Usuarios':
            return <UserComponent />
        case 'Comida':
            return <FoodComponent />
        case 'Nuts':
            return <ConfigComponent />
        case 'Logout':
            return <LogoutComponent />
        default:
            return <div>Contenido no encontrado.</div>;
    }
};

const LazyContentComponent = lazy(() => Promise.resolve({ default: ContentComponent }));

const MainContent = ({ 
    content 
}: { 
    content: string 
}) => (
    <div className="ml-16 p-4">
        <Suspense fallback={<Spinner />}>
            <LazyContentComponent type={content} />
        </Suspense>
    </div>
);

const SidebarMemo = memo(Sidebar);

export default function Page() {
    const [content, setContent] = useState('Usuarios');

    return (
        <div className="flex m-20 flex-grow border overflow-auto items-center justify-center">
            <SidebarMemo setContent={setContent} />
            <MainContent content={content} />
        </div>
    );
}