/* eslint-disable react/prop-types */
import { Box, Heading, VStack } from "@chakra-ui/react";
import TaskDisplayCard from "./TaskDisplayCard";

export default function DoingCategoryView({ doingTasks }) {
  return (
    <Box>
      <Heading color={"white"} fontSize={"md"}>
        Doing ({doingTasks.length})
      </Heading>
      <VStack>
        {doingTasks.map((task) => (
          <TaskDisplayCard key={task.taskTitle} />
        ))}
      </VStack>
    </Box>
  );
}
