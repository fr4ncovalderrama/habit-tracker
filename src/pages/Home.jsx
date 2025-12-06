import { useState } from "react";
import { Link } from "react-router-dom";
import HabitCard from "../components/HabitCard";
import AddHabitModal from "../components/AddHabitModal";
import { useHabitsStore } from "../store/habitsStore";
import { useEffect } from "react";

function Home() {
  const habits = useHabitsStore((state) => state.habits);
  const [modalOpen, setModalOpen] = useState(false);
  const fetchHabits = useHabitsStore((state) => state.fetchHabits);

  useEffect(() => {
    fetchHabits();
  }, []);

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between gap-2">
        <div>
          <h2 className="text-lg font-semibold tracking-tight">Tus hábitos</h2>
          <p className="text-xs text-zinc-500">
            Crea hábitos simples y sigue tu progreso diario.
          </p>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="text-xs rounded-full bg-zinc-50 text-zinc-900 px-3 py-1 font-medium hover:bg-zinc-200 transition"
        >
          + Nuevo hábito
        </button>
      </div>

      {/* Lista de hábitos */}
      {habits.length === 0 ? (
        <p className="text-sm text-zinc-500">
          Aún no tienes hábitos. Crea el primero con el botón de arriba.
        </p>
      ) : (
        <div className="space-y-3">
          {habits.map((habit) => (
            <Link
              key={habit.id}
              to={`/habit/${habit.id}`}
              className="block hover:opacity-90 transition"
            >
              <HabitCard habit={habit} />
            </Link>
          ))}
        </div>
      )}

      {/* Modal */}
      <AddHabitModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}

export default Home;
