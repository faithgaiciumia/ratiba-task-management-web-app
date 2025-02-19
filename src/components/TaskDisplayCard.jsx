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
import { useForm } from "react-hook-form";

export default function TaskDisplayCard({
  taskTitle,
  subTasks,
  taskDescription,
  status,
}) {
  const { onOpen, isOpen, onClose } = useDisclosure();
  const { register, handleSubmit } = useForm({
    defaultValues: {
      taskStatus: status,
    },
  });
  const doneSubTasks = subTasks.filter(
    (subTask) => subTask.status === "completed"
  );
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
          {doneSubTasks.length} of {subTasks.length} subtasks
        </Text>
      </Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{taskTitle}</ModalHeader>
          <ModalCloseButton variant={"ghost"} />
          <ModalBody>
            <Heading fontSize={"md"} mb={2}>
              Description
            </Heading>
            <Text my={4}>{taskDescription}</Text>
            <Heading fontSize={"md"} mb={2}>
              Subtasks ({doneSubTasks.length} of {subTasks.length})
            </Heading>
            <VStack gap={6}>
              {subTasks.map((subTask) => (
                <Box w={"100%"} key={subTask.name}>
                  <Checkbox>{subTask.name}</Checkbox>
                </Box>
              ))}
            </VStack>
            <FormControl my={4}>
              <FormLabel fontSize={"md"}>Status</FormLabel>
              <Select {...register("taskStatus")}>
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
