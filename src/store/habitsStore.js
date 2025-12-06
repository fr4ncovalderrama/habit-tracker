import { create } from "zustand";
import { supabase } from "../lib/supabase";

export const useHabitsStore = create((set, get) => ({
  habits: [],

  // 🔹 Cargar hábitos desde Supabase
  fetchHabits: async () => {
    const { data, error } = await supabase.from("habits").select("*");

    if (!error) {
      set({ habits: data });
    } else {
      console.error("Error cargando hábitos:", error);
    }
  },

  // 🔹 Crear hábito → guardar en DB
  addHabit: async (habit) => {
    const { data, error } = await supabase
      .from("habits")
      .insert(habit)
      .select();

    if (error) {
      console.error("Error creando hábito:", error);
      return;
    }

    // agregar al estado local
    set((state) => ({
      habits: [...state.habits, data[0]],
    }));
  },

  deleteHabit: async (habitId) => {
    const { error } = await supabase.from("habits").delete().eq("id", habitId);

    if (error) {
      console.error("Error borrando hábito:", error);
      return;
    }

    set((state) => ({
      habits: state.habits.filter((h) => h.id !== habitId),
    }));
  },

  // 🔹 Marcar/desmarcar día en la DB
  toggleDay: async (habitId, dateKey) => {
    const habit = get().habits.find((h) => h.id === habitId);
    const completed = { ...habit.completed };

    completed[dateKey] = !completed[dateKey];

    const { data, error } = await supabase
      .from("habits")
      .update({ completed })
      .eq("id", habitId)
      .select();

    if (error) {
      console.error("Error actualizando día:", error);
      return;
    }

    set((state) => ({
      habits: state.habits.map((h) => (h.id === habitId ? data[0] : h)),
    }));
  },
}));
