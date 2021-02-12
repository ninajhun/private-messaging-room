import { Box, Flex, Text, Spacer, Image, Icon, IconButton, HStack, Input, ListItem, UnorderedList } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import { PhoneIcon, AddIcon } from '@chakra-ui/icons';
import { BsFillCameraVideoFill, BsThreeDotsVertical } from 'react-icons/bs';
import { useForm } from "react-hook-form";
import socket from "../socket"

export default function Conversation() {
  const [messages, updateMessages] = useState([])
  const { handleSubmit, register } = useForm();

  const handleUserKeyPress = e => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(onSubmit)();
    };
  }

  const username = 'Nina'

  const connectSocket = (username) => {
    socket.auth = { username }
    socket.connect()
  }
  connectSocket(username);

  const onSubmit = function (data) {
    if (data) {
      let { chatMessage } = data;
      socket.emit('chat message', chatMessage) //send chatMessage to Server
    }

  };

  useEffect(() => {  // append chat message to UI
    socket.on('chat message', (msg) => {
      updateMessages(messages => [...messages, msg]);
      console.log(msg)
    });
  }, [])

  const messageBody = (messages.length && messages) ? (
    messages.map((message, index) => <ListItem key={index}>{message}</ListItem>))
    : null


  return (
    <Box bg="white" p={6} ml="0 !important" h="100vh" w="100%" borderRadius={30}>
      <Flex align="center">
        <Image borderRadius="md" src="https://picsum.photos/50" />
        <Box ml={2}>
          <Text fontSize="lg" fontWeight="bold">
            Oski Bear
          </Text>
          <Text fontSize="sm" color="grey">
            Online
          </Text>
        </Box>
        <HStack position="absolute" right="8" spacing={8}>
          <IconButton bg="white" color="gray.500" size="lg" icon={<PhoneIcon />} />
          <IconButton
            bg="white"
            color="gray.500"
            size="lg"
            icon={<Icon as={BsFillCameraVideoFill} />}
          />
          <IconButton
            bg="white"
            color="gray.500"
            size="lg"
            icon={<Icon as={BsThreeDotsVertical} />}
          />
        </HStack>
      </Flex>
      <Flex>
        <UnorderedList>
          {messageBody}
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
