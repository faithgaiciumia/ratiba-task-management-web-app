import { Box, Flex, Heading, Spinner, Text } from "@chakra-ui/react";
import Sidebar from "../components/Sidebar";
import useTaskStore from "../data/useTaskStore";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function Home() {
  //get all boards
  const fetchBoards = useTaskStore((state) => state.fetchBoards);
  const loadingBoards = useTaskStore((state) => state.loadingBoards);
  const boards = useTaskStore((state) => state.boards);
  useEffect(() => {
    fetchBoards();
  }, [fetchBoards]);
  const navigate = useNavigate();
  return (
    <Box backgroundColor={"blue.100"} minH={"100vh"}>
      <Flex>
        <Sidebar />
        <Box w={{ base: "100%", md: "75%" }}>
          <Box
            backgroundColor={"white"}
            p={4}
            boxShadow={"lg"}
            m={2}
            borderRadius={"md"}
          >
            <Flex justify={"center"} align={"center"}>
              <Heading
                fontSize={"lg"}
                textTransform={"capitalize"}
                fontFamily={"'Atkinson Hyperlegible Next', serif"}
              >
                ratiba tasks manager
              </Heading>
            </Flex>
          </Box>
          <Flex justify={"center"} align={"center"} p={4}>
            <Heading
              fontSize={"md"}
              fontFamily={"'Atkinson Hyperlegible Next', serif"}
            >
              All Boards
            </Heading>
          </Flex>
          <Flex p={4} gap={6} flexWrap={"wrap"}>
            {loadingBoards && <Spinner size={"lg"} color={"blue"} />}
            {boards.map((board) => (
              <Box
                key={board.id}
                borderRadius={"lg"}
                boxShadow={"lg"}
                backgroundColor={"white"}
                p={4}
                maxW={"250px"}
                onClick={() =>
                  navigate(`/tasks/${board._id}/${board.boardName}`)
                }
                cursor={"pointer"}
                transition={"transform 0.2s ease-in-out"}
                _hover={{ transform: "scale(1.1)", boxShadow: "xl" }}
              >
                <Text
                  fontFamily={"'Atkinson Hyperlegible Mono', serif"}
                  textTransform={"capitalize"}
                >
                  {board.boardName}
                </Text>
              </Box>
            ))}
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
}
