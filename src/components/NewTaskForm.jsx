import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { FaPlus } from "react-icons/fa";

export default function NewTaskForm() {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      taskStatus: "todo",
    },
  });
  const onSubmit = (data) => {
    console.log(data);
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
          <Input
            placeholder="e.g. buy flour"
            my={2}
            {...register("taskSubTasks")}
          />
          <Input placeholder="e.g. buy eggs" />
        </FormControl>
        <Button leftIcon={<FaPlus />} my={2} w={"100%"} borderRadius={"3xl"}>
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
