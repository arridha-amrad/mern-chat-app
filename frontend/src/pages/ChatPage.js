import React from "react";
import { ChatState } from "../context/chatContext";
import { SideDrawer } from "../components";

const ChatPage = () => {
   const { user } = ChatState();
   return <div style={{ width: "100%" }}>{user && <SideDrawer />}</div>;
};

export default ChatPage;
