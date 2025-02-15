import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import Sidebar from "../components/Sidebar";
import TopNav from "../components/TopNav";
import useTaskStore from "../data/useTaskStore";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const boards = useTaskStore((state) => state.boards);
  const navigate = useNavigate();
  return (
    <Box backgroundColor={"gray.900"} minH={"100vh"}>
      <Flex>
        <Sidebar />
        <Box w={"100%"}>
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
