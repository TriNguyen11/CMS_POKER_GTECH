import { useNavigate } from "react-router-dom";
import {
  Text,
  Button,
  useColorModeValue,
  Box,
  Stack,
  Avatar,
  SimpleGrid,
  Flex,
  IconButton,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  useDisclosure,
  Switch,
  Tooltip,
  VStack,
  Center,
  Input,
  Select,
  NumberInput,
  NumberInputField,
} from "@chakra-ui/react";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Textarea,
} from "@chakra-ui/react";
import { VscAdd } from "react-icons/vsc";
import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { GET_ALL_POSTS } from "../../../../graphql-query/post/query";
import { IPostData } from "../../../../types/data.type";
import Moment from "react-moment";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FcGlobe, FcSupport, FcEmptyTrash } from "react-icons/fc";
import ModalComponent from "../../../../modules/ModalComponent";
import {
  REMOVE_POST,
  UPDATE_STATUS_POST,
} from "../../../../graphql-query/post/mutation";
import { useToast } from "../../../../utils/toast";
import Loading from "../../../../modules/Loading";
import axios from "axios";

type TPostCard = {
  bgColor: string;
  textColor: string;
  data: IPostData;
};

function BasicUsage({ open, handleClose, id }: any) {
  const toast = useToast();
  const [option, setOption] = React.useState<string>("");
  const [data, setData] = React.useState<any>({});

  const handleSendReward = async () => {
    const accessToken = localStorage.getItem("accessToken") as string;

    console.log(data, "check data");
    console.log(id, "check id");
    try {
      const sendData = await axios.post(
        "https://cms.dadsnetwork.net/admin/notification",
        {
          id: id,
          title: data.title,
          message: data.message + "(`@_@`)" + data.landingSpace,
          option: {
            type: data.Reward.length > 0 ? "reward" : "none",
            bonus: data.Reward.length > 0 ? Number(data.Reward) : null,
          },
        },
        {
          headers: {
            Authorization: "Bearer " + accessToken,
          },
        }
      );

      toast({
        title: "SUCCESS",
        description: "Successfully send  a new notification!!!",
        status: "success",
      });
      handleClose();
      setData({});
      console.log(sendData.data.data.success, "check send");
    } catch (error) {}
  };

  return (
    <>
      <Modal isOpen={open} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Center>Notification</Center>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text fontSize="20px" color="#8F93F2" paddingY={4}>
              Title
            </Text>
            <Input
              onChange={(e) => {
                setData({ ...data, ["title"]: e.target.value });
              }}
            />
            <Text fontSize="20px" color="#8F93F2" paddingY={4}>
              Content
            </Text>
            <Textarea
              placeholder="Here is a sample placeholder"
              minHeight={300}
              onChange={(e) => {
                setData({ ...data, ["message"]: e.target.value });
              }}
            />
            <Text fontSize="20px" color="#8F93F2" paddingY={4}>
              Action
            </Text>
            <Stack spacing={3}>
              <Select
                required={true}
                placeholder="Select Action..."
                size="md"
                onChange={(e) => {
                  if (e.target.value === "1")
                    setData({ ...data, ["Reward"]: "" });
                  if (e.target.value === "2")
                    setData({ ...data, ["landingSpace"]: "" });
                  setOption(e.target.value);
                }}
              >
                <option value="1">Drive to landing page</option>
                <option value="2">Send reward</option>
                <option value="3">Both</option>
              </Select>
            </Stack>
            {(option === "1" || option === "3") && (
              <>
                <Text fontSize="20px" color="#8F93F2" paddingY={4}>
                  Landing page
                </Text>
                <Input
                  required={true}
                  onChange={(e) => {
                    setData({ ...data, ["landingSpace"]: e.target.value });
                  }}
                />
              </>
            )}
            {(option === "2" || option === "3") && (
              <>
                <Text fontSize="20px" color="#8F93F2" paddingY={4}>
                  Reward
                </Text>
                <NumberInput
                  onChange={(e: any) => {
                    setData({ ...data, ["Reward"]: e });
                  }}
                >
                  <NumberInputField />
                </NumberInput>
              </>
            )}
          </ModalBody>

          <ModalFooter>
            <Button
              onClick={handleSendReward}
              // variant="ghost"
              colorScheme="blue"
            >
              Send
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
const Post: React.FC = () => {
  const [users, setUsers] = useState<any>();
  const [isOpen, setIsOpen] = useState<boolean>();
  const [id, setID] = useState<string>();

  const navigate = useNavigate();
  let ID: string;
  // CHAKRA COLOR
  const bgColor = useColorModeValue("white", "gray.700");
  const textColor = useColorModeValue("gray.800", "white");
  const handleGetUsers = async () => {
    const accessToken = localStorage.getItem("accessToken") as string;
    try {
      const data = await axios.get(
        window.app.REACT_APP_API_AUTH + "/admin/users" + "?limit=1000",
        {
          headers: {
            Authorization: "Bearer " + accessToken,
          },
        }
      );
      // setUsers(data.data);
      console.log(data.data.data);
      setUsers(data.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleOpenSend = (id: string) => {
    setIsOpen(true);
    setID(id);
  };
  const handleCloseModal = () => {
    setIsOpen(false);
  };
  useEffect(() => {
    try {
      handleGetUsers();
    } catch (error) {
      console.log(error, "check err");
    }
  }, []);
  return (
    <>
      <BasicUsage open={isOpen} id={id} handleClose={handleCloseModal} />
      {users?.users?.length && (
        <VStack spacing="4">
          <TableContainer width={"100%"}>
            <Table variant="striped" colorScheme="teal">
              <TableCaption>Imperial to metric conversion factors</TableCaption>
              <Thead>
                <Tr>
                  <Th>
                    <Center>User ID</Center>
                  </Th>
                  <Th>
                    <Center>User name</Center>
                  </Th>
                  <Th>
                    <Center>Total Chips</Center>
                  </Th>
                  <Th>
                    <Center>Action</Center>
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {users?.users?.map((item: any, index: number) => (
                  <Tr>
                    <Td>
                      <Center>{item._id}</Center>
                    </Td>
                    <Td>
                      <Center>
                        {item.username ?? item.name ?? item.email}
                      </Center>
                    </Td>
                    <Td isNumeric>
                      <Center>{item.chips}</Center>
                    </Td>
                    <Td>
                      <Center>
                        <Button
                          onClick={() => {
                            handleOpenSend(item._id);
                          }}
                          bg="#8F93F2"
                        >{`Send Rewards >>`}</Button>
                      </Center>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </VStack>
      )}
    </>
  );
};

export default Post;
