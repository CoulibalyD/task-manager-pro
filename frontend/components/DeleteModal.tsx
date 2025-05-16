import {Task} from "@/types/task";

export const DeleteModal = ({
                         task,
                         onCancel,
                         onConfirm
                     }: {
    task: Task;
    onCancel: () => void;
    onConfirm: () => void;
}) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 p-6 rounded shadow-lg w-full max-w-md">
                <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">
                    Supprimer la tâche
                </h2>
                <p className="mb-4 text-sm text-gray-700 dark:text-gray-300">
                    Êtes-vous sûr de vouloir supprimer <strong>{task.title}</strong> ?
                </p>
                <div className="flex justify-end gap-4">
                    <button
                        onClick={onCancel}
                        className="px-4 py-2 text-sm bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
                    >
                        Annuler
                    </button>
                    <button
                        onClick={onConfirm}
                        className="px-4 py-2 text-sm bg-red-600 text-white rounded hover:bg-red-700"
                    >
                        Supprimer
                    </button>
                </div>
            </div>
        </div>
    );
};
