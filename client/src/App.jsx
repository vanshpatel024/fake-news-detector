import { useState } from 'react'
import Home from './Pages/Home'
import './index.css'
import './StyleSheets/App.css'
import Notification from './Components/Notification'

function App() {
  return (
    <>
      <Notification />
      <div className="app-container">
        <Home />
      </div>
    </>
  )
}

export default App
