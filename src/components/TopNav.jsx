import { Box, Button, Flex, Heading, IconButton } from "@chakra-ui/react";
import { FaEllipsisV, FaPlus } from "react-icons/fa";

export default function TopNav() {
  return (
    <Box backgroundColor={"gray.700"} p={4} color={"white"}>
      <Flex justify={"space-between"} align={"center"}>
        <Heading fontSize={"lg"}>Platform Launch</Heading>
        <Flex align={"center"}>
          <Button colorScheme="blue" borderRadius={"3xl"} size={"sm"} leftIcon={<FaPlus/>}>
             add new task
          </Button>
          <IconButton
            aria-label="extra-menu"
            variant={"ghost"}
            colorScheme="white"
          >
            <FaEllipsisV />
          </IconButton>
        </Flex>
      </Flex>
    </Box>
  );
}
