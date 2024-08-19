'use client'

import { getAllCategory } from '@/lib/actions/category'
import { ErrorContext } from '@/lib/context/error'
import ArrowDown from '@/ui/icons/ArrowDown'
import Search from '@/ui/icons/Search'
import { Category } from '@prisma/client'

import {
    usePathname,
    useRouter,
    useSearchParams
} from 'next/navigation'

import {
    useState,
    useEffect,
    use
} from 'react'

import { useDebouncedCallback } from 'use-debounce'

export const SearchFood = () => {

    const searchParams = useSearchParams()
    const pathName = usePathname()

    const { replace } = useRouter()

    const handleSearch = useDebouncedCallback((term: string) => {
        const params = new URLSearchParams(searchParams)

        if (term) {
            params.set('search', term)
        } else {
            params.delete('search')
        }

        replace(`${pathName}?${params.toString()}`)

    }, 300)

    return (
        <input
            type="search"
            id="search-dropdown"
            className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 
                rounded-e-lg border-s-gray-50 border-s-2 border border-gray-300 
                focus:ring-blue-500 focus:border-blue-500"
            placeholder="Cereals ... "
            onChange={(e) => handleSearch(e.target.value)}
            defaultValue={searchParams.get('search')?.toString()}
            required
        />
    )
}

export default function SearchInputFoods() {

    const [categories, setCategories] = useState<Category[]>([])
    const [loading, setLoading] = useState(true)

    const { setError } = use(ErrorContext)

    const fetchCategory = async () => {
        try {
            const response = await getAllCategory()

            if (response.error) {
                setError({
                    type: 'error',
                    message: response.message
                })
            }

            if (response.ok) {
                setCategories(response.data);
                setError({
                    type: 'info',
                    message: 'category ok'
                })
            }
        } catch (error) {
            setError({
                type: 'error',
                message: 'Algo salío mal'
            })
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchCategory()
    }, [])


    if (loading) return <div>Loading...</div>

    return (
        <div className="w-full flex">
            <SearchFood />
            <Example categories={categories} />
        </div>
    )
}

export function Example({ 
    categories 
}: { 
    categories: Category[] 
}) {
    const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = () => setIsOpen(!isOpen);

    return (
        <div className="relative inline-block text-left">
            <div>
                <button
                    onClick={toggleMenu}
                    className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                >
                    Options
                    <ArrowDown />
                </button>
            </div>

            {isOpen && (
                <div className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none">
                    <ul className="py-1">
                        {categories.map(category => (
                            <li key={category.id}>
                                <a
                                    type="button"
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                >
                                    {category.name}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}