/*

const handleDelete = (id: number) => {
    toast((t) => (
        <span className="text-sm p-3 ">
            Confirmer la suppression ?
            <div className="mt-2 flex justify-end gap-2">
                <button
                    onClick={() => {
                        toast.dismiss(t.id);
                        confirmDelete(id);
                    }}
                    className="px-2 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600"
                >
                    Oui
                </button>
                <button
                    onClick={() => toast.dismiss(t.id)}
                    className="px-2 py-1 bg-gray-300 text-gray-800 rounded text-sm hover:bg-gray-400"
                >
                    Non
                </button>
            </div>
        </span>
    ), {
        duration: 5000,
    });
};

const confirmDelete = async (id: number) => {
    const token = getToken();
    try {
        await axios.delete(`http://localhost:8080/api/tasks/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        toast.success("Tâche supprimée !");
        fetchTasks();
    } catch (err) {
        toast.error("Erreur lors de la suppression de la tâche");
    }
};*/
