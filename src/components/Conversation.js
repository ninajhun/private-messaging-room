import { Box, Flex, Text, Spacer, Image, Icon, IconButton, HStack, Input, ListItem, UnorderedList } from '@chakra-ui/react';
import React from 'react';
import { AddIcon } from '@chakra-ui/icons';
import { useForm } from "react-hook-form";
// import socket from "../socket"


export default function Conversation(props) {
  const { handleSubmit, register } = useForm();
  const users = props.users
  const selectedUser = props.selectedUser;
  const onMessage = props.onMessage;
  const messages = props.messages;
  const userMessages = props.userMessages;
  const selectedUserMessages = props.selectedUserMessages;


  const onSubmit = function (data) {
    if (data) {
      let { chatMessage } = data;
      onMessage(chatMessage)
    }
  };


  const handleUserKeyPress = e => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(onSubmit)();
    };
  }

  return (
    <Box bg="white" p={6} ml="0 !important" h="100vh" w="100%" borderRadius={30}>
      <Flex align="center">
        <Image borderRadius="md" src="https://picsum.photos/50" />
        <Box ml={2}>
          <Text fontSize="lg" fontWeight="bold">
            {selectedUser.username}
          </Text>
          <Text fontSize="sm" color="grey">
            Online
          </Text>
        </Box>
      </Flex>
      <Flex>
        <UnorderedList>
          {
            (selectedUser) ?
              userMessages.map((userMessage, index) => <ListItem key={index}>{userMessage.content}</ListItem>)
              : null
          }

          {
            selectedUserMessages.map((selectedUserMessage, index) => <ListItem key={index}>{selectedUserMessage.content}</ListItem>)
          }
        </UnorderedList>
      </Flex>
      <Spacer />
      <Flex w="50%" mx={8} position="absolute" bottom="8">
        <IconButton icon={<AddIcon />} color="white" bg="brand.500" _hover={{ bg: 'brand.300' }} />

        <Input
          minWidth="500px"
          ml={6}
          mr="auto"
          bg="gray.100"
          border="0"
          placeholder="Start typing..."
          name="chatMessage"
          ref={register}
          onKeyPress={handleUserKeyPress}
        />
      </Flex>
    </Box>
  );
}


  // const updateMessages = props.updateMessages
  // const [messages, updateMessages] = useState([])

  // send chatMessage to Server
  // socket.emit('chat message', chatMessage)

  // append chat message to UI
  // useEffect(() => {
  //   socket.on('chat message', (msg) => {
  //     updateMessages(messages => [...messages, msg]);
  //   });
  // }, [])


    // (messages) ? (
            //   messages.map((message, index) => <ListItem key={index}>{message.content}</ListItem>))
            //   : null
