
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { UserProvider } from "@/context/UserContext";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "TaskManager Pro",
    description: "Plateforme de gestion de tâches collaborative",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="fr">
        <body className={inter.className}>
        <UserProvider>
            <Navbar />
            {children}
        </UserProvider>
        </body>
        </html>
    );
}
