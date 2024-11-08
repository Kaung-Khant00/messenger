import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Chat from './Chat.jsx'
import {BrowserRouter} from "react-router-dom"
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <Chat />
    </BrowserRouter>
  </StrictMode>,
)
