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


  // const onMessage = useEffect((content) => {   //Client(sender)  //pass this & messages as props to Conversation

  //     if (selectedUser) {
  //       socket.emit("private message", {
  //         content,
  //         to: selectedUser.userID,
  //       });

  //     if(content) {
  //       updateMessages(messages => [...messages, content])

  //     }
  //       // updateSelectedUser(selectedUser => [...selectedUser, content])

  //       // selectedUser.messages.push({   //need to update messages somehow
  //       //   content,
  //       //   fromSelf: true,
  //       // });
  //     }
  //   // }


  // } )

const onMessage = (content) => {   //Client(sender)  //pass this & messages as props to Conversation
  // console.log(content)
  // console.log(selectedUser)

  if (selectedUser) {
    socket.emit("private message", {
      content,
      to: selectedUser.userID,
    });



  // updateMessages(messages => [...messages, { content, fromSelf: true ])

  // updateSelectedUser(selectedUser => [...selectedUser, content])

    // selectedUser.messages.push({   //need to update messages somehow
    //   content,
    //   fromSelf: true,
    // });
  }
}



// useEffect(() => {
//   updateSelectedUser(user => [...user, { content: content }, { fromSelf: true }]);
// }, [])

useEffect(() => {
  socket.on("private message", ({ content, from }) => { //Client(recipient)
    for (let i = 0; i < users.length; i++) {
      const user = users[i];

      if (user.userID === from) {
        updateMessages(messages => [...messages, content])
      }


      // if (user.userID === from) {
      //   user.messages.push({
      //     content,
      //     fromSelf: false,
      //   });
      //   if (user !== selectedUser) {
      //     user.hasNewMessages = true;
      //   }
      // break;
      // }
    }
  });

})



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
                return ((user.self) ? <Message key={user.userID} username={`${user.username} (yourself)`} user={user} updateSelectedUser={updateSelectedUser} /> :
                  <Message key={user.userID} user={user} username={user.username} updateSelectedUser={updateSelectedUser} />
                )
              })
              }
            </TabPanel>
          </TabPanels>
        </Tabs>
      </VStack>
      {(selectedUser) ? <Conversation selectedUser={selectedUser} onMessage={onMessage} messages={messages} updateMessages={updateMessages} /> : null}


    </HStack>
  </>
);
}
