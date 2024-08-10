'use client'

/* icons */
import { IoReload } from "react-icons/io5"
import { IoIosAddCircle } from "react-icons/io"
import { BsSearchHeart } from "react-icons/bs"

/* components */
import Spinner from "@/ui/components/loading/Spinner"
import Sidebar from "@/ui/components/sidebar/Sidebar"
import Table from "@/ui/components/table/Table"
import Dialog from "@/ui/components/dialog/Dialog"

/* forms */
import { FoodForm } from "@/ui/components/forms/createNewFoodForm"
import { UserForm } from "@/ui/components/forms/createNewUserForm"

/* actions */
import { 
    Category, 
    Food, 
    User 
} from "@prisma/client"

import { main } from "@/lib/seeds"
import { getAllUser } from "@/lib/actions/user"
import { getAllCategory } from "@/lib/actions/category"
import { getAllFood } from "@/lib/actions/food"

/* react */
import React, {
    lazy,
    memo,
    Suspense,
    useEffect,
    useState
} from 'react'

const CategoryComponent = () => {
    const [categorys, setCategorys] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const column = ["name"]

    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const reloadData = async () => {
        const fetchedCategorys = await getAllCategory();
        setCategorys(fetchedCategorys);
        setLoading(false);
    }

    useEffect(() => {
        const fetchFoods = async () => {
            const fetchedCategorys = await getAllCategory();
            setCategorys(fetchedCategorys);
            setLoading(false);
        };

        fetchFoods();

    }, []);

    if (loading) return <Spinner />

    return (
        <>
            <Dialog 
                isOpen={isDialogOpen} 
                isSetOpen={setIsDialogOpen} 
                title="New Category" 
            >
                <FoodForm />
            </Dialog>

            <div className="flex flex-col gap-2">
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
                            onClick={() => setIsDialogOpen(true)}
                        >
                            <IoIosAddCircle />
                        </button>
                    </div>
                </main>
                <footer className="flex-1">
                    {categorys.length === 0 ? (
                        <p>No foods found.</p>
                    ) : (
                        <Table
                            columns={column}
                            onEdit={() => { }}
                            data={categorys}
                        />
                    )}
                </footer>
            </div>
        </>
    );
}

const ConfigComponent = () => {
    return (
        <>
            <h1>Config</h1>

            <form action={main} className="flex justify-center items-center">
                <button
                    className="rounded-md bg-green-300 p-2 hover:bg-green-500"
                    type="submit"><IoIosAddCircle /></button>
            </form>

        </>
    )
}

const FoodComponent = () => {
    const [foods, setFoods] = useState<Food[]>([]);
    const [loading, setLoading] = useState(true);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const reloadData = async () => {
        const fetchedFoods = await getAllFood();
        setFoods(fetchedFoods);
        setLoading(false);
    }

    useEffect(() => {
        const fetchFoods = async () => {
            const fetchedUsers = await getAllFood();
            setFoods(fetchedUsers);
            setLoading(false);
        };

        fetchFoods();

    }, []);

    if (loading) return <Spinner />

    const column = ["name", "description", "categories"]

    const openDialog = () => setIsDialogOpen(true)

    return (
        <>
            <Dialog 
                isOpen={isDialogOpen} 
                isSetOpen={setIsDialogOpen} 
                title="Create New Foods" 
            >
                <FoodForm />
            </Dialog>

            <div className="flex flex-col gap-2">
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
                            onClick={openDialog}
                        >
                            <IoIosAddCircle />
                        </button>
                    </div>
                </main>
                <footer className="flex-1">
                    {foods.length === 0 ? (
                        <p>No foods found.</p>
                    ) : (
                        <Table
                            columns={column}
                            onEdit={() => { }}
                            data={foods}
                        />
                    )}
                </footer>
            </div>
        </>
    );
}

const LogoutComponent = () => {
    return (
        <h1>Logout</h1>
    )
}

const UserComponent = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const reloadData = async () => {
        const fetchedUsers = await getAllUser();
        setUsers(fetchedUsers);
        setLoading(false);
    }

    useEffect(() => {
        const fetchUsers = async () => {
            const fetchedUsers = await getAllUser();
            setUsers(fetchedUsers);
            setLoading(false);
        };

        fetchUsers();

    }, []);

    if (loading) return <Spinner />

    const column = ["id", "name", "email", "password"]

    const openDialog = () => setIsDialogOpen(true)

    return (
        <>
            <Dialog 
                isOpen={isDialogOpen} 
                isSetOpen={setIsDialogOpen} 
                title="Create New User" 
            >
                <UserForm />
            </Dialog>

            <div className="flex flex-col gap-2">
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
                            onClick={openDialog}
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
                            data={users}
                        />
                    )}
                </footer>
            </div>
        </>
    );
};

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
        case 'Category':
            return <CategoryComponent />
        case 'Nuts':
            return <ConfigComponent />
        case 'Logout':
            return <LogoutComponent />
        default:
            return <div>Contenido no encontrado.</div>;
    }
};

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

const LazyContentComponent = lazy(() => Promise.resolve({ 
    default: ContentComponent 
}));

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
            <SidebarMemo  />
            <MainContent content={content} />
        </div>
    );
}