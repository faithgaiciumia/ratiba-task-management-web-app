import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import Sidebar from "../components/Sidebar";
import TopNav from "../components/TopNav";
import useTaskStore from "../data/useTaskStore";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function Home() {
  //get all boards
  const fetchBoards = useTaskStore((state) => state.fetchBoards);
  const boards = useTaskStore((state) => state.boards);
  useEffect(() => {
    fetchBoards();
  }, [fetchBoards]);
  const navigate = useNavigate();
  return (
    <Box backgroundColor={"blue.100"} minH={"100vh"}>
      <Flex>
        <Sidebar />
        <Box w={"75%"}>
          <TopNav />
          <Flex justify={"center"} align={"center"} p={4}>
            <Heading fontSize={"md"} color={"white"}>
              All Boards
            </Heading>
          </Flex>
          <Flex p={4} gap={6}>
            {boards.map((board) => (
              <Box
                key={board.boardID}
                borderRadius={"lg"}
                boxShadow={"lg"}
                backgroundColor={"gray.300"}
                p={4}
                maxW={"250px"}
                onClick={() =>
                  navigate(`/tasks/${board.boardID}/${board.boardName}`)
                }
              >
                <Text>{board.boardName}</Text>
              </Box>
            ))}
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
}
