"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getToken } from "@/lib/token";

type Props = {
    children: React.ReactNode;
};

export default function PrivateRoute({ children }: Props) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const token = getToken();
        if (!token) {
            router.push("/login");
        } else {
            setIsLoading(false);
        }
    }, [router]);

    if (isLoading) {
        return <p className="text-white text-center mt-10">Chargement...</p>;
    }

    return <>{children}</>;
}
