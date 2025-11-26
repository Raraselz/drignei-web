import { useState } from 'react'
import viteLogo from '/vite.svg'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import SideBar from './components/sidebar.jsx'
import CosminBounce from './minigames/cosminbounce.jsx'
import Home from './pages/home.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div className="w-full h-full bg-linear-160 from-red-600 via-black to-black">
    <SideBar></SideBar>
      <main>
        <Routes>
          <Route path='/drignei-web/' element={<Home />}/>
          <Route path='/drignei-web/bouncegame' element={<CosminBounce />}/>
        </Routes>
      </main>
      </div>
    </>
  )
}

export default App