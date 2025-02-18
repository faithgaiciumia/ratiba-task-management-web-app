import { Box, Flex, Heading, Spinner } from "@chakra-ui/react";
import TopNav from "../components/TopNav";
import Sidebar from "../components/Sidebar";
import { useParams } from "react-router-dom";
import useTaskStore from "../data/useTaskStore";
import TodoCategoryView from "../components/TodoCategoryView";
import DoingCategoryView from "../components/DoingCategoryView";
import DoneCategoryView from "../components/DoneCategoryView";
import { useEffect } from "react";

export default function Tasks() {
  //receive id and boardname from home or sidebar
  const { id, boardName } = useParams();

  //get all tasks
  const getBoardTasks = useTaskStore((state) => state.getBoardTasks);
  const loadingTasks = useTaskStore((state) => state.loadingTasks);
  const tasks = useTaskStore((state) => state.tasks);
  useEffect(() => {
    getBoardTasks();
  }, [getBoardTasks]);

  //filter only for a single board
  const currentBoardTasks = tasks.filter((task) => task.boardID === id);

  const todoTasks = currentBoardTasks.filter(
    (task) => task.taskStatus === "TODO"
  );
  const doneTasks = currentBoardTasks.filter(
    (task) => task.taskStatus === "done"
  );
  const doingTasks = currentBoardTasks.filter(
    (task) => task.taskStatus === "doing"
  );

  return (
    <Box backgroundColor={"blue.100"} minH={"100vh"}>
      <Flex>
        <Sidebar />
        <Box w={"100%"}>
          <TopNav boardName={boardName} boardID={id} />
          {loadingTasks && (
            <Flex justify={"center"} align={"center"}>
              <Spinner size={"lg"} color={"blue"} />
            </Flex>
          )}
          {currentBoardTasks.length > 0 ? (
            <Flex gap={6} my={4} p={4} overflowX={"auto"}>
              <TodoCategoryView todoTasks={todoTasks} />
              <DoingCategoryView doingTasks={doingTasks} />
              <DoneCategoryView doneTasks={doneTasks} />
            </Flex>
          ) : (
            <Flex justify={"center"} align={"center"} p={4}>
              <Heading
                fontSize={"lg"}
                fontFamily={"'Atkinson Hyperlegible Next', serif"}
              >
                No tasks added yet 😞
              </Heading>
            </Flex>
          )}
        </Box>
      </Flex>
    </Box>
  );
}
