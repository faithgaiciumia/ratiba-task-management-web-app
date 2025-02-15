import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import useTaskStore from "../data/useTaskStore";
import { FaPlus } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
export default function Sidebar() {
  const boards = useTaskStore((state) => state.boards);
  const addBoard = useTaskStore((state) => state.addBoard);
  const { handleSubmit, register } = useForm();
  const onSubmit = (data) => {
    addBoard({ boardID: uuidv4(), boardName: data.boardName });
  };
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box
      backgroundColor={"gray.700"}
      color={"white"}
      borderRight={"1px solid gray"}
      py={4}
      pr={4}
      w={"25%"}
      h={"100vh"}
    >
      <Heading fontSize={"lg"} mx={4}>
        ratiba
      </Heading>
      <Box my={12}>
        <Text mx={4}>All boards ({boards.length})</Text>
        {boards.map((board) => (
          <Link key={board.boardID}>
            <Box
              backgroundColor={"blue.400"}
              my={4}
              p={2}
              borderRightRadius={"3xl"}
            >
              {board.boardName}
            </Box>
          </Link>
        ))}
        <Button
          leftIcon={<FaPlus />}
          colorScheme="blue"
          variant={"ghost"}
          my={4}
          onClick={onOpen}
        >
          Create new board
        </Button>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent backgroundColor={"gray.600"} color={"white"}>
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
