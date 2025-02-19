/* eslint-disable react/prop-types */
import { Box, Button, VStack } from "@chakra-ui/react";
import TaskDisplayCard from "./TaskDisplayCard";
import { FaCircle } from "react-icons/fa";

export default function DoneCategoryView({ doneTasks }) {
  return (
    <Box minW={"30%"}>
      <Button
        size={"md"}
        leftIcon={<FaCircle color="green" />}
        variant={"ghost"}
        fontFamily={"'Atkinson Hyperlegible Next', serif"}
      >
        DONE ({doneTasks.length})
      </Button>
      <VStack>
        {doneTasks.map((task) => (
          <TaskDisplayCard
            key={task._id}
            taskTitle={task.taskName}
            subTasks={task.taskSubTasks}
            status={task.taskStatus}
            taskDescription={task.taskDescription}
          />
        ))}
      </VStack>
    </Box>
  );
}
