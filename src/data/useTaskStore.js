import { create } from "zustand";
import axios from "axios";

const URL = "http://localhost:4000/graphql";
const useTaskStore = create((set, get) => ({
  boards: [],
  fetchBoards: async () => {
    try {
      const response = await axios.post(
        URL,
        {
          query: `
          query {
            getBoards {
              id
              boardName
              boardTasks {
                id
                taskName
                taskStatus
                taskDescription
                taskSubTasks {
                  id
                  name
                }
              }
            }
          }
        `,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("boards", response.data);
      set({ boards: response.data.data.getBoards });
    } catch (error) {
      console.error("error fetching boards", error);
    }
  },
  addBoard: (newBoard) =>
    set((state) => {
      const updatedBoards = [...state.boards, newBoard];
      localStorage.setItem("boards", JSON.stringify(updatedBoards)); // Save to local storage
      return { boards: updatedBoards };
    }),
  tasks: [],
  addTask: (newTask) =>
    set((state) => {
      const updatedTasks = [...state.tasks, newTask];
      localStorage.setItem("tasks", JSON.stringify(updatedTasks)); // Save to local storage
      return { tasks: updatedTasks };
    }),
  getTaskByBoardId: (boardID) => {
    return get().tasks.filter((task) => task.boardID === boardID);
  },
  clearTasks: () =>
    set(() => {
      localStorage.removeItem("tasks");
      return { tasks: [] };
    }),
}));
export default useTaskStore;
