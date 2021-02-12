const httpServer = require("http").createServer();

const io = require("socket.io")(httpServer, {
  cors: {
    origin: "http://localhost:3000",
  },
});

// middleware which checks the username and allows the connection
io.use((socket, next) => {
  const username = socket.handshake.auth.username;
  // if (!username) {
  //   return next(new Error("invalid username"));
  // }
  socket.username = username;
  next();
});


io.on("connection", (socket) => {
 console.log('a user connected');

 socket.on('chat message', (msg) => {  //on event send msg to all sockets
   io.emit('chat message', msg )  //add broadcast flag next
 })

  // fetch existing users
  const users = [];
  for (let [id, socket] of io.of("/").sockets) {
    users.push({
      userID: id,
      username: socket.username,
    });
  }
  console.log(users)
  socket.emit("users", users);


  // notify existing users
  socket.broadcast.emit("user connected", {
    userID: socket.id,
    username: socket.username,
  });


});





const PORT = process.env.PORT || 8080;

httpServer.listen(PORT, () =>
  console.log(`server listening at http://localhost:${PORT}`)
);
