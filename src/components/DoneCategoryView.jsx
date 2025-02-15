/* eslint-disable react/prop-types */
import { Box, Heading, VStack } from "@chakra-ui/react";
import TaskDisplayCard from "./TaskDisplayCard";

export default function DoneCategoryView({ doneTasks }) {
  return (
    <Box>
      <Heading color={"white"} fontSize={"md"}>
        DONE ({doneTasks.length})
      </Heading>
      <VStack>
        {doneTasks.map((task) => (
          <TaskDisplayCard key={task.taskTitle} />
        ))}
      </VStack>
    </Box>
  );
}
