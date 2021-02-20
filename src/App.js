import React, {useState} from "react"
import { ChakraProvider } from "@chakra-ui/react"
import Messages from "./components/ChatRoomView"
import SetUsername from "./components/SetUsername"

export default function App() {
  const [usernameAlreadySelected, updateUsername] = useState(false)

  const body = (usernameAlreadySelected) ?  <Messages></Messages> : <SetUsername></SetUsername>

  return (
    <ChakraProvider>
     {body}
    </ChakraProvider>
  );
}
