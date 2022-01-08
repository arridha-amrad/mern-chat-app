import React, { useRef, useState } from "react";
import {
   Box,
   Button,
   Tooltip,
   Text,
   Menu,
   MenuButton,
   MenuList,
   MenuItem,
   Avatar,
   MenuDivider,
} from "@chakra-ui/react";
import { useHistory } from "react-router-dom";

import { ChevronDownIcon, BellIcon } from "@chakra-ui/icons";
import { ChatState } from "../context/ChatProvider";
import ProfileModal from "./ProfileModal";
import MyDrawer from "./MyDrawer";

const SideDrawer = () => {
   const [isOpen, setIsOpen] = useState(false);
   const [isDrawerOpen, setIsDrawerOpen] = useState(false);

   const history = useHistory();

   const logoutHandler = () => {
      localStorage.removeItem("userInfo");
      history.push("/");
   };

   const btnRef = useRef();

   const {
      user: { user },
   } = ChatState();
   const { name, pic } = user;
   return (
      <>
         <Box
            d="flex"
            justifyContent="space-between"
            alignItems="center"
            bg="white"
            w="100%"
            p="5px 10px 5px 10px"
            borderWidth="5px"
         >
            <Tooltip label="Search user" hasArrow placement="bottom-end">
               <Button
                  ref={btnRef}
                  onClick={() => setIsDrawerOpen(true)}
                  variant="ghost"
               >
                  <i className="fas fa-search"></i>
                  <Text display={{ base: "none", md: "flex" }} px="4">
                     {" "}
                     Search User
                  </Text>
               </Button>
            </Tooltip>
            <Text fontSize="2xl">Talk-A-Tive</Text>
            <Box d="flex">
               <Menu>
                  <MenuButton>
                     <BellIcon fontSize="2xl" m="1" />
                  </MenuButton>
               </Menu>
               <Menu>
                  <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                     <Avatar size="sm" cursor="pointer" src={pic} name={name} />
                  </MenuButton>
                  <MenuList>
                     <MenuItem onClick={() => setIsOpen(true)}>
                        My Profile
                     </MenuItem>
                     <MenuDivider />
                     <MenuItem onClick={logoutHandler}>Logout</MenuItem>
                  </MenuList>
               </Menu>
            </Box>
         </Box>
         <ProfileModal
            user={user}
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
         />
         <MyDrawer
            isOpen={isDrawerOpen}
            onClose={() => setIsDrawerOpen(false)}
            btnRef={btnRef}
         />
      </>
   );
};

export default SideDrawer;
