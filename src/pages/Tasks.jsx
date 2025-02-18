import { Box, Flex } from "@chakra-ui/react";
import TopNav from "../components/TopNav";
import Sidebar from "../components/Sidebar";
import { useParams } from "react-router-dom";
import useTaskStore from "../data/useTaskStore";
import TodoCategoryView from "../components/TodoCategoryView";
import DoingCategoryView from "../components/DoingCategoryView";
import DoneCategoryView from "../components/DoneCategoryView";
import { useEffect } from "react";
export default function Tasks() {
  const { id, boardName } = useParams();
  const getBoardTasks = useTaskStore((state) => state.getBoardTasks);
  useEffect(() => {
    getBoardTasks();
  }, [getBoardTasks]);
  const tasks = useTaskStore((state) => state.tasks);

  const todoTasks = tasks.filter((task) => task.taskStatus === "TODO");
  const doneTasks = tasks.filter((task) => task.taskStatus === "done");
  const doingTasks = tasks.filter((task) => task.taskStatus === "doing");

  return (
    <Box backgroundColor={"blue.100"} minH={"100vh"}>
      <Flex>
        <Sidebar />
        <Box w={"100%"}>
          <TopNav boardName={boardName} boardID={id} />
          <Flex gap={6} my={4} p={4} overflowX={"auto"}>
            <TodoCategoryView todoTasks={todoTasks} />
            <DoingCategoryView doingTasks={doingTasks} />
            <DoneCategoryView doneTasks={doneTasks} />
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
}
