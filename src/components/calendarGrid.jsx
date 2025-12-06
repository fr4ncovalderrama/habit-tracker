import { getDaysInMonth, startOfMonth, format } from "date-fns";
import { es } from "date-fns/locale";
import { getTodayKey } from "../utils/dateUtils";
import { useHabitsStore } from "../store/habitsStore";

function CalendarGrid({ habit, year, month }) {
  const todayKey = getTodayKey();

  const toggleDay = useHabitsStore((state) => state.toggleDay);

  const date = new Date(year, month);
  const daysInMonth = getDaysInMonth(date);

  const startDay = startOfMonth(date).getDay();
  // 0: Domingo, 1: Lunes, etc

  const daysArray = [];

  // Espacios vacíos antes del 1 del mes:
  for (let i = 0; i < (startDay === 0 ? 6 : startDay - 1); i++) {
    daysArray.push(null);
  }

  // Días del mes:
  for (let d = 1; d <= daysInMonth; d++) {
    daysArray.push(d);
  }

  const isCompleted = (day) => {
    const key = `${year}-${String(month + 1).padStart(2, "0")}-${String(
      day
    ).padStart(2, "0")}`;
    return habit.completed[key] === true;
  };

  return (
    <div>
      {/* Nombre del mes */}
      <h3 className="text-md font-semibold tracking-tight mb-4 capitalize text-white">
        {format(date, "MMMM yyyy", { locale: es })}
      </h3>

      {/* Cabecera días */}
      <div className="grid grid-cols-7 text-center text-xs text-zinc-400 mb-2">
        <span>Lun</span>
        <span>Mar</span>
        <span>Mié</span>
        <span>Jue</span>
        <span>Vie</span>
        <span>Sáb</span>
        <span>Dom</span>
      </div>

      {/* Grilla del mes */}
      <div className="grid grid-cols-7 gap-2">
        {daysArray.map((day, index) => {
          if (day === null) {
            return <div key={index} className="h-10" />;
          }

          const completed = isCompleted(day);

          // Generar la key de la fecha correspondiente a este día
          const dayKey = `${year}-${String(month + 1).padStart(
            2,
            "0"
          )}-${String(day).padStart(2, "0")}`;
          // Obtener la fecha de hoy para comparar
          const today = new Date();
          const cellDate = new Date(year, month, day);
          // Solo permitir marcar días anteriores a hoy
          const isPastDay =
            cellDate <
            new Date(today.getFullYear(), today.getMonth(), today.getDate());
          return (
            <div
              key={index}
              onClick={
                isPastDay ? () => toggleDay(habit.id, dayKey) : undefined
              }
              className={`h-10 flex items-center justify-center rounded-lg border transition
                ${
                  completed
                    ? "bg-green-600 text-white border-green-500"
                    : isPastDay
                    ? "border-zinc-700 text-zinc-400 hover:bg-zinc-800 cursor-pointer"
                    : "border-zinc-800 text-zinc-700 bg-zinc-900 cursor-not-allowed opacity-50"
                }
              `}
            >
              {day}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default CalendarGrid;
