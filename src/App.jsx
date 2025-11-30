import { useState } from 'react'
import viteLogo from '/vite.svg'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import NavBar from './components/navbar.jsx'
import CosminBounce from './pages/cosminbounce.jsx'
import Home from './pages/home.jsx'

function App() {
  const [count, setCount] = useState(0);
  const [degrees, setDegrees] = useState(() => {
    const stored = localStorage.getItem('degrees');
    return stored !== null ? Number(stored) : 160;
  });
  return (
    <>
      <div
        className="w-full h-full"
        style={{ background: `linear-gradient(var(--degrees), var(--color-1) 0%, var(--color-2) 50%, var(--color-3) 100%)` }}
      >
        <NavBar></NavBar>
        <main>
          <Routes>
            <Route path='/drignei-web/' element={<Home />} />
            <Route path='/drignei-web/bouncegame' element={<CosminBounce />} />
          </Routes>
        </main>
      </div>
    </>
  )
}

export default App