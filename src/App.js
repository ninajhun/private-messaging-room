import React, {useState} from "react"
import { ChakraProvider } from "@chakra-ui/react"
import Messages from "./components/ChatRoomView"
import SetUsername from "./components/SetUsername"

export default function App() {
  const [usernameAlreadySelected, updateisUsernameSelected] = useState(false)
  const [username, updateUsername] = useState()

  const body = (usernameAlreadySelected) ? <Messages username={username}></Messages> : <SetUsername updateUsername={updateUsername} updateisUsernameSelected={updateisUsernameSelected}></SetUsername>

  return (
    <ChakraProvider>
     {body}
    </ChakraProvider>
  );
}
