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
} from "@chakra-ui/react";
import useTaskStore from "../data/useTaskStore";
import { FaCalendar, FaEllipsisH, FaPlus, FaTrash } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import { useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
export default function Sidebar() {
  //get all boards
  const fetchBoards = useTaskStore((state) => state.fetchBoards);
  const boards = useTaskStore((state) => state.boards);
  useEffect(() => {
    fetchBoards();
  }, [fetchBoards]);

  //add a new board
  const addBoard = useTaskStore((state) => state.addBoard);
  const { handleSubmit, register } = useForm();
  const onSubmit = (data) => {
    addBoard({ boardID: uuidv4(), boardName: data.boardName });
  };
  const { isOpen, onOpen, onClose } = useDisclosure();

  //manage active and inactive links
  const location = useLocation();

  return (
    <Box
      backgroundColor={"white"}
      boxShadow={"lg"}
      p={4}
      w={"25%"}
      h={"100vh"}
      display={{ base: "none", md: "block" }}
    >
      <Button
        fontSize={"lg"}
        fontFamily={"Monomakh, serif"}
        variant={"ghost"}
        leftIcon={<FaCalendar />}
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
        {boards.map((board) => (
          <Link
            key={board._id}
            as={NavLink}
            to={`/tasks/${board._id}/${encodeURIComponent(board.boardName)}`}
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
          >
            <Flex
              my={4}
              p={2}
              borderRightRadius={"3xl"}
              align={"center"}
              justify={"space-between"}
            >
              <Text
                textTransform={"capitalize"}
                fontFamily={"'Atkinson Hyperlegible Mono', serif"}
              >
                {board.boardName}
              </Text>{" "}
              <Menu>
                <MenuButton
                  as={IconButton}
                  icon={<FaEllipsisH />}
                  variant={"ghost"}
                  color={
                    location.pathname ===
                    `/tasks/${board._id}/${encodeURIComponent(board.boardName)}`
                      ? "blue"
                      : "black"
                  }
                />
                <MenuList>
                  <MenuItem>
                    <Button
                      colorScheme="red"
                      leftIcon={<FaTrash />}
                      w={"100%"}
                      size={"sm"}
                    >
                      Delete Board
                    </Button>
                  </MenuItem>
                </MenuList>
              </Menu>
            </Flex>
          </Link>
        ))}
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
