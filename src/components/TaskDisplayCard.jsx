/* eslint-disable react/prop-types */
import {
  Box,
  Checkbox,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
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
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEdit } from "react-icons/fa";
import useTaskStore from "../data/useTaskStore";

export default function TaskDisplayCard({
  taskID,
  taskTitle,
  subTasks,
  taskDescription,
  status,
}) {
  const { onOpen, isOpen, onClose } = useDisclosure();
  const { register, handleSubmit } = useForm({
    defaultValues: {
      taskID: taskID,
      taskName: taskTitle,
      taskDescription: taskDescription,
      taskStatus: status,
    },
  });

  //manage editing functionalities
  const [editingTaskName, setEditingTaskName] = useState(false);
  const [editingTaskDescription, setEditingTaskDescription] = useState(false);
  // const [doneEditing, setDoneEditing] = useState(false);

  //check number of subtasks done
  const doneSubTasks = subTasks.filter(
    (subTask) => subTask.status === "completed"
  );

  //receive data if user chooses to edit task info
  const updateTask = useTaskStore((state) => state.updateTask);
  const setTaskEdited = useTaskStore((state) => state.setTaskEdited);
  const handleTaskUpdate = async (data) => {
    try {
      const update = await updateTask(data);
      console.log(update);
      setEditingTaskName(false);
      if (update) {
        setTaskEdited(true);
      }
    } catch (error) {
      console.error("err updating task", error);
    }
  };
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
          <form onSubmit={handleSubmit(handleTaskUpdate)}>
            <ModalHeader>
              {editingTaskName ? (
                <Box mb={4}>
                  <Heading fontSize={"md"} mb={2}>
                    Task Title
                  </Heading>
                  <Input
                    defaultValue={taskTitle}
                    {...register("taskTitle")}
                    w={"80%"}
                    autoFocus
                    onBlur={() => setEditingTaskName(false)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleSubmit(handleTaskUpdate)();
                      }
                    }}
                  />
                </Box>
              ) : (
                <Flex justify={"start"} align={"center"} mb={4}>
                  <Heading
                    mr={2}
                    fontSize={"xl"}
                    fontFamily={"'Atkinson Hyperlegible Mono', serif"}
                  >
                    {taskTitle}
                  </Heading>{" "}
                  <FaEdit
                    color="blue"
                    size={"16"}
                    onClick={() => setEditingTaskName(true)}
                  />
                </Flex>
              )}
              <Divider borderColor={"gray.500"} />
            </ModalHeader>
            <ModalCloseButton variant={"ghost"} />
            <ModalBody>
              <Flex justify={"start"} align={"center"} mb={2}>
                <Heading fontSize={"md"} mr={2}>
                  Description
                </Heading>
                <FaEdit
                  color="blue"
                  size={"16"}
                  onClick={() => setEditingTaskDescription(true)}
                />
              </Flex>
              {editingTaskDescription ? (
                <Flex justify={"start"} align={"center"} my={2}>
                  <Input
                    defaultValue={taskDescription}
                    {...register("taskDescription")}
                    w={"100%"}
                    autoFocus
                    onBlur={() => setEditingTaskDescription(false)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleSubmit(handleTaskUpdate)();
                        setEditingTaskDescription(false);
                      }
                    }}
                  />
                </Flex>
              ) : (
                <Text my={4}>{taskDescription}</Text>
              )}
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
            {/* <ModalFooter>
              <Button colorScheme="blue" onClick={() => setDoneEditing(true)}>
                Done
              </Button>
            </ModalFooter> */}
          </form>
        </ModalContent>
      </Modal>
    </Box>
  );
}
