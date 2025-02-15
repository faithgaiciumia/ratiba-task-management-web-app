import {
  Box,
  Button,
  Divider,
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
  useDisclosure,
} from "@chakra-ui/react";
import useTaskStore from "../data/useTaskStore";
import { FaCalendar, FaPlus } from "react-icons/fa";
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
          <Link key={board.boardID}>
            <Box
              my={4}
              p={2}
              borderRightRadius={"3xl"}
              textTransform={"capitalize"}
              fontFamily={"'Atkinson Hyperlegible Mono', serif"}
            >
              {board.boardName}
            </Box>
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
