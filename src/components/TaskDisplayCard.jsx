import { Box, Heading, Text } from "@chakra-ui/react";

export default function TaskDisplayCard(){
    return(
        <Box backgroundColor={"gray.600"} p={4} borderRadius={"lg"} my={4}>
            <Box>
                <Heading color={"white"} fontSize={"md"}>Build UI for onboarding flow</Heading>
                <Text color={"gray.100"} fontSize={"sm"} my={2}>0 of 3 subtasks</Text>
            </Box>
        </Box>
    )
}