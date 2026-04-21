import { useState } from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import NavBar from './components/navbar.jsx'
import CosminBounce from './pages/cosminbounce.jsx'
import Home from './pages/home.jsx'

function App() {
  const [color1, setColor1] = useState(() => localStorage.getItem('color1') || '#dc2626');
  const [color2, setColor2] = useState(() => localStorage.getItem('color2') || '#000000');
  const [color3, setColor3] = useState(() => localStorage.getItem('color3') || '#000000');
  const [degrees, setDegrees] = useState(() => Number(localStorage.getItem('degrees')) || 160);

  return (
    <>
      <div
        className="w-full h-full"
        style={{ background: `linear-gradient(${degrees}deg, ${color1} 0%, ${color2} 50%, ${color3} 100%)` }}
      >
        <NavBar></NavBar>
        <main>
          <Routes>
            <Route path='/' element={
              <Home
                color1={color1} setColor1={setColor1}
                color2={color2} setColor2={setColor2}
                color3={color3} setColor3={setColor3}
                degrees={degrees} setDegrees={setDegrees}
              />
            } />
            <Route path='/bouncegame' element={<CosminBounce />} />
          </Routes>
        </main>
      </div>
    </>
  )
}

export default App
