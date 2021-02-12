import {
  HStack,
  Tabs,
  Tab,
  TabList,
  TabPanels,
  TabPanel,
  Heading,
  VStack,
  Input,
  IconButton,
} from '@chakra-ui/react';
import React from 'react';
import Conversation from './Conversation'
import Message from './Message';
import { AddIcon } from '@chakra-ui/icons';

export default function Messages() {
  return (
    <>
      <HStack bg="gray.100">
        <VStack bg="gray.100" w="500px" h="100vh" spacing={4} py={6} align="stretch">
          <HStack justifyContent="center">
            <Input w="60%" bg="white" fontcolor="red.600" placeholder="Search in chats..." />
            <IconButton icon={<AddIcon />} bg="white" />
          </HStack>
          <Heading p={5}>Inbox</Heading>
          <Tabs>
            <TabList>
              <Tab>Direct Messages</Tab>
              <Tab>Group Chat</Tab>
            </TabList>

            <TabPanels>
              <TabPanel px="0">
                <Message />
                <Message />
                <Message />
              </TabPanel>
              <TabPanel px="0">
                <Message />
                <Message />
                <Message />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </VStack>
        <Conversation />
      </HStack>
    </>
  );
}
