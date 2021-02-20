import React, {useState} from "react"
import { ChakraProvider } from "@chakra-ui/react"
import Messages from "./components/ChatRoomView"
import SetUsername from "./components/SetUsername"
import socket from "./socket"

export default function App() {
  const [usernameAlreadySelected, updateAlreadyUsernameSelected] = useState(false)
  const [username, updateUsername] = useState()


  const onUsernameSelection = (username) => {
    socket.auth = { username }
    socket.connect()
  }

  socket.on("connect_error", (err) => {
    if (err.message === "invalid username") {
     updateAlreadyUsernameSelected(false)
    }
  })

  if (usernameAlreadySelected){
    onUsernameSelection(username)
  }

  return (
    <ChakraProvider>
      {(usernameAlreadySelected) ? <Messages username={username}></Messages> : <SetUsername updateUsername={updateUsername} updateAlreadyUsernameSelected={updateAlreadyUsernameSelected}></SetUsername>}
    </ChakraProvider>
  );
}
