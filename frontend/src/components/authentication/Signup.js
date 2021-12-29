import {
  VStack,
  FormControl,
  Input,
  FormLabel,
  InputGroup,
  InputRightElement,
  Button,
} from "@chakra-ui/react";
import { useState } from "react";

import { useToast } from "@chakra-ui/toast";
import axios from "axios";
import { useHistory } from "react-router-dom";

const Signup = () => {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [picLoading, setPicLoading] = useState(false);
  const [pics, setPic] = useState();
  const [state, setState] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const toast = useToast();
  const history = useHistory();

  const { name, password, confirmPassword, email } = state;
  const handleSubmit = async () => {
    setPicLoading(true);
    if (!name || !email || !password || !confirmPassword) {
      toast({
        title: "Please Fill all the Fields",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setPicLoading(false);
      return;
    }
    if (password !== confirmPassword) {
      toast({
        title: "Passwords Do Not Match",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }
    console.log(name, email, password, pics);
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        "http://localhost:5000/user/signup",
        {
          name,
          email,
          password,
          pics,
        },
        config
      );
      console.log(data);
      toast({
        title: "Registration Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      localStorage.setItem("userInfo", JSON.stringify(data));
      setPicLoading(false);
      history.push("/chats");
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setPicLoading(false);
    }
  };
  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };
  const postDetails = (pics) => {
    setPicLoading(true);
    if (pics === undefined) {
      toast({
        title: "Please Select an Image!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }
    console.log(pics);
    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "chat_app");
      data.append("cloud_name", "heartcloud");
      fetch("https://api.cloudinary.com/v1_1/heartcloud/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setPic(data.url.toString());
          console.log(data.url.toString());
          setPicLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setPicLoading(false);
        });
    } else {
      toast({
        title: "Please Select an Image!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setPicLoading(false);
      return;
    }
  };
  return (
    <VStack spacing="10px">
      <FormControl isRequired>
        <FormLabel htmlFor="name">Name</FormLabel>
        <Input
          id="name"
          placeholder="Name"
          name="name"
          value={name}
          onChange={handleChange}
        />
      </FormControl>
      <FormControl isRequired>
        <FormLabel htmlFor="email">Email</FormLabel>
        <Input
          id="email"
          placeholder="Email"
          name="email"
          value={email}
          onChange={handleChange}
        />
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup size="md">
          <Input
            name="password"
            type={isShowPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={handleChange}
          />
          <InputRightElement width="4.5rem">
            <Button
              h="1.75rem"
              size="sm"
              onClick={() =>
                setIsShowPassword((isShowPassword) => !isShowPassword)
              }
            >
              {isShowPassword ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <FormControl id="confirmPassword" isRequired>
        <FormLabel>Confirm Password</FormLabel>
        <InputGroup size="md">
          <Input
            name="confirmPassword"
            type={isShowPassword ? "text" : "password"}
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={handleChange}
          />
          <InputRightElement width="4.5rem">
            <Button
              h="1.75rem"
              size="sm"
              onClick={() =>
                setIsShowPassword((isShowPassword) => !isShowPassword)
              }
            >
              {isShowPassword ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <FormControl id="avatar">
        <FormLabel>Avatar</FormLabel>
        <Input
          type="file"
          accept="image/*"
          onChange={(e) => postDetails(e.target.files[0])}
        />
      </FormControl>
      <Button
        color={"white"}
        backgroundColor={"blue.500"}
        isFullWidth={true}
        onClick={handleSubmit}
        isLoading={picLoading}
      >
        Submit
      </Button>
    </VStack>
  );
};

export default Signup;
