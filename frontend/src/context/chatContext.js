import { createContext, useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

const ChatContext = createContext();

const ChatProvider = ({ children }) => {
   const [user, setUser] = useState();
   const history = useHistory();
   // useEffect(() => {
   //    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
   //    console.log("userInfo : ", userInfo);
   //    setUser(userInfo);
   //    if (userInfo === null) {
   //       history.push("/");
   //    }
   //    // eslint-disable-next-line
   // }, []);
   return (
      <ChatContext.Provider value={{ user, setUser }}>
         {children}
      </ChatContext.Provider>
   );
};

export const ChatState = () => {
   return useContext(ChatContext);
};

export default ChatProvider;
