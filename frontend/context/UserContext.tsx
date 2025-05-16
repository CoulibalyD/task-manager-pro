

"use client";

import {
    createContext,
    useContext,
    useEffect,
    useState,
    ReactNode,
    useMemo,
} from "react";
import axios from "axios";
import { getToken } from "@/lib/token";
import { User } from "@/types/user";

type UserContextType = {
    user: User | null;
    loading: boolean;
    error: string;
    setUser: (user: User | null) => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = (): UserContextType => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUser must be used within a UserProvider");
    }
    return context;
};

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const token = getToken();

        if (!token) {
            setLoading(false);
            return;
        }

        axios
            .get("http://localhost:8080/api/users/me", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => setUser(res.data))
            .catch(() =>
                setError("Impossible de récupérer les informations utilisateur")
            )
            .finally(() => setLoading(false));
    }, []);

    const value = useMemo(
        () => ({
            user,
            loading,
            error,
            setUser,
        }),
        [user, loading, error]
    );

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
