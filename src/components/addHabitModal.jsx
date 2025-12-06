import { useState } from "react";
import { useHabitsStore } from "../store/habitsStore";

function AddHabitModal({ open, onClose }) {
  if (!open) return null;

  const addHabit = useHabitsStore((state) => state.addHabit);

  const [name, setName] = useState("");
  const [color, setColor] = useState("#3b82f6");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (name.trim() === "") return;

    // objeto que se guarda en Supabase
    const newHabit = {
      name,
      color,
      completed: {}, // JSON vacío
    };

    await addHabit(newHabit);

    // limpiar
    setName("");
    setColor("#3b82f6");

    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-zinc-900 border border-zinc-700 rounded-2xl p-6 w-full max-w-sm z-10 shadow-xl shadow-black/50">
        <h2 className="text-lg font-semibold mb-4">Crear nuevo hábito</h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Nombre */}
          <div className="space-y-1">
            <label className="text-sm text-zinc-300">Nombre del hábito</label>
            <input
              type="text"
              className="w-full rounded-xl bg-zinc-800 border border-zinc-700 px-3 py-2 text-sm focus:outline-none focus:border-zinc-500"
              placeholder="Ej: Tomar agua"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* Color */}
          <div className="space-y-1">
            <label className="text-sm text-zinc-300">Color</label>
            <input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="h-10 w-full rounded-xl bg-zinc-800 border border-zinc-700 cursor-pointer"
            />
          </div>

          {/* Botones */}
          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm rounded-xl border border-zinc-700 text-zinc-300 hover:bg-zinc-800"
            >
              Cancelar
            </button>

            <button
              type="submit"
              className="px-4 py-2 text-sm rounded-xl bg-zinc-50 text-zinc-900 font-medium hover:bg-zinc-200"
            >
              Crear hábito
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddHabitModal;
