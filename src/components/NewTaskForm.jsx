/* eslint-disable react/prop-types */
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  Select,
  useToast,
} from "@chakra-ui/react";
import { useFieldArray, useForm } from "react-hook-form";
import { FaPlus, FaTimes } from "react-icons/fa";
import useTaskStore from "../data/useTaskStore";
import { useState } from "react";

export default function NewTaskForm({ boardID, onClose }) {
  const { register, handleSubmit, control } = useForm({
    defaultValues: {
      taskStatus: "todo",
      taskSubTasks: [],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "taskSubTasks",
  });
  const addTask = useTaskStore((state) => state.addTask);
  const setTaskAdded = useTaskStore((state) => state.setTaskAdded);

  const [loading, setLoading] = useState();

  const toast = useToast();

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const addedTask = await addTask({
        taskName: data.taskTitle,
        taskDescription: data.taskDescription,
        taskSubTasks: data.taskSubTasks,
        taskStatus: data.taskStatus,
        boardID: boardID,
      });
      if (addedTask) {
        toast({
          title: "Task created.",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        setTaskAdded(true);
        onClose();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl my={2} isRequired>
          <FormLabel>Title</FormLabel>
          <Input
            placeholder="e.g Bake son's birthday cake"
            {...register("taskTitle", { required: true })}
          />
        </FormControl>
        <FormControl my={2}>
          <FormLabel>Description</FormLabel>
          <Input
            placeholder="e.g Spiderman themed birthday cake for little boy"
            {...register("taskDescription")}
          />
        </FormControl>
        <FormControl my={2}>
          <FormLabel>Subtasks</FormLabel>
          {fields.map((field, index) => (
            <Flex key={field.id} gap={2} my={2}>
              <Input {...register(`taskSubTasks.${index}.name`)} />
              <IconButton
                variant={"ghost"}
                color={"white"}
                onClick={() => remove(index)}
              >
                <FaTimes />
              </IconButton>
            </Flex>
          ))}
        </FormControl>
        <Button
          leftIcon={<FaPlus />}
          my={2}
          w={"100%"}
          borderRadius={"3xl"}
          onClick={() => append({ name: "" })}
          variant={"outline"}
          colorScheme="blue"
          fontFamily={"'Atkinson Hyperlegible Next', serif"}
        >
          Add New Subtask
        </Button>
        <FormControl my={2}>
          <FormLabel>Status</FormLabel>
          <Select {...register("taskStatus")}>
            <option value={"TODO"}>TODO</option>
            <option value={"done"}>Done</option>
            <option value={"doing"}>Doing</option>
          </Select>
        </FormControl>
        <Button
          my={2}
          w={"100%"}
          type="submit"
          borderRadius={"3xl"}
          colorScheme="blue"
          fontFamily={"'Atkinson Hyperlegible Next', serif"}
          isLoading={loading}
          loadingText="Loading..."
        >
          Create Task
        </Button>
      </form>
    </>
  );
}
