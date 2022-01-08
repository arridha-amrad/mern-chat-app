import React, { useState, useEffect } from "react";
import { ChatState } from "../context/ChatProvider";
import { useToast } from "@chakra-ui/react";
import axios from "axios";

const MyChats = () => {
   const toast = useToast();
   const { user, setChats, chats, selectedChat, setSelectedChat } = ChatState();
   const [loggedUser, setLoggedUser] = useState();

   const fetchChats = async () => {
      // console.log(user._id);
      try {
         const config = {
            headers: {
               Authorization: `Bearer ${user.token}`,
            },
         };
         const { data } = await axios.get("http://localhost:5000/chat", config);
         setChats(data);
      } catch (error) {
         toast({
            title: "Error Occurred!",
            description: "Failed to Load the chats",
            status: "error",
            duration: 3000,
            isClosable: true,
            position: "bottom-left",
         });
      }
   };
   useEffect(() => {
      setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
      fetchChats();
      // eslint-disable-next-line
   }, []);
   return <div>MyChats</div>;
};

export default MyChats;
