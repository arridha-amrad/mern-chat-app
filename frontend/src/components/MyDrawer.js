import React, { useState } from "react";
import {
   Drawer,
   DrawerOverlay,
   DrawerContent,
   DrawerCloseButton,
   DrawerHeader,
   DrawerBody,
   Input,
   Button,
   HStack,
   Box,
   useToast,
   Text,
   Spinner,
} from "@chakra-ui/react";
import axios from "axios";
import { ChatState } from "../context/ChatProvider";

import UserListItem from "./UserListItem";
import ChatLoading from "./ChatLoading";

const MyDrawer = ({ isOpen, onClose, btnRef }) => {
   const [loadingSearch, setLoadingSearch] = useState(false);
   const [searchResult, setSearchResult] = useState([]);
   const [search, setSearch] = useState("");

   const { user, setSelectedChat, chats, setChats } = ChatState();

   const [loadingChat, setLoadingChat] = useState(false);

   const toast = useToast();

   const handleSearchUser = async () => {
      if (!search) {
         toast({
            title: "Type your search user",
            description: "Action canceled",
            status: "error",
            duration: 3000,
            isClosable: true,
            position: "top-left",
            variant: "left-accent",
         });
      }
      try {
         setLoadingSearch(true);
         const config = {
            headers: {
               Authorization: `Bearer ${user.token}`,
            },
         };
         const { data } = await axios.get(
            `http://localhost:5000/user?search=${search}`,
            config
         );
         setSearchResult(data);
         setLoadingSearch(false);
         console.log("search result : ", searchResult);
      } catch (error) {
         console.log(error);
         setLoadingSearch(false);
      }
   };

   const accessChat = async (userId) => {
      setLoadingChat(true);
      const config = {
         headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
         },
      };
      try {
         const { data } = await axios.post("/chat", { userId }, config);
         if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
         setSelectedChat(data);
         setLoadingChat(false);
         onClose();
      } catch (err) {
         console.log(err);
         toast({
            title: "Error occurs when fetching the chats",
            description: err.message,
            status: "error",
            duration: 3000,
            isClosable: true,
            position: "bottom-left",
            variant: "left-accent",
         });
         setLoadingChat(false);
      }
   };

   return (
      <Drawer
         isOpen={isOpen}
         placement="left"
         onClose={onClose}
         finalFocusRef={btnRef}
      >
         <DrawerOverlay />
         <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Create your account</DrawerHeader>

            <DrawerBody>
               <HStack spacing={"4"}>
                  <Input
                     value={search}
                     onChange={(e) => setSearch(e.target.value)}
                     placeholder="Search user..."
                  />
                  {loadingChat ? (
                     <Spinner />
                  ) : (
                     <Button onClick={handleSearchUser} colorScheme="blue">
                        Go
                     </Button>
                  )}
               </HStack>
               {loadingSearch ? (
                  <ChatLoading />
               ) : searchResult.length > 0 ? (
                  searchResult.map((res) => (
                     <UserListItem
                        key={res._id}
                        user={res}
                        handleFunction={() => accessChat(res._id)}
                     />
                  ))
               ) : (
                  <Box mt="2">
                     <Text>no user found</Text>
                  </Box>
               )}
            </DrawerBody>
         </DrawerContent>
      </Drawer>
   );
};

export default MyDrawer;
