import React from "react"
import { ChakraProvider } from "@chakra-ui/react"
import Messages from "./components/ChatRoomView"

export default function App() {
  return (
    <ChakraProvider>
      <Messages></Messages>
    </ChakraProvider>
  );
}
