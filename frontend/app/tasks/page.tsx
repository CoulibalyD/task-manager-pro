// app/tasks/page.tsx
"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { getToken } from "@/lib/token";
import { format } from "date-fns";
import TaskForm from "@/app/tasks/form";
import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import {DeleteModal} from "@/components/DeleteModal";

type Task = {
    id: number;
    title: string;
    description: string;
    dueDate: string;
    completed: boolean;
};

export default function TasksPage() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [editingTask, setEditingTask] = useState<Task | null>(null);
    const [error, setError] = useState("");
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState<"all" | "completed" | "pending">("all");
    const [showModal, setShowModal] = useState(false);
    const [taskToDelete, setTaskToDelete] = useState<Task | null>(null);

    const { user } = useUser();
    const router = useRouter();

    const fetchTasks = async () => {
        try {
            const token = getToken();
            const response = await axios.get("http://localhost:8080/api/tasks/me", {
                headers: { Authorization: `Bearer ${token}` },
            });
            setTasks(response.data);
            setEditingTask(null);
        } catch (err) {
            setError("Erreur lors du chargement des tâches");
        }
    };

    useEffect(() => {
        if (!user) {
            router.push("auth/login");
        }
    }, [user]);

    useEffect(() => {
        fetchTasks();
    }, []);

    const handleCompleteChange = async (task: Task) => {
        const token = getToken();
        try {
            await axios.put(
                `http://localhost:8080/api/tasks/${task.id}`,
                { ...task, completed: !task.completed },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            toast.success("Tâche mise à jour !");
            fetchTasks();
        } catch (err) {
            toast.error("Erreur lors de la mise à jour");
        }
    };

    const handleDelete = async () => {
        if (!taskToDelete) return;
        const token = getToken();
        try {
            await axios.delete(`http://localhost:8080/api/tasks/${taskToDelete.id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            toast.success("Tâche supprimée !");
            fetchTasks();
        } catch (err) {
            toast.error("Erreur lors de la suppression de la tâche");
        } finally {
            setShowModal(false);
            setTaskToDelete(null);
        }
    };

    const filteredTasks = tasks
        .filter((task) => task.title?.toLowerCase().includes(search.toLowerCase()))
        .filter((task) => {
            if (filter === "completed") return task.completed;
            if (filter === "pending") return !task.completed;
            return true;
        });

    return (
        <main className="p-6 max-w-2xl mx-auto">
            <Toaster />
            <h1 className="text-2xl font-bold mb-4">Mes Tâches</h1>

            {error && <p className="text-red-500">{error}</p>}

            <TaskForm
                task={editingTask || undefined}
                editing={!!editingTask}
                onSuccess={() => {
                    fetchTasks();
                    toast.success(editingTask ? "Tâche modifiée !" : "Tâche ajoutée !");
                }}
            />

            <div className="mt-6 flex flex-col sm:flex-row gap-4">
                <input
                    type="text"
                    placeholder="Rechercher une tâche..."
                    className="input w-full p-2 border rounded"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <select
                    className="p-2 border rounded bg-gray-700"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value as any)}
                >
                    <option value="all">Toutes</option>
                    <option value="completed">Terminées</option>
                    <option value="pending">Non terminées</option>
                </select>
            </div>

            <ul className="space-y-4 mt-6">
                {filteredTasks.map((task) => (
                    <li
                        key={task.id}
                        className={`p-4 rounded shadow ${
                            task.completed ? "bg-gray-400" : "bg-white dark:bg-gray-800"
                        }`}
                    >
                        <div className="flex justify-between items-center mb-2">
                            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                                {task.title || "Sans titre"}
                                {task.completed && <span className="text-green-600 ml-2">(terminée)</span>}
                            </h2>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => setEditingTask(task)}
                                    className="bg-yellow-500 text-white text-sm px-2 py-1 rounded hover:bg-yellow-600"
                                >
                                    Modifier
                                </button>
                                <button
                                    onClick={() => {
                                        setTaskToDelete(task);
                                        setShowModal(true);
                                    }}
                                    className="bg-red-500 text-white text-sm px-2 py-1 rounded hover:bg-red-600"
                                >
                                    Supprimer
                                </button>
                            </div>
                        </div>

                        <p className="text-sm text-gray-700 dark:text-gray-300">{task.description}</p>
                        <p className="text-xs text-gray-500 mt-1">
                            Pour le : {format(new Date(task.dueDate), "dd/MM/yyyy")}
                        </p>

                        <label className="flex items-center gap-2 text-sm mt-2">
                            <input
                                type="checkbox"
                                checked={task.completed}
                                onChange={() => handleCompleteChange(task)}
                            />
                            Tâche terminée
                        </label>
                    </li>
                ))}
            </ul>

            {showModal && taskToDelete && (
                <DeleteModal
                    task={taskToDelete}
                    onCancel={() => setShowModal(false)}
                    onConfirm={handleDelete}
                />
            )}
        </main>
    );
}
