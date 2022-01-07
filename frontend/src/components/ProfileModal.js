import React from "react";
import {
   Modal,
   ModalOverlay,
   ModalContent,
   ModalHeader,
   ModalCloseButton,
   ModalBody,
   ModalFooter,
   Button,
   Text,
   Image,
} from "@chakra-ui/react";

const ProfileModal = ({ isOpen, onClose, user }) => {
   return (
      <div>
         <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
               <ModalHeader d="flex" justifyContent="center">
                  {user.name}
               </ModalHeader>
               <ModalCloseButton />
               <ModalBody
                  display="flex"
                  flexDir="column"
                  justifyContent="center"
                  alignItems="center"
               >
                  <Image borderRadius="full" src={user.pic} />
                  <Text fontSize="xl">{user.email}</Text>
               </ModalBody>

               <ModalFooter>
                  <Button onClick={onClose} variant="ghost">
                     Close
                  </Button>
               </ModalFooter>
            </ModalContent>
         </Modal>
      </div>
   );
};

export default ProfileModal;
