
"use client";

import { useForm } from "react-hook-form";
import axios from "axios";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {decodeToken, getToken, setToken} from "@/lib/token";
import {useUser} from "@/context/UserContext";

type RegisterForm = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
};

export default function RegisterPage() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterForm>();

    const [error, setError] = useState("");
    const router = useRouter();
    const {setUser} = useUser();

    useEffect(() => {
        const token = getToken();
        if (token) {
            router.push("/dashboard");
        }
    }, [router]); // <- Ajout de [router] dans le tableau de dépendances

    const onSubmit = async (data: RegisterForm) => {
        try {
            setError("");
            const payload = {
                ...data,
                role: "USER", // Ajout automatique du rôle
            };

            const response =  await axios.post("http://localhost:8080/api/auth/register", payload);
            if (response.data.token) {
                setToken(response.data.token);
                const decodedUser = decodeToken(response.data.token);
                setUser(decodedUser);
                router.push("/tasks");
            }
        } catch (err: any) {
            setError(err?.response?.data?.message || "Erreur lors de l'inscription");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-950 px-4">
            <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded-xl shadow-md w-full max-w-sm">
                <h1 className="text-2xl text-gray-900 font-bold mb-4 text-center">Inscription</h1>

                {error && <p className="text-red-600 text-sm mb-2 text-center">{error}</p>}

                <div className="mb-4">
                    <label className="block mb-1 text-sm font-medium text-gray-800">Prénom</label>
                    <input
                        type="text"
                        {...register("firstName", { required: "Prénom requis" })}
                        className="w-full border rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName.message}</p>}
                </div>

                <div className="mb-4">
                    <label className="block mb-1 text-sm font-medium text-gray-800">Nom</label>
                    <input
                        type="text"
                        {...register("lastName", { required: "Nom requis" })}
                        className="w-full border rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName.message}</p>}
                </div>

                <div className="mb-4">
                    <label className="block mb-1 text-sm font-medium text-gray-800">Email</label>
                    <input
                        type="email"
                        {...register("email", { required: "Email requis" })}
                        className="w-full border rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                </div>

                <div className="mb-4">
                    <label className="block mb-1 text-sm font-medium text-gray-800">Mot de passe</label>
                    <input
                        type="password"
                        {...register("password", { required: "Mot de passe requis" })}
                        className="w-full border rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                >
                    S'inscrire
                </button>
            </form>
        </div>
    );
}

