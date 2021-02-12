import { io } from "socket.io-client";

const URL = "http://localhost:8080";
const socket = io(URL, { autoConnect: false } );  //might need to change to true { autoConnect: false }

socket.onAny((event, ...args) => {
  console.log(event, args);
});

export default socket;
