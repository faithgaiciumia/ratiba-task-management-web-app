/* eslint-disable react/prop-types */
import { Box, Button, VStack } from "@chakra-ui/react";
import TaskDisplayCard from "./TaskDisplayCard";
import { FaCircle } from "react-icons/fa";

export default function DoingCategoryView({ doingTasks }) {
  return (
    <Box minW={"30%"}>
      <Button
        size={"md"}
        leftIcon={<FaCircle color="purple" />}
        variant={"ghost"}
        fontFamily={"'Atkinson Hyperlegible Next', serif"}
      >
        DOING ({doingTasks.length})
      </Button>
      <VStack>
        {doingTasks.map((task) => (
          <TaskDisplayCard
            key={task._id}
            taskTitle={task.taskName}
            subTasks={task.taskSubTasks}
          />
        ))}
      </VStack>
    </Box>
  );
}
