/* eslint-disable react/prop-types */
import { Box, Button, VStack } from "@chakra-ui/react";
import TaskDisplayCard from "./TaskDisplayCard";
import { FaCircle } from "react-icons/fa";

export default function TodoCategoryView({ todoTasks }) {
  return (
    <Box minW={"30%"}>
      <Button size={"md"} leftIcon={<FaCircle color="teal" />} variant={"ghost"} fontFamily={"'Atkinson Hyperlegible Next', serif"}>
        TODO ({todoTasks.length})
      </Button>
      <VStack>
        {todoTasks.map((task) => (
          <TaskDisplayCard key={task.taskTitle} taskTitle={task.taskTitle} />
        ))}
      </VStack>
    </Box>
  );
}
