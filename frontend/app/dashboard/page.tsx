"use client";

import PrivateRoute from "@/components/PrivateRoute";
import { removeToken } from "@/lib/token";
import { useRouter } from "next/navigation";
import { useCurrentUser } from "@/lib/useCurrentUser";

export default function DashboardPage() {
    const router = useRouter();
    const { user, loading, error } = useCurrentUser();

    const handleLogout = () => {
        removeToken();
        router.push("/auth/login");
    };

    if (loading) return <p className="text-white text-center mt-10">Chargement...</p>;
    if (error) return <p className="text-red-500 text-center mt-10">{error}</p>;

    return (
        <PrivateRoute>
            <main className="p-4">
                <h1 className="text-2xl font-bold mb-4">Bienvenue {user?.firstName} {user?.lastName} 👋</h1>
                <p>Email : {user?.email}</p>
                <p>Rôle : {user?.role}</p>
                <button
                    onClick={handleLogout}
                    className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                >
                    Se déconnecter
                </button>
            </main>
        </PrivateRoute>
    );
}
