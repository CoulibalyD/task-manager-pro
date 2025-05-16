// lib/token.ts
export  const setToken = (token: string) => {
    localStorage.setItem("token", token);
}

export const getToken = () => {
    if(typeof window !== "undefined"){
        return localStorage.getItem("token");
    }
    return null;
}

export const removeToken = () => {
    if (typeof window !== "undefined") {
        localStorage.removeItem("token");
    }
};

export function decodeToken(token: string) {
    if (!token) return null;

    const payload = token.split('.')[1];
    const decoded = atob(payload);
    return JSON.parse(decoded);
}
