import { create } from "zustand";

const useTaskStore = create((set) => ({
  tasks: JSON.parse(localStorage.getItem("tasks")) || [],
  addTask: (newTask) =>
    set((state) => {
      const updatedTasks = [...state.tasks, newTask];
      localStorage.setItem("tasks", JSON.stringify(updatedTasks)); // Save to local storage
      return { tasks: updatedTasks };
    }),
}));
export default useTaskStore;
