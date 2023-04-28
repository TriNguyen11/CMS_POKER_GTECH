import {
  Box,
  Flex,
  Grid,
  SimpleGrid,
  Text,
  Stat,
  StatHelpText,
  StatLabel,
  StatNumber,
  Progress,
  useColorModeValue,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { FcMenu } from "react-icons/fc";

import BarChart from "../../../elements/BarChart";
import LineChart from "../../../elements/LineChart";

const MainIndex: React.FC = () => {
  const [ccuSecond, setCCUSecond] = useState();
  const [ccuMinute, setCCUMinute] = useState();
  const accessToken = localStorage.getItem("accessToken") as string;

  const handleGetData = async () => {
    const { data } = await axios.get(
      "https://cms.dadsnetwork.net/admin/reportCCU",
      {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      }
    );
    setCCUMinute(data.data.reportByMinute.metadata.metric);
    setCCUSecond(data.data.reportBySecond.metadata.metric);
  };
  useEffect(() => {
    handleGetData();
    setInterval(() => {
      handleGetData();
    }, 5000);
  }, []);

  return (
    <>
      <Flex flexDirection="row" align="center" justify="center" w="100%">
        <Box bg="#1A1E30" w="100%" p={4} color="white" margin={20}>
          CCU during 1 mins
          <Text>{ccuMinute}</Text>
        </Box>
        <Box bg="tomato" w="100%" p={4} color="white">
          CCU during 30s
          <Text>{ccuSecond}</Text>
        </Box>
      </Flex>
      {/* Summary */}
      {/* <SimpleGrid columns={{ sm: 1, md: 2, xl: 4 }} spacing="24px">
                <Box bg={bgColor} p="4" borderRadius="10px">
                    <Flex flexDirection="row" align="center" justify="center" w="100%">
                        <Stat me="auto">
                            <StatLabel fontSize="sm" color="gray.400" fontWeight="bold" pb=".1rem">
                                HAHA
                            </StatLabel>
                            <Flex>
                                <StatNumber fontSize="lg" color={textColor}>
                                    10000
                                </StatNumber>
                                <StatHelpText
                                    alignSelf="flex-end"
                                    justifySelf="flex-end"
                                    m="0px"
                                    color="green.400"
                                    fontWeight="bold"
                                    ps="3px"
                                    fontSize="md"
                                >
                                    100%
                                </StatHelpText>
                            </Flex>
                        </Stat>
                        <Box bg="red.100" p="3" borderRadius="10px">
                            <FcMenu />
                        </Box>
                    </Flex>
                </Box>
                <Box bg={bgColor} p="4" borderRadius="10px">
                    <Flex flexDirection="row" align="center" justify="center" w="100%">
                        <Stat me="auto">
                            <StatLabel fontSize="sm" color="gray.400" fontWeight="bold" pb=".1rem">
                                HAHA
                            </StatLabel>
                            <Flex>
                                <StatNumber fontSize="lg" color={textColor}>
                                    10000
                                </StatNumber>
                                <StatHelpText
                                    alignSelf="flex-end"
                                    justifySelf="flex-end"
                                    m="0px"
                                    color="green.400"
                                    fontWeight="bold"
                                    ps="3px"
                                    fontSize="md"
                                >
                                    100%
                                </StatHelpText>
                            </Flex>
                        </Stat>
                        <Box bg="red.100" p="3" borderRadius="10px">
                            <FcMenu />
                        </Box>
                    </Flex>
                </Box>
                <Box bg={bgColor} p="4" borderRadius="10px">
                    <Flex flexDirection="row" align="center" justify="center" w="100%">
                        <Stat me="auto">
                            <StatLabel fontSize="sm" color="gray.400" fontWeight="bold" pb=".1rem">
                                HAHA
                            </StatLabel>
                            <Flex>
                                <StatNumber fontSize="lg" color={textColor}>
                                    10000
                                </StatNumber>
                                <StatHelpText
                                    alignSelf="flex-end"
                                    justifySelf="flex-end"
                                    m="0px"
                                    color="green.400"
                                    fontWeight="bold"
                                    ps="3px"
                                    fontSize="md"
                                >
                                    100%
                                </StatHelpText>
                            </Flex>
                        </Stat>
                        <Box bg="red.100" p="3" borderRadius="10px">
                            <FcMenu />
                        </Box>
                    </Flex>
                </Box>
                <Box bg={bgColor} p="4" borderRadius="10px">
                    <Flex flexDirection="row" align="center" justify="center" w="100%">
                        <Stat me="auto">
                            <StatLabel fontSize="sm" color="gray.400" fontWeight="bold" pb=".1rem">
                                HAHA
                            </StatLabel>
                            <Flex>
                                <StatNumber fontSize="lg" color={textColor}>
                                    10000
                                </StatNumber>
                                <StatHelpText
                                    alignSelf="flex-end"
                                    justifySelf="flex-end"
                                    m="0px"
                                    color="green.400"
                                    fontWeight="bold"
                                    ps="3px"
                                    fontSize="md"
                                >
                                    100%
                                </StatHelpText>
                            </Flex>
                        </Stat>
                        <Box bg="red.100" p="3" borderRadius="10px">
                            <FcMenu />
                        </Box>
                    </Flex>
                </Box>
            </SimpleGrid> */}

      {/* Chart */}
      {/* <Grid
                templateColumns={{ sm: "1fr", lg: "1fr 2fr" }}
                templateRows={{ sm: "repeat(2, 1fr)", lg: "1fr" }}
                gap="4"
            >
                <Box
                    bg={bgColor}
                    p="4"
                    borderRadius="15px"
                    mt="5"
                >
                    TRAFFIC
                    <BarChart />
                    <Flex direction="column" my="10" alignSelf="flex-start">
                        <Text fontSize="lg" color="green.400" fontWeight="bold">
                            HAHA
                        </Text>
                        <Text fontSize="md" fontWeight="medium" color="gray.400">
                            <Text as="span" color="green.400" fontWeight="bold">
                                100%
                            </Text>{" "}
                            than last week
                        </Text>
                    </Flex>
                    <SimpleGrid gap={{ sm: "12px" }} columns={4}>
                        <Flex direction="column">
                            <Flex alignItems="center">
                                <Text fontSize="sm" color="gray.400" fontWeight="semibold">
                                    HOHO
                                </Text>
                            </Flex>
                            <Text fontSize="lg" color="green.400" fontWeight="bold" my="6px">
                                HIHI
                            </Text>
                            <Progress colorScheme="teal" borderRadius="12px" h="5px" value={50} />
                        </Flex>
                    </SimpleGrid>
                </Box>
                <Box bg={bgColor} p="4" borderRadius="15px" mt="5">
                    TRAFFIC
                    <LineChart />
                </Box>
            </Grid> */}
    </>
  );
};

export default MainIndex;
