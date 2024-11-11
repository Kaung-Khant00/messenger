import {  useState , useEffect } from "react";
import socket from "./socket";
import formatter from "./Formater";
import { useSearchParams } from "react-router-dom";
function Message() {
    const [searchParams,setSearchParams]=useSearchParams()
    const name=searchParams.get("name")
    const [inputValue, setInputValue] = useState("");
    const [messages, setMessages] = useState([]);
    const [users,setUsers]=useState([])
    function sendMessage() {
        if(inputValue=="")return 
        const newMessage=formatter(false,name,inputValue)
        setMessages([...messages,formatter(true,name,inputValue)])
        setInputValue("")
        socket.emit("message",newMessage)
    } 
    socket.on("newJoining",(list)=>{
        const userList=list
        setUsers(userList)
        console.log(userList)
    })
/*     socket.on("online",(name,isOnline)=>{
        console.log(name,isOnline)
        if(isOnline)userList.push(name)
        if(!isOnline){
            userList.slice(userList.indexOf(name),1)
        }
    }) */
  useEffect(()=>{
    socket.on("receive", (msg) => {
        const list = messages
        list.push(msg)
        console.log(list)
        setMessages([...list])
    });
    return ()=>{socket.off("receive")}
  },[messages])
    return (
      <>
        <div className="CONTAINER">
          <div className="messenger-container">
            <div className="top-bar">
              <div className="hamburger-menu">
                <div className="bar bar1"></div>
                <div className="bar bar2"></div>
                <div className="bar bar3"></div>
              </div>
              <div className="chat-info">
                <h1 className="chat-name">{name}</h1>
                <p className="typing-status">Online : {users.join(",")}</p>
              </div>
            </div>
            <div className="messages-container">
              {messages.map((item) => {
                return (
                  <div key={crypto.randomUUID()} style={{
                    display:"flex",
                    justifyContent:item.sender?"flex-end":"flex-start"}}>
                  <div
                    className="message"
                    style={{ backgroundColor:item.sender?"#fff":"rgb(34, 34, 34)" 
                       , color: item.sender?"black":"white" }}
                  >
                    {item.message}
                    {/*               <p className="message-text">This is a sample message.</p> */}
                    <div className="messageInfo">
                      <span className="username">{item.user}</span>
                      <span className="time">{item.time}</span>
                    </div>
                  </div>
              </div>
                );
              })}
            </div>
  
            <div className="message-input-container">
              <input
                type="text"
                className="message-input"
                placeholder="Type a message..."
                value={inputValue}
                onChange={(e) => {
                  setInputValue(e.target.value);
                }}
              />
              <div className="send-button" onClick={sendMessage}>
                send
                <i className="send-icon">➤</i>
              </div>
            </div>
          </div>
        </div>
      </>
    );
}

export default Message