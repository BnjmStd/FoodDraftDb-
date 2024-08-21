'use client'

import ArrowDown from '@/ui/icons/ArrowDown'
import { Category } from '@prisma/client'

import {
    usePathname,
    useRouter,
    useSearchParams
} from 'next/navigation'

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
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 
                rounded-e-lg border-s-gray-50 border-s-2 border border-gray-300 
                focus:ring-blue-500 focus:border-blue-500 z-0"
            placeholder="Cereals ... "
            onChange={(e) => handleSearch(e.target.value)}
            defaultValue={searchParams.get('search')?.toString()}
            autoComplete="off"
        />
    )
}

import "./style.css"

export const DropdownCategory = ({
    categories
}: {
    categories: Category[]
}) => {

    return (
        <div className="dropdown">

            <li className="dropdown__list">

                <label className="dropdown__text">
                    Category <ArrowDown />
                    <input type="checkbox" className="dropdown__input" />
                </label>

                <ul className="dropdown__sub">
                    {categories.map(category => (
                        <li className="dropdown__li" key={category.id}>
                            <a
                                type="button"
                                className="dropdown__anchor"
                            >
                                {category.name}
                            </a>
                        </li>
                    ))}
                </ul>
            </li>
        </div>
    )
}