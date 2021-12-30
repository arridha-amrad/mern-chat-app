import React, { useState } from "react";
import {
   VStack,
   FormControl,
   FormLabel,
   Input,
   Button,
} from "@chakra-ui/react";
import { useToast } from "@chakra-ui/toast";
import axios from "axios";
import { useHistory } from "react-router-dom";

const Signin = () => {
   const toast = useToast();
   const history = useHistory();

   const [state, setState] = useState({
      email: "",
      password: "",
   });
   const [loading, setLoading] = useState(false);
   const { email, password } = state;
   const handleChange = (e) => {
      setState({
         ...state,
         [e.target.name]: e.target.value,
      });
   };
   const handleSubmit = async () => {
      setLoading(true);
      if (!email || !password) {
         toast({
            title: "Please Fill all the Fields",
            status: "warning",
            duration: 5000,
            isClosable: true,
            position: "bottom",
         });
         setLoading(false);
         return;
      }
      try {
         const config = {
            headers: {
               "Content-type": "application/json",
            },
         };
         const { data } = await axios.post(
            "/user/login",
            {
               email,
               password,
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
         setLoading(false);
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
         setLoading(false);
      }
   };
   return (
      <VStack spacing="10px">
         <FormControl isRequired>
            <FormLabel>Email</FormLabel>
            <Input
               placeholder="Email"
               name="email"
               value={email}
               onChange={handleChange}
            />
         </FormControl>
         <FormControl isRequired>
            <FormLabel>Password</FormLabel>
            <Input
               placeholder="Password"
               name="password"
               value={password}
               type="password"
               onChange={handleChange}
            />
         </FormControl>
         <Button
            isFullWidth={true}
            color={"white"}
            backgroundColor={"blue.500"}
            onClick={handleSubmit}
         >
            Login
         </Button>
         <Button
            isFullWidth={true}
            color={"white"}
            isLoading={loading}
            backgroundColor={"red.500"}
            onClick={handleSubmit}
         >
            Login as Guest
         </Button>
      </VStack>
   );
};

export default Signin;
