import axios from 'axios';
import environement from "@/env/environement";

const instance = axios.create({
    baseURL: environement.apiUrl,
});

instance.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default instance;
