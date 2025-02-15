/* eslint-disable react/prop-types */
import {
  Box,
  Button,
  Flex,
  Heading,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { FaEllipsisV, FaPlus } from "react-icons/fa";
import NewTaskForm from "./NewTaskForm";

export default function TopNav({boardName, boardID}) {
  const { onOpen, isOpen, onClose } = useDisclosure();
  return (
    <Box backgroundColor={"gray.700"} p={4} color={"white"} borderBottom={"1px solid gray"} w={"100%"}>
      <Flex justify={"space-between"} align={"center"}>
        <Heading fontSize={"lg"} textTransform={"capitalize"}>{boardName}</Heading>
        <Flex align={"center"}>
          <Button
            colorScheme="blue"
            borderRadius={"3xl"}
            size={"sm"}
            leftIcon={<FaPlus />}
            onClick={onOpen}
          >
            add new task
          </Button>
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent backgroundColor={"gray.600"} color={"white"}>
              <ModalHeader>Add new task</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <NewTaskForm boardID={boardID}/>
              </ModalBody>
            </ModalContent>
          </Modal>
          <IconButton
            aria-label="extra-menu"
            variant={"ghost"}
            colorScheme="white"
          >
            <FaEllipsisV />
          </IconButton>
        </Flex>
      </Flex>
    </Box>
  );
}
