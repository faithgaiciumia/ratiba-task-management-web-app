/* eslint-disable react/prop-types */
import {
  Box,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";

export default function TaskDisplayCard({ taskTitle, subTasks }) {
  const { onOpen, isOpen, onClose } = useDisclosure();
  return (
    <Box
      backgroundColor={"white"}
      p={4}
      borderRadius={"lg"}
      my={4}
      w={"100%"}
      boxShadow={"lg"}
      cursor={"pointer"}
      transition={"transform 0.2s ease-in-out"}
      _hover={{ transform: "scale(1.1)", boxShadow: "xl" }}
      onClick={onOpen}
    >
      <Box>
        <Heading
          fontSize={"md"}
          fontFamily={"'Atkinson Hyperlegible Mono', serif"}
        >
          {taskTitle}
        </Heading>
        <Text fontSize={"sm"} my={2}>
          0 of {subTasks.length} subtasks
        </Text>
      </Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Task Name</ModalHeader>
          <ModalCloseButton variant={"ghost"} />
          <ModalBody>
            <Text>Description</Text>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
}
