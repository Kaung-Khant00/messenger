import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {BrowserRouter,Routes,Route} from "react-router-dom"
import './index.css'
import App from './App.jsx'
import Message from './Message.jsx'
import Login from './Login.jsx'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes path="/">
        <Route path="/login" element={<Login/>}/>
        <Route path="/main" element={<Message/>}/>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
