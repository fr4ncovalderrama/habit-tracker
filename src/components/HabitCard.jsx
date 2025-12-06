import { useHabitsStore } from "../store/habitsStore";
import { getTodayKey } from "../utils/dateUtils";

function HabitCard({ habit }) {
  const toggleDay = useHabitsStore((state) => state.toggleDay);
  const todayKey = getTodayKey();

  const isCompletedToday = habit.completed[todayKey] === true;

  return (
    <div className="flex items-center justify-between gap-3 rounded-2xl border border-zinc-800 bg-zinc-900/60 px-4 py-3">
      <div className="flex items-center gap-3">
        <span
          className="h-8 w-8 rounded-full"
          style={{ backgroundColor: habit.color || "#3b82f6" }}
        />
        <div>
          <p className="text-sm font-medium text-white">{habit.name}</p>
          <p className="text-xs text-white/80">
            Hoy:{" "}
            <span
              className={isCompletedToday ? "text-green-400" : "text-zinc-400"}
            >
              {isCompletedToday ? "Completado" : "Pendiente"}
            </span>
          </p>
        </div>
      </div>

      <button
        onClick={() => toggleDay(habit.id, todayKey)}
        className={`text-xs rounded-full px-3 py-1 font-medium transition border 
        ${
          isCompletedToday
            ? "border-green-400 bg-green-500/20 text-green-300"
            : "border-zinc-700 hover:border-zinc-500 hover:bg-zinc-800 text-white/80"
        }
      `}
      >
        {isCompletedToday ? "Desmarcar" : "Marcar hoy"}
      </button>
    </div>
  );
}

export default HabitCard;
