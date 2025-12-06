import { useHabitsStore } from "../store/habitsStore";

function DeleteHabitModal({ open, onClose, habit }) {
  if (!open || !habit) return null;

  const deleteHabit = useHabitsStore((state) => state.deleteHabit);

  const handleDelete = async () => {
    await deleteHabit(habit.id);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative bg-zinc-900 border border-zinc-700 rounded-2xl p-6 w-full max-w-sm z-10 shadow-xl shadow-black/50">
        <h2 className="text-lg font-semibold mb-4">Eliminar hábito</h2>

        <p className="text-sm text-zinc-300 mb-6">
          ¿Estás seguro de que quieres eliminar el hábito{" "}
          <span className="font-medium text-zinc-100">{habit.name}</span>? Esta
          acción no se puede deshacer.
        </p>

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm rounded-xl border border-zinc-700 text-zinc-300 hover:bg-zinc-800"
          >
            Cancelar
          </button>

          <button
            onClick={handleDelete}
            className="px-4 py-2 text-sm rounded-xl bg-red-600 text-white font-medium hover:bg-red-500"
          >
            Borrar
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteHabitModal;
