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
  const [users, updateUsers] = useState([]);
  const [selectedUser, updateSelectedUser] = useState([]) //pass updateSelected User so when click on user in left panel updates state
  const [messages, updateMessages] = useState([])

  const [selectedUserMessages, updateSelectedUserMessages] = useState([])
  const [userMessages, updateUserMessages] = useState([])



  socket.on("users", (users) => {
    users.forEach((user) => {
      user.self = user.userID === socket.id;
      user.messages = [];
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
      user.messages = [];
      updateUsers(users => [...users, user])
    })
  }, []);


  const onMessage = (content) => {   //Client(sender)
    if (selectedUser) {
      socket.emit("private message", {
        content,
        to: selectedUser.userID,
      });

      // updateMessages(messages => [...messages, { content: content, fromSelf: true }])
      // updateSelectedUserMessages(selectedUserMessages => [...selectedUserMessages, { selectedUser: selectedUser.userID, content: content, fromSelf: true }])

      // updateSelectedUser(selectedUser => [ ...selectedUser, { messages: { content: content, fromSelf: true } }])

    }
    // }
  }



  useEffect(() => {
    socket.on("private message", ({ content, from }) => { //Client(recipient)
      for (let i = 0; i < users.length; i++) {
        const user = users[i];
        console.log("user inside:", user )
        console.log("user mess inside:", user.messages)

        if (user.userID === from) {

          user.messages.push({ content: content, fromSelf: false });
          updateUsers(users => [...users, user ]);
          //updateUsers(user => [...user, { messages: { content: content, fromSelf: false } }])
        }

        // if (user.userID === from) {
        //   user.messages.push({
        //     content,
        //     fromSelf: false,
        //   });

      }
    });

    console.log(users)

  }, [users])


        // if (user.userID === from) {
        //   updateMessages(messages => [...messages, { content: content, fromSelf: false }])
        // }

        // if (user.userID === from) {
        //   updateUserMessages(userMessages => [...userMessages, { content: content, fromSelf: false }])
        // }



  return (
    <>
      <HStack bg="gray.100">
        <VStack bg="gray.100" w="500px" h="100vh" spacing={4} py={6} align="stretch">
          <Heading p={5}>Inbox</Heading>
          <Tabs>
            <TabList> {/* refactor to diff chakra ui component */}
              <Tab>Messages</Tab>
            </TabList>

            <TabPanels>
              <TabPanel px="0">
                {users.map((user) => {
                  return ((user.self) ? null //<Message key={user.userID} username={`${user.username} (yourself)`} user={user} updateSelectedUser={updateSelectedUser} />
                    :
                    <Message key={user.userID} user={user} username={user.username} updateSelectedUser={updateSelectedUser} />
                  )
                })
                }
              </TabPanel>
            </TabPanels>
          </Tabs>
        </VStack>
        {
          // (selectedUser.userID === selectedUserMessages.selectedUser) ? <Conversation selectedUser={selectedUser} onMessage={onMessage} messages={selectedUserMessages.content} updateMessages={updateMessages} />
          //     : <Conversation selectedUser={selectedUser} onMessage={onMessage} messages={null} updateMessages={updateMessages} />
          (selectedUser) ?
            <Conversation
              users={users}
              selectedUser={selectedUser}
              onMessage={onMessage}
              messages={messages}
              userMessages={userMessages}
              selectedUserMessages={selectedUserMessages}
              updateMessages={updateMessages} /> : null
        }


      </HStack>
    </>
  );
}
