"use client";

import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useEffect } from 'react';
import {getToken} from "@/lib/token";

type Task = {
    id?: number;
    title: string;
    description: string;
    dueDate: string;
    completed: boolean;
};

export default function TaskForm({
                                     task,
                                     editing = false,
                                     onSuccess,
                                 }: {
    task?: Task;
    editing?: boolean;
    onSuccess?: () => void;
}) {
    const { register, handleSubmit, setValue } = useForm<Task>({
        defaultValues: {
            title: '',
            description: '',
            dueDate: new Date().toISOString().split('T')[0],
            completed: false,
        },
    });

    useEffect(() => {
        if (task) {
            setValue('title', task.title);
            setValue('description', task.description);
            setValue('dueDate', task.dueDate.split('T')[0]);
            setValue('completed', task.completed);
        }
    }, [task, setValue]);

    const token = getToken();
    console.log("TOKEN =>:::::::", token);

    const config = {
        headers: {Authorization:  `Bearer ${token}`},
    };
    const onSubmit = async (data: Task) => {
        const payload = {
            ...data,
            dueDate: `${data.dueDate}T00:00:00`,
        };

        if (editing && task?.id) {
            await axios.put(`http://localhost:8080/api/tasks/${task.id}`, payload, config);
        } else {
            await axios.post('http://localhost:8080/api/tasks', payload, config);
        }

        onSuccess?.(); // callback pour rafraîchir les tâches
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-4 bg-gray-50 dark:bg-gray-900 rounded shadow">
            <input {...register('title', { required: true })} placeholder="Titre" className="input w-full p-2 border rounded" />
            <textarea {...register('description')} placeholder="Description" className="textarea w-full p-2 border rounded" />
            <input type="date" {...register('dueDate')} className="input w-full p-2 border rounded" />
            <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" {...register('completed')} />
                Tâche terminée
            </label>
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full">
                {editing ? 'Modifier la tâche' : 'Ajouter la tâche'}
            </button>
        </form>
    );
}
