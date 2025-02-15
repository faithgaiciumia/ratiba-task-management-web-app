/* eslint-disable react/prop-types */
import { Box, Heading, VStack } from "@chakra-ui/react";
import TaskDisplayCard from "./TaskDisplayCard";

export default function DoingCategoryView({doingTasks}) {
  console.log("doing", doingTasks);
  return (
    <Box>
      <Heading color={"white"} fontSize={"md"}>
        TODO (4)
      </Heading>
      <VStack>
        <TaskDisplayCard />
        <TaskDisplayCard />
        <TaskDisplayCard />
        <TaskDisplayCard />
      </VStack>
    </Box>
  );
}
