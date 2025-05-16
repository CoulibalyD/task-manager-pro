
"use client";

import { useForm } from "react-hook-form";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {useUser} from "@/context/UserContext";
import {decodeToken} from "@/lib/token";

type LoginForm = {
    email: string;
    password: string;
};

export default function LoginPage() {
    const router = useRouter(); // <-- Ajouté ici
    const {setUser} = useUser();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginForm>();
    const [error, setError] = useState("");

    const onSubmit = async (data: LoginForm) => {
        setError("");
        try {
            const response = await axios.post("http://localhost:8080/api/auth/login", data);
            const token = response.data.token;

            if (token) {
                localStorage.setItem("token", token);
                const decodeUser = decodeToken(token);
                setUser(decodeUser);
                console.log("Redirection en cours...");
                setTimeout(() => {
                    router.push("/tasks");
                }, 50);
            }
            else {
                setError("Réponse invalide du serveur");
            }
        } catch (err: any) {
            setError(err?.response?.data?.message || "Identifiants invalides");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-950 px-4">
            <form onSubmit={handleSubmit(onSubmit)} className="bg-gray-200 p-6 rounded-xl shadow-md w-full max-w-sm">
                <h1 className="text-2xl text-gray-950 font-bold mb-4 text-center">Connexion</h1>

                {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

                <div className="mb-4">
                    <label className="block mb-1 text-gray-950 text-sm font-medium">Email</label>
                    <input
                        type="email"
                        {...register("email", { required: "Email requis" })}
                        className="w-full border rounded-lg px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                </div>

                <div className="mb-4">
                    <label className="block mb-1 text-sm text-gray-950 font-medium">Mot de passe</label>
                    <input
                        type="password"
                        {...register("password", { required: "Mot de passe requis" })}
                        className="w-full border text-gray-800 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                >
                    Se connecter
                </button>
            </form>
        </div>
    );
}

