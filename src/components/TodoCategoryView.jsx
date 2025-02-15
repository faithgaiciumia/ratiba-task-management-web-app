/* eslint-disable react/prop-types */
import { Box, Heading, VStack } from "@chakra-ui/react";
import TaskDisplayCard from "./TaskDisplayCard";

export default function TodoCategoryView({ todoTasks }) {
  return (
    <Box>
      <Heading color={"white"} fontSize={"md"}>
        TODO ({todoTasks.length})
      </Heading>
      <VStack>
        {todoTasks.map((task) => (
          <TaskDisplayCard key={task.taskTitle} />
        ))}
      </VStack>
    </Box>
  );
}
