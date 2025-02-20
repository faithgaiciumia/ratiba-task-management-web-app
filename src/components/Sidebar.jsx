import {
  Box,
  Button,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  IconButton,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  Link,
  useDisclosure,
  Spinner,
  useToast,
} from "@chakra-ui/react";
import useTaskStore from "../data/useTaskStore";
import {
  FaCalendar,
  FaEdit,
  FaEllipsisH,
  FaPlus,
  FaTimes,
  FaTrash,
} from "react-icons/fa";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
export default function Sidebar() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();
  //get all boards
  const fetchBoards = useTaskStore((state) => state.fetchBoards);
  const boards = useTaskStore((state) => state.boards);
  const loadingBoards = useTaskStore((state) => state.loadingBoards);
  useEffect(() => {
    fetchBoards();
  }, [fetchBoards]);

  //update board - rename
  const [editingBoardId, setEditingBoardId] = useState(null);
  const updateBoard = useTaskStore((state) => state.updateBoard);
  const handleRename = async (data) => {
    const boardId = editingBoardId;
    const updatedBoard = await updateBoard(boardId, data.boardName);
    if (updatedBoard) {
      setEditingBoardId(null);
      await fetchBoards();
    }
  };

  //delete board
  const deleteBoard = useTaskStore((state) => state.deleteBoard);
  const handleDelete = async (boardId) => {
    const deleteRes = await deleteBoard(boardId);
    if (deleteRes) {
      toast({
        title: "Board Deleted.",
        status: "success",
        duration: 6000,
        isClosable: true,
      });
      await fetchBoards();
      navigate("/");
    }
  };

  //add a new board and navigate to its new page
  const addBoard = useTaskStore((state) => state.addBoard);
  const { handleSubmit, register } = useForm();
  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const addedBoard = await addBoard({ boardName: data.boardName });
      if (addedBoard) {
        navigate(
          `/tasks/${addedBoard.recordId}/${encodeURIComponent(
            addedBoard.record.boardName
          )}`
        );
      }
    } catch (error) {
      console.error("error adding new board", error);
    } finally {
      setLoading(false);
      onClose();
    }
  };

  //functions for modal opening and closing
  const { isOpen, onOpen, onClose } = useDisclosure();

  //manage active and inactive links
  const location = useLocation();

  return (
    <Box
      backgroundColor={"white"}
      boxShadow={"lg"}
      p={4}
      w={"25%"}
      minH={"100vh"}
      h={"100%"}
      display={{ base: "none", md: "block" }}
    >
      <Button
        fontSize={"lg"}
        fontFamily={"Monomakh, serif"}
        variant={"ghost"}
        leftIcon={<FaCalendar />}
        onClick={() => navigate("/")}
        colorScheme="blue"
      >
        ratiba
      </Button>
      <Divider borderColor={"gray.500"} my={4} w={"100%"} />
      <Box my={12}>
        <Heading
          fontSize={"sm"}
          textTransform={"capitalize"}
          fontFamily={"'Atkinson Hyperlegible Next', serif"}
        >
          All boards ({boards.length})
        </Heading>
        <Divider borderColor={"gray.500"} my={2} />
        <Box maxH={"60vh"} overflowY={"auto"}>
          {loadingBoards && (
            <Flex align={"center"} justify={"center"}>
              <Spinner size={"lg"} color={"blue"} />
            </Flex>
          )}
          {boards.map((board) => (
            <Flex
              key={board._id}
              align={"center"}
              justify={"space-between"}
              gap={4}
            >
              <Link
                as={NavLink}
                py={4}
                w={"70%"}
                borderRadius={"lg"}
                to={`/tasks/${board._id}/${encodeURIComponent(
                  board.boardName
                )}`}
                color={
                  location.pathname ===
                  `/tasks/${board._id}/${encodeURIComponent(board.boardName)}`
                    ? "blue"
                    : "black"
                }
                fontWeight={
                  location.pathname ===
                  `/tasks/${board._id}/${encodeURIComponent(board.boardName)}`
                    ? "bold"
                    : "normal"
                }
                _hover={{
                  backgroundColor: "gray.100",
                  textDecoration: "underline",
                }}
              >
                {editingBoardId === board._id ? (
                  <form
                    onSubmit={handleSubmit(handleRename)}
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Input
                      defaultValue={board.boardName}
                      autoFocus
                      {...register("boardName")}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          handleSubmit(handleRename)();
                        }
                      }}
                    />
                    <IconButton
                      icon={<FaTimes />}
                      size={"sm"}
                      onClick={() => setEditingBoardId(null)}
                      ml={2}
                    />
                  </form>
                ) : (
                  <Text
                    textTransform={"capitalize"}
                    fontFamily={"'Atkinson Hyperlegible Mono', serif"}
                  >
                    {board.boardName}
                  </Text>
                )}
              </Link>
              {editingBoardId === null && (
                <Menu>
                  <MenuButton
                    as={IconButton}
                    icon={<FaEllipsisH />}
                    variant={"ghost"}
                    color={
                      location.pathname ===
                      `/tasks/${board._id}/${encodeURIComponent(
                        board.boardName
                      )}`
                        ? "blue"
                        : "black"
                    }
                  />
                  <MenuList>
                    <MenuItem>
                      <Button
                        w={"100%"}
                        onClick={() => setEditingBoardId(board._id)}
                        colorScheme="purple"
                        leftIcon={<FaEdit />}
                      >
                        Rename
                      </Button>
                    </MenuItem>
                    <MenuItem>
                      <Button
                        colorScheme="red"
                        leftIcon={<FaTrash />}
                        w={"100%"}
                        size={"sm"}
                        onClick={() => handleDelete(board._id)}
                      >
                        Delete Board
                      </Button>
                    </MenuItem>
                  </MenuList>
                </Menu>
              )}
            </Flex>
          ))}
        </Box>
        <Button
          leftIcon={<FaPlus />}
          colorScheme="blue"
          variant={"outline"}
          my={4}
          onClick={onOpen}
          fontFamily={"'Atkinson Hyperlegible Next', serif"}
        >
          Create new board
        </Button>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Add new board</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <form onSubmit={handleSubmit(onSubmit)}>
                <FormControl isRequired>
                  <FormLabel>Name</FormLabel>
                  <Input
                    placeholder="e.g. Birthday Preps"
                    {...register("boardName")}
                  />
                </FormControl>
                <Button
                  type="submit"
                  colorScheme="blue"
                  borderRadius={"3xl"}
                  w={"100%"}
                  my={4}
                  isLoading={loading}
                  loadingText="Creating..."
                >
                  Create board
                </Button>
              </form>
            </ModalBody>
          </ModalContent>
        </Modal>
      </Box>
    </Box>
  );
}
