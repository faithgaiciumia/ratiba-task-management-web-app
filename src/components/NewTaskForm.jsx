import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  Select,
} from "@chakra-ui/react";
import { useFieldArray, useForm } from "react-hook-form";
import { FaPlus, FaTimes } from "react-icons/fa";
import useTaskStore from "../data/useTaskStore";

export default function NewTaskForm() {
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

  const onSubmit = (data) => {
    console.log(data);
    addTask({
      taskTitle: data.taskTitle,
      taskDescription: data.taskDescription,
      taskSubTasks: data.taskSubTasks,
      taskStatus: data.taskStatus,
    });
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
        >
          Add New Subtask
        </Button>
        <FormControl my={2}>
          <FormLabel>Status</FormLabel>
          <Select {...register("taskStatus")}>
            <option value={"todo"}>TODO</option>
            <option value={"done"}>Done</option>
            <option value={"doing"}>Doing</option>
          </Select>
        </FormControl>
        <Button my={2} w={"100%"} type="submit" borderRadius={"3xl"}>
          Create Task
        </Button>
      </form>
    </>
  );
}
