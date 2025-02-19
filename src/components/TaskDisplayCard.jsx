/* eslint-disable react/prop-types */
import {
  Box,
  Checkbox,
  FormControl,
  FormLabel,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Select,
  Text,
  useDisclosure,
  VStack,
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
            <Text my={4}>Description</Text>
            <Heading fontSize={"md"} mb={2}>
              Subtasks (2 of 3)
            </Heading>
            <VStack gap={6}>
              <Box w={"100%"}>
                <Checkbox>Subtask 1</Checkbox>
              </Box>
              <Box w={"100%"}>
                <Checkbox>Subtask 1</Checkbox>
              </Box>
              <Box w={"100%"}>
                <Checkbox>Subtask 1</Checkbox>
              </Box>
            </VStack>
            <FormControl my={4}>
              <FormLabel fontSize={"md"}>Status</FormLabel>
              <Select>
                <option value={"TODO"}>Todo</option>
                <option value={"doing"}>Doing</option>
                <option value={"done"}>Done</option>
              </Select>
            </FormControl>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
}
