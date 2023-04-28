// Chakra imports
import {
  Button,
  Center,
  Flex,
  Image,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Link,
  Text,
  useColorModeValue,
  Heading,
} from "@chakra-ui/react";
import { NavLink, useNavigate } from "react-router-dom";
import { ColorModeSwitcher } from "../../../modules/ColorModeSwitcher";
import { useForm, SubmitHandler } from "react-hook-form";
import { useMutation } from "@apollo/client";
import { SIGN_UP } from "../../../graphql-query/auth/mutation";
import { useToast } from "../../../utils/toast";
import axios from "axios";

interface ISignUpData {
  username: string;
  password: string;
}

const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const toast = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignUpData>();
  const [signUp, { loading }] = useMutation(SIGN_UP, {
    onCompleted({ register }) {
      const { success, msg } = register;
      if (!success)
        return toast({
          title: "ERROR",
          description: msg,
          status: "error",
        });
      toast({
        title: "SUCCESS",
        description: msg,
        status: "success",
      });
      return navigate("/", { replace: true });
    },
  });

  const handleSignUp: SubmitHandler<ISignUpData> = async (data) => {
    await axios.post(window.app.REACT_APP_API_AUTH + "/signup", {
      type: "normal",
      payload: { username: data.username, password: data.password },
    });
  };
  // Chakra color
  const titleColor = useColorModeValue("teal.300", "teal.200");
  const textColor = useColorModeValue("gray.400", "white");
  const bgColor = useColorModeValue("white", "gray.700");

  return (
    <>
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
            SIGN UP
          </Heading>

          <form onSubmit={handleSubmit(handleSignUp)}>
            <FormControl mb="4" isInvalid={!!errors.username}>
              <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                Username
              </FormLabel>
              <Input
                {...register("username", {
                  required: "username is required",
                  minLength: {
                    value: 6,
                    message: "Must be at least 6 characters",
                  },
                })}
                type="username"
                fontSize="sm"
                borderRadius="15px"
                placeholder="Your username"
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
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Must be at least 6 characters",
                  },
                })}
                type="password"
                placeholder="Your password"
                fontSize="sm"
                borderRadius="15px"
                size="lg"
              />
              <FormErrorMessage my="2" fontSize="xs">
                {errors.password && errors.password.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!errors.username}>
              <Button
                type="submit"
                bg="teal.300"
                fontSize="15px"
                color="white"
                fontWeight="bold"
                w="100%"
                h="45"
                mb="24px"
                _hover={{
                  bg: "teal.200",
                }}
                _active={{
                  bg: "teal.400",
                }}
                isLoading={loading}
              >
                SIGN UP
              </Button>
            </FormControl>
          </form>
          <Flex
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            maxW="100%"
            mt="0px"
          >
            <Text color={textColor} fontWeight="medium">
              Already have an account?
              <Link
                as={NavLink}
                to="/auth/signin"
                color={titleColor}
                ms="5px"
                fontWeight="bold"
              >
                Sign In
              </Link>
            </Text>
          </Flex>
        </Flex>
      </Center>
    </>
  );
};

export default SignUp;
