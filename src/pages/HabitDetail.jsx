import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useHabitsStore } from "../store/habitsStore";
import CalendarGrid from "../components/CalendarGrid";
import DeleteHabitModal from "../components/DeleteHabitModal";

function HabitDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const habits = useHabitsStore((state) => state.habits);
  const fetchHabits = useHabitsStore((state) => state.fetchHabits);

  const [deleteOpen, setDeleteOpen] = useState(false);

  // cargar hábitos si aún no están cargados
  useEffect(() => {
    if (habits.length === 0) {
      fetchHabits();
    }
  }, []);

  const habit = habits.find((h) => h.id === id);

  // si el hábito no existe
  if (!habit) {
    return (
      <div className="p-4 text-zinc-300">
        <p>Ese hábito no existe o fue eliminado.</p>
        <button
          onClick={() => navigate("/")}
          className="mt-4 px-4 py-2 text-sm rounded-xl bg-zinc-50 text-zinc-900 font-medium hover:bg-zinc-200"
        >
          Volver al inicio
        </button>
      </div>
    );
  }

  const now = new Date();

  return (
    <div className="space-y-6">
      {/* VOLVER */}
      <Link to="/" className="text-sm text-zinc-400 hover:underline">
        ← Volver
      </Link>

      {/* HEADER DEL HABITO */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold tracking-tight flex items-center gap-3 text-white">
          <span
            className="h-5 w-5 rounded-full"
            style={{ backgroundColor: habit.color }}
          />
          {habit.name}
        </h2>

        <button
          onClick={() => setDeleteOpen(true)}
          className="px-3 py-1 text-sm rounded-xl bg-red-600 text-white hover:bg-red-500"
        >
          Borrar hábito
        </button>
      </div>

      {/* CALENDARIO */}
      <CalendarGrid
        habit={habit}
        year={now.getFullYear()}
        month={now.getMonth()}
      />

      {/* MODAL DE BORRADO */}
      <DeleteHabitModal
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        habit={habit}
      />
    </div>
  );
}

export default HabitDetail;
