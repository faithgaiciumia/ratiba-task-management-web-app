/* eslint-disable react/prop-types */
import {
  Box,
  Button,
  Flex,
  Heading,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useBreakpointValue,
  useDisclosure,
} from "@chakra-ui/react";
import { FaEllipsisV, FaPlus, FaTrash } from "react-icons/fa";
import NewTaskForm from "./NewTaskForm";
import { ChevronDownIcon } from "@chakra-ui/icons";
import useTaskStore from "../data/useTaskStore";

export default function TopNav({ boardName, boardID }) {
  const { onOpen, isOpen, onClose } = useDisclosure();
  const isSmallScreen = useBreakpointValue({ base: true, md: false });
  const clearTasks = useTaskStore((state) => state.clearTasks);
  return (
    <Box
      backgroundColor={"white"}
      p={2}
      boxShadow={"lg"}
      m={2}
      borderRadius={"md"}
      fontFamily={"'Atkinson Hyperlegible Next', serif"}
    >
      <Flex justify={"space-between"} align={"center"}>
        {isSmallScreen ? (
          <Menu>
            <MenuButton
              as={Button}
              rightIcon={<ChevronDownIcon />}
              variant={"ghost"}
              textTransform={"capitalize"}
              fontWeight={"700"}
            >
              {boardName}{" "}
            </MenuButton>
            <MenuList>
              <MenuItem>Link 1</MenuItem>
            </MenuList>
          </Menu>
        ) : (
          <Heading fontSize={"lg"} textTransform={"capitalize"}>
            {boardName}
          </Heading>
        )}

        <Flex align={"center"}>
          {isSmallScreen ? (
            <IconButton
              colorScheme="blue"
              borderRadius={"3xl"}
              size={"sm"}
              onClick={onOpen}
            >
              <FaPlus />
            </IconButton>
          ) : (
            <Button
              colorScheme="blue"
              borderRadius={"3xl"}
              size={"sm"}
              leftIcon={<FaPlus />}
              onClick={onOpen}
              textTransform={"capitalize"}
            >
              add new task
            </Button>
          )}
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Add new task</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <NewTaskForm boardID={boardID} />
              </ModalBody>
            </ModalContent>
          </Modal>

          <Menu>
            <MenuButton
              as={IconButton}
              icon={<FaEllipsisV />}
              variant={"ghost"}
            />
            <MenuList>
              <MenuItem>
                <Button
                  colorScheme="red"
                  leftIcon={<FaTrash />}
                  w={"100%"}
                  onClick={clearTasks}
                >
                  Clear Tasks
                </Button>
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </Flex>
    </Box>
  );
}
