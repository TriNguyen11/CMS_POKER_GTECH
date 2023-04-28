import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import { GET_ALL_CATEGORIES } from "../../../../../graphql-query/category/query";
import {
  Button,
  FormControl,
  FormLabel,
  useColorModeValue,
  FormErrorMessage,
  Icon,
  Input,
  Textarea,
  Image,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from "@chakra-ui/react";
import { SubmitHandler, useForm } from "react-hook-form";
import Select, { StylesConfig } from "react-select";
import { FcMms, FcExternal, FcAbout } from "react-icons/fc";
import { HiPlusCircle } from "react-icons/hi";
import CkeditorCustom from "../../../../../modules/CkeditorCustom";
import { ICategoryData } from "../../../../../types/data.type";
import { useToast } from "../../../../../utils/toast";
import { FiImage } from "react-icons/fi";
import FileUpload from "../../../../../modules/FileUpload";
import { CREATE_POST } from "../../../../../graphql-query/post/mutation";
import { UPLOAD_FILE } from "../../../../../graphql-query/file/mutation";

interface ICreatePostInput {
  title: string;
  description?: string;
  content: string;
  thumb: string;
  cateId: string;
  authorId: string;
}

// React select
const dot = (color = "transparent") => ({
  alignItems: "center",
  display: "flex",
  ":before": {
    backgroundColor: color,
    borderRadius: 10,
    content: '" "',
    display: "block",
    marginRight: 8,
    height: 10,
    width: 10,
  },
});

const CreatePost: React.FC = () => {
  const navigate = useNavigate();

  // CHAKRA COLOR
  const bgColor = useColorModeValue("white", "gray.700");
  const textColor = useColorModeValue("gray", "white");
  const textPlaceholderColor = useColorModeValue("purple", "yellow");
  const bgMenuColor = useColorModeValue("white", "black");

  const toast = useToast();

  // CUSTOM REACT SELECT 'S STYLE
  const customStyles: StylesConfig = {
    control: (styles: any) => ({
      ...styles,
      backgroundColor: bgColor,
    }),
    input: (styles) => ({ ...styles, ...dot(textPlaceholderColor) }),
    placeholder: (styles) => ({
      ...styles,
      ...dot("yellow"),
      color: textPlaceholderColor,
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: bgMenuColor,
      color: textColor,
      zIndex: 99,
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? "purple" : bgColor,
      color: state.isSelected ? "yellow" : textColor,
      cursor: state.isSelected ? "not-allowed" : "pointer",
    }),
    singleValue: (provided) => ({
      ...provided,
      ...dot("yellow"),
      color: textPlaceholderColor,
    }),
  };
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  // GET ALL CATEs
  useQuery(GET_ALL_CATEGORIES, {
    onCompleted({ getAllCategories }) {
      setCategories(
        getAllCategories.data.map((item: ICategoryData) => ({
          label: item.title,
          value: item._id,
        }))
      );
    },
    fetchPolicy: "cache-and-network",
  });

  // CREATE POST
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { isSubmitting, isSubmitted, errors },
  } = useForm<ICreatePostInput>();

  // handle cateId
  useEffect(() => setValue("cateId", selectedCategory), [selectedCategory]);

  // handle content
  const handleContent = (content: string) => setValue("content", content);

  const handleCreatePost: SubmitHandler<ICreatePostInput> = async (data) => {
    try {
    } catch (error) {}
  };

  return (
    <form onSubmit={handleSubmit(handleCreatePost)}>
      {/* <FormControl mb="4" isInvalid={!!errors.cateId} isRequired>
        <FormLabel>Category</FormLabel>
        <span
          {...register("cateId", { required: "* Please select category" })}
        ></span>
        <Select
          className="post__cate"
          styles={customStyles}
          placeholder="Select Category"
          options={categories}
          onChange={({ value }: any) => setSelectedCategory(value)}
        />
        <FormErrorMessage>
          {errors.cateId && errors.cateId.message}
        </FormErrorMessage>
      </FormControl> */}
      <Tabs mb="4" isFitted variant="enclosed">
        <TabList>
          <Tab>
            <Icon as={FcExternal} mr="2" />
            Title *
          </Tab>
          {/* <Tab>
            <Icon as={FcAbout} mr="2" />
            Description (Optional)
          </Tab>
          <Tab>
            <Icon as={FcMms} mr="2" />
            Upload Thumbnail *
          </Tab> */}
        </TabList>
        <TabPanels>
          <TabPanel mt="2" p="0">
            <FormControl isInvalid={!!errors.title} isRequired>
              <Input
                bg={bgColor}
                placeholder="Title"
                {...register("title", {
                  required: "* Title is required",
                  minLength: {
                    value: 6,
                    message: "* Must be at least 6 characters",
                  },
                })}
              />
              <FormErrorMessage>
                {errors.title && errors.title.message}
              </FormErrorMessage>
            </FormControl>
          </TabPanel>
          <TabPanel mt="2" p="0">
            <FormControl>
              <Textarea
                bg={bgColor}
                placeholder="Description..."
                {...register("description")}
              />
            </FormControl>
          </TabPanel>
        </TabPanels>
      </Tabs>
      <FormControl mb="4" isInvalid={!!errors.content} isRequired>
        <FormLabel>Content</FormLabel>
        <span
          {...register("content", { required: "* Content is required" })}
        ></span>
        <CkeditorCustom getContent={handleContent} isSubmitted={isSubmitted} />
        <FormErrorMessage>
          {errors.content && errors.content.message}
        </FormErrorMessage>
      </FormControl>

      <Button
        type="submit"
        leftIcon={<Icon as={HiPlusCircle} />}
        isLoading={isSubmitting}
        colorScheme="green"
      >
        Create
      </Button>
    </form>
  );
};

export default CreatePost;
