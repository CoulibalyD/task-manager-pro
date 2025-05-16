

"use client";

import Link from "next/link";
import { useUser } from "@/context/UserContext";
import { removeToken } from "@/lib/token";
import { useRouter } from "next/navigation";

export default function Navbar() {
    const { user, setUser, loading } = useUser();
    const router = useRouter();

    const handleLogout = () => {
        removeToken();
        setUser(null);
        /*router.push("/auth/login");
        router.refresh();*/
        window.location.href = "/";
    };

    // 🔒 Tant que loading est `true`, on ne rend rien
    if (loading) return null;

    return (
        <nav className="bg-gray-900 text-white px-4 py-3 flex justify-between items-center">
            <Link href="/" className="text-xl font-bold">
                TaskManager Pro
            </Link>

            {user && (
                <Link href="/tasks" className="text-sm font-bold">
                    Mes tâches
                </Link>
            )}

            <div className="flex items-center gap-4">
                {user ? (
                    <>
                        <span className="text-sm">
                            👤 {user.firstName} {user.lastName} ({user.role})
                        </span>
                        <button
                            onClick={handleLogout}
                            className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded text-sm transition-colors"
                        >
                            Déconnexion
                        </button>
                    </>
                ) : (
                    <>
                        <Link
                            href="/auth/login"
                            className="hover:underline text-sm transition-colors"
                        >
                            Connexion
                        </Link>
                        <Link
                            href="/auth/register"
                            className="hover:underline text-sm transition-colors"
                        >
                            Inscription
                        </Link>
                    </>
                )}
            </div>
        </nav>
    );
}
