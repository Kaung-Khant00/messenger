const express = require("express");
const Message = require("./model/model");
const cors = require("cors");
const { Server } = require("socket.io");
const http = require("http");

const app = express();
app.use(cors())
app.use(express.json())
const userList=[]
const server=http.createServer(app)
const io = new Server(server,{
    cors:{
        origin:"http://localhost:5173"
    }
})
server.listen(4000,()=>{
    console.log("server is listening")
})
io.on("connection",(socket)=>{
    console.log(socket.id)
    socket.on("message",(message)=>{
        console.log(message)
        socket.broadcast.emit("receive",message)
    })
    socket.on("newJoin",(name)=>{
        userList.push(name)
        console.log(userList)
        setInterval(()=>{
            socket.emit("newJoining",userList)
        },4000)
    })
})