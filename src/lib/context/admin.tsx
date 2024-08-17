'use client'

import { 
    Food, 
    User, 
    Category 
} from "@prisma/client";

import {
    createContext,
    useState,
} from 'react';

interface AdminContextType {
    userData: User[],
    foodData: Food[],
    categoryData: Category[],
    loading: boolean;
    selected: User | undefined;
    setUserData:React.Dispatch<React.SetStateAction<User[]>>;
    setFoodData: React.Dispatch<React.SetStateAction<Food[]>>;
    setCategoryData: React.Dispatch<React.SetStateAction<Category[]>>;
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
    setIsSelected: React.Dispatch<React.SetStateAction<User | undefined>>;
}

export const AdminContext = createContext<AdminContextType>({
    userData: [],
    foodData: [],
    categoryData: [],
    loading: false,
    selected: undefined,
    setUserData: () => {}, 
    setFoodData: () => {}, 
    setCategoryData: () => {}, 
    setIsLoading: () => {},
    setIsSelected: () => {}
});

export function AdminContextProvider({
    children
}: {
    children: React.ReactNode;
})  {
    const [userData, setUserData] = useState<User[]>([]);
    const [foodData, setFoodData] = useState<Food[]>([]);
    const [categoryData, setCategoryData] = useState<Category[]>([]);
    const [loading, setIsLoading] = useState<boolean>(true);
    const [selected, setIsSelected] = useState<User | undefined>();

    return (
        <AdminContext.Provider value={{
            userData,
            foodData,
            categoryData,
            loading,
            selected,
            setUserData,
            setFoodData,
            setCategoryData,
            setIsLoading,
            setIsSelected
        }}>
            {children}
        </AdminContext.Provider>
    );
};