import { create } from "zustand";

const useTaskStore = create((set) => ({
  tasks: [],
  addTask: (newTask) =>
    set((state) => ({
      tasks: [...state.tasks, newTask],
    })),
}));
export default useTaskStore;
