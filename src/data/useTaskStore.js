import { create } from "zustand";
import axios from "axios";

const URL = "http://localhost:4000/graphql";
const useTaskStore = create((set) => ({
  loadingBoards: false,
  boards: [],
  fetchBoards: async () => {
    set({ loadingBoards: true });
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
    } finally {
      set({ loadingBoards: false });
    }
  },
  addBoard: async (newBoard) => {
    try {
      const response = await axios.post(
        URL,
        {
          query: `mutation Mutation($record: CreateOneBoardInput!) {
                    newBoard(record: $record) {
                      record {
                        boardName
                      }
                      recordId
                    }
                  }`,
          variables: {
            record: newBoard,
          },
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      // console.log("added board", response.data.data.newBoard);
      return response.data.data.newBoard;
    } catch (error) {
      console.error("error adding board", error);
    }
  },
  updateBoard: async (boardId, newBoardName) => {
    try {
      const response = await axios.post(
        URL,
        {
          query: `mutation UpdateBoard($id: MongoID!, $record: UpdateByIdBoardInput!) {
  updateBoard(_id: $id, record: $record) {
    recordId
    record {
      boardName
    }
  }
}`,
          variables: {
            id: boardId,
            record: {
              boardName: newBoardName,
            },
          },
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("updated board", response.data.data.updateBoard);
      return response.data.data.updateBoard;
    } catch (error) {
      console.error("error updating board", error);
    }
  },

  tasks: [],
  loadingTasks: false,
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
                          status
                        }
                      }
                    }
                  }`,
          variables: {
            record: newTask,
          },
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("added task", response.data);
      return response.data.data.addTask.record;
    } catch (error) {
      console.error("error adding new task", error);
    }
  },

  getBoardTasks: async () => {
    set({ loadingTasks: true });
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
      status
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
    } finally {
      set({ loadingTasks: false });
    }
  },
  clearTasks: () =>
    set(() => {
      localStorage.removeItem("tasks");
      return { tasks: [] };
    }),
}));
export default useTaskStore;
