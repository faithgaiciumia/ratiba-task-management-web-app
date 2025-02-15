/* eslint-disable react/prop-types */
import { Box, Heading, Text } from "@chakra-ui/react";

export default function TaskDisplayCard({taskTitle}){
    return(
        <Box backgroundColor={"white"} p={4} borderRadius={"lg"} my={4} w={"100%"} boxShadow={"lg"}>
            <Box>
                <Heading fontSize={"md"} fontFamily={"'Atkinson Hyperlegible Mono', serif"}>{taskTitle}</Heading>
                <Text fontSize={"sm"} my={2}>0 of 3 subtasks</Text>
            </Box>
        </Box>
    )
}