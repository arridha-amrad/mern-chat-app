import React from "react";
import { ChatState } from "../context/ChatProvider";
import { SideDrawer, MyChat, ChatBox } from "../components";
import { Box } from "@chakra-ui/react";

const ChatPage = () => {
   const { user } = ChatState();
   return (
      <div style={{ width: "100%" }}>
         {user && <SideDrawer />}
         <Box
            d="flex"
            justifyContent="space-between"
            w="100%"
            h="91.5vh"
            p="10px"
         >
            {user && <MyChat />}
            {user && <ChatBox />}
         </Box>
      </div>
   );
};

export default ChatPage;
