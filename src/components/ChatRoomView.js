import {
  HStack,
  Tabs,
  Tab,
  TabList,
  TabPanels,
  TabPanel,
  Heading,
  VStack,
} from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import Conversation from './Conversation'
import Message from './Message';
import socket from '../socket'

export default function Messages(props) {
  const [users, updateUsers] = useState([])

  const onMessage = (content) => {   //Client(sender)
    if (this.selectedUser) {
      socket.emit("private message", {
        content,
        to: this.selectedUser.userID,
      });
      this.selectedUser.messages.push({
        content,
        fromSelf: true,
      });
    }
  }

  socket.on("private message", ({ content, from }) => { //Client(receiver)
    for (let i = 0; i < this.users.length; i++) {
      const user = this.users[i];
      if (user.userID === from) {
        user.messages.push({
          content,
          fromSelf: false,
        });
        if (user !== this.selectedUser) {
          user.hasNewMessages = true;
        }
        break;
      }
    }
  });


  socket.on("users", (users) => {
    users.forEach((user) => {
      user.self = user.userID === socket.id;
    });
    // put the current user first, and then sort by username
    users = users.sort((a, b) => {
      if (a.self) return -1;
      if (b.self) return 1;
      if (a.username < b.username) return -1;
      return a.username > b.username ? 1 : 0;
    });
    updateUsers(users)
  });

  useEffect(() => {
    socket.on("user connected", (user) => {  //add new user connected
      user.self = user.userID === socket.id;
      updateUsers(users => [...users, user])
    })
  }, []);


  return (
    <>
      <HStack bg="gray.100">
        <VStack bg="gray.100" w="500px" h="100vh" spacing={4} py={6} align="stretch">
          <Heading p={5}>Inbox</Heading>
          <Tabs>
            <TabList>
              <Tab>Messages</Tab>
            </TabList>

            <TabPanels>
              <TabPanel px="0">
                {users.map((user) => {
                  return( (user.self) ? <Message key={user.userID} username={`${user.username} (yourself)`} /> :
                    <Message key={user.userID} username={user.username} />
                 ) })
                }
              </TabPanel>

            </TabPanels>
          </Tabs>
        </VStack>
        <Conversation username={props.username} />
      </HStack>
    </>
  );
}
