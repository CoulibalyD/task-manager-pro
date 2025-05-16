"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { getToken } from "./token";

type User = {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
};

export const useCurrentUser = () => {
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
            .then((res) => {
                setUser(res.data);
            })
            .catch((err) => {
                setError("Erreur lors du chargement de l'utilisateur");
            })
            .finally(() => setLoading(false));
    }, []);

    return { user, loading, error };
};
