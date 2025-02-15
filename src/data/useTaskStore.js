import { create } from "zustand";

const useTaskStore = create((set, get) => ({
  boards: JSON.parse(localStorage.getItem("boards")) || [],
  addBoard: (newBoard) =>
    set((state) => {
      const updatedBoards = [...state.boards, newBoard];
      localStorage.setItem("boards", JSON.stringify(updatedBoards)); // Save to local storage
      return { boards: updatedBoards };
    }),
  tasks: JSON.parse(localStorage.getItem("tasks")) || [],
  addTask: (newTask) =>
    set((state) => {
      const updatedTasks = [...state.tasks, newTask];
      localStorage.setItem("tasks", JSON.stringify(updatedTasks)); // Save to local storage
      return { tasks: updatedTasks };
    }),
  getTaskByBoardId: (boardID) => {
    return get().tasks.filter((task) => task.boardID === boardID);
  },
}));
export default useTaskStore;
