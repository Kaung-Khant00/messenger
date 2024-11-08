import React, { useState } from "react";
import socket from "./socket";
import "./index.css";
import moment from "moment";
const addTime = (user, message) => {
  return {
    user,
    message,
    time: moment().format("h:mm a"),
  };
};
function Chat() {
  const [room, setRoom] = useState("");
  const [name, setName] = useState("");

  const [message, setMessage] = useState([])
  const [messageInput, setMessageInput] = useState("");
  function sendMessage() {
    socket.emit("send_message", messageInput);
    setMessageInput("")
  }
  socket.on("receive_message", (msg) => {
    setMessage([...message,addTime("user", msg)]);
  });
  return (
    <div className="chat-container">
      <div id="joinRoom" style={{ display: "none" }}>
        <h2>Join Chat Room</h2>
        <input
          value={room}
          onChange={(e) => {
            set(e.target.value);
          }}
          type="text"
          id="usernameInput"
          placeholder="Enter your username"
        />
        <input
          value={name}
          onChange={(e) => {
            set(e.target.value);
          }}
          type="text"
          id="roomInput"
          placeholder="Enter room name"
        />
        <button>Join Room</button>
      </div>
      <div id="chatRoom">
        <div className="room-header">
          <h2 id="roomName"></h2>
        </div>
        <div id="chatMessages" className="chat-box">
          {message &&
            message.map((item) => {
              return (
                <div className="messageTag">
                  <div className="container">
                    <div className="user">
                      <strong>{item.user}</strong>
                    </div>
                    <div className="time">{item.time}</div>
                  </div>
                  <div className="message">{item.message}</div>
                </div>
              );
            })}
        </div>
        <div className="message-input">
          <input
            value={messageInput}
            onChange={(e) => {
                setMessageInput(e.target.value);
            }}
            type="text"
            id="messageInput"
            placeholder="Type a message..."
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
}

export default Chat;
