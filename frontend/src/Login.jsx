import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import socket from './socket'
function Login() {
    const [inputValue,setInputValue]=useState("")
    function newJoin(){
        socket.emit("newJoin",inputValue)
    }
  return (
    <div className="login_container">
    <div className="login_box">
      <div className="login_title">Login Form</div>
      <input className="login_input" value={inputValue} onChange={(e)=>{setInputValue(e.target.value)}} type="text" placeholder="Type your name "/>
      <Link to={`/main?name=${inputValue}`}>
      <button className="login_button" onClick={newJoin}>Login</button>
      </Link>
    </div>
  </div>
  )
}

export default Login