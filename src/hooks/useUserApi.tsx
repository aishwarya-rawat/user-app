import { useEffect, useState } from "react";

type User = {
    id: number;
    name: string;
    username: string;
    email: string;
    address: {
        street: string;
        suite: string;
        city: string;
        zipcode: string;
        geo: {
            lat: string;
            lng: string;
        }
    };
    phone: string;
    website: string;
    company: {
        name: string;
        catchPhrase: string;
        bs: string;
    }
};

export const useUserApi = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [isLoading, setLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchUsers = async () => {
        try {
            const response = await fetch(
                'https://jsonplaceholder.typicode.com/users'
            );

            if (response.ok) {
                const data = await response.json();
                setUsers(data);
            }
            setIsError(false);
        } catch (e) {
            setUsers([]);
            setIsError(true);
            setError(e as string);
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        setLoading(true);
        setIsError(false);
        fetchUsers();
    }, []);

    return { users, isLoading, isError, error };




}