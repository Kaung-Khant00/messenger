const express = require("express");
const app = express();
const HTTP = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
app.use(cors());

const server = HTTP.createServer(app);

const io = new Server(server, {
  cors: { origin: "*" },
});
const PORT=process.env.PORT||4000
server.listen(PORT, () => {
  console.log("server is listening");
});
io.on("connection", (socket) => {
  console.log(socket.id);
  socket.on("send_message", (message) => {
    socket.broadcast.emit("receive_message",message)
  });
});
