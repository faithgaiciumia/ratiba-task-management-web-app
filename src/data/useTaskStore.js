import { create } from "zustand";
import axios from "axios";

const URL = "http://localhost:4000/graphql";
const useTaskStore = create((set) => ({
  boards: [],
  fetchBoards: async () => {
    try {
      const response = await axios.post(
        URL,
        {
          query: `
          query GetBoards {
              getBoards {
              boardName
              _id
            }
          }`,
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
  addTask: async (newTask) => {
    try {
      const response = await axios.post(
        URL,
        {
          query: `mutation AddTask($record: CreateOneTaskInput!) {
                    addTask(record: $record) {
                      record {
                        boardID
                        taskName
                        taskDescription
                        taskStatus
                        _id
                        taskSubTasks {
                          name
                        }
                      }
                    }
                  }`,
          variables: {
            input: newTask,
          },
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("added task", response.data);
    } catch (error) {
      console.error("error adding new task", error);
    }
  },

  getBoardTasks: async () => {
    try {
      const response = await axios.post(
        URL,
        {
          query: `query GetBoardTasks {
  getBoardTasks {
    taskName
    boardID
    taskDescription
    taskStatus
    taskSubTasks {
      name
    }
    _id
  }
}`,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("tasks", response.data);
      set({ tasks: response.data.data.getBoardTasks });
    } catch (error) {
      console.error("error fetching tasks", error);
    }
  },
  clearTasks: () =>
    set(() => {
      localStorage.removeItem("tasks");
      return { tasks: [] };
    }),
}));
export default useTaskStore;
