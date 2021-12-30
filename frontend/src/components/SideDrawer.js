import React from "react";
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

import { ChevronDownIcon, BellIcon } from "@chakra-ui/icons";
import { ChatState } from "../context/chatContext";

const SideDrawer = () => {
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
               <Button variant="ghost">
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
                     <MenuItem>My Profile</MenuItem>
                     <MenuDivider />
                     <MenuItem>Logout</MenuItem>
                  </MenuList>
               </Menu>
            </Box>
         </Box>
      </>
   );
};

export default SideDrawer;
