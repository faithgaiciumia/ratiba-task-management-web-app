import { Box, Flex } from "@chakra-ui/react";
import TopNav from "../components/TopNav";
import CategoryView from "../components/CategoryView";

export default function Home() {
  return (
    <Box backgroundColor={"gray.900"} minH={"100vh"}>
      <TopNav />
      <Flex gap={6} my={4} p={4}>
        <CategoryView />
        <CategoryView />
        <CategoryView />
      </Flex>
    </Box>
  );
}
