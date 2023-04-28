// Chakra imports
import {
  Flex,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link,
  Switch,
  Text,
  useColorModeValue,
  Center,
  FormErrorMessage,
  Image,
  Stack,
  Select,
  NumberInput,
  NumberInputField,
} from "@chakra-ui/react";
import { NavLink, Navigate, useLocation } from "react-router-dom";
import { ColorModeSwitcher } from "../../../modules/ColorModeSwitcher";
import { useForm, SubmitHandler } from "react-hook-form";
import { useMutation } from "@apollo/client";
import { SIGN_IN } from "../../../graphql-query/auth/mutation";
import { useToast } from "../../../utils/toast";
import useAuth from "../../../context/AuthProvider";
import axios from "axios";

import React from "react";
interface ISignInData {
  username: string;
  password: string;
}

const SignIn: React.FC = () => {
  const { authState, signIn } = useAuth();
  const location = useLocation();
  const toast = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignInData>();

  const handleSignIn: SubmitHandler<ISignInData> = async (dataSignin) => {
    try {
      const data = await axios.post(
        window.app.REACT_APP_API_AUTH + "/auth/signin",
        {
          type: "normal",
          payload: {
            username: dataSignin.username,
            password: dataSignin.password,
          },
        }
      );

      signIn(data.data.accessToken);
    } catch (error: any) {
      toast({
        title: "Opps....!",
        description: "User is not existing!!",
        status: "error",
      });
    }
  };

  // Chakra color mode
  const titleColor = useColorModeValue("teal.300", "teal.200");
  const textColor = useColorModeValue("gray.400", "white");
  const bgColor = useColorModeValue("white", "gray.700");

  const from = location.state as { previousPage: string };
  if (authState?.isAuth)
    return <Navigate to={from ? from.previousPage : "/"} replace={true} />;
  return (
    <>
      {/* <BasicUsage /> */}
      <ColorModeSwitcher position="absolute" top="0" right="0" />
      <Center h="100vh">
        <Flex
          direction="column"
          gap="4"
          p="8"
          w="400px"
          mx={{ base: "40px", md: "100px" }}
          background="transparent"
          borderRadius="15px"
          bg={bgColor}
          boxShadow="0 20px 27px 0 rgb(0 0 0 / 5%)"
        >
          <Image src="/Logo.png" alt="logo" />
          <Heading color={titleColor} fontSize="lg" textAlign="center">
            SIGN IN
          </Heading>

          <form onSubmit={handleSubmit(handleSignIn)}>
            <FormControl mb="4" isInvalid={!!errors.username}>
              <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                Email
              </FormLabel>
              <Input
                {...register("username", { required: "username is required" })}
                type="text"
                borderRadius="15px"
                fontSize="sm"
                placeholder="Your email adress"
                size="lg"
              />
              <FormErrorMessage my="2" fontSize="xs">
                {errors.username && errors.username.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl mb="4" isInvalid={!!errors.password}>
              <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                Password
              </FormLabel>
              <Input
                {...register("password", { required: "Password is required" })}
                type="password"
                borderRadius="15px"
                fontSize="sm"
                placeholder="Your password"
                size="lg"
              />
              <FormErrorMessage my="2" fontSize="xs">
                {errors.password && errors.password.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl display="flex" alignItems="center">
              <Switch colorScheme="teal" me="10px" />
              <FormLabel
                htmlFor="remember-login"
                mb="0"
                ms="1"
                fontWeight="normal"
              >
                Remember me
              </FormLabel>
            </FormControl>
            <Button
              fontSize="20px"
              type="submit"
              bg="teal.300"
              w="100%"
              h="45"
              mb="20px"
              color="white"
              mt="20px"
              _hover={{ bg: "teal.200" }}
              _active={{ bg: "teal.400" }}
            >
              SIGN IN
            </Button>
          </form>
          <Flex
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            maxW="100%"
            mt="0px"
          >
            <Text color={textColor} fontWeight="medium">
              Don't have an account?
              <Link
                as={NavLink}
                to="/auth/signup"
                color={titleColor}
                ms="5px"
                fontWeight="bold"
              >
                Sign Up
              </Link>
            </Text>
          </Flex>
        </Flex>
      </Center>
    </>
  );
};

export default SignIn;
