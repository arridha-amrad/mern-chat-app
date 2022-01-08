import React from "react";
import { Stack, Skeleton } from "@chakra-ui/react";

const ChatLoading = () => {
   return (
      <Stack marginTop="2rem">
         <Skeleton height="40px" />
         <Skeleton height="40px" />
         <Skeleton height="40px" />
      </Stack>
   );
};

export default ChatLoading;
