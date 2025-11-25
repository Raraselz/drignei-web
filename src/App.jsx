import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="w-full h-screen flex justify-center flex-col items-center bg-black" >
      

        <div className="text-white text-5xl italic font-bold">DRIGNEI Web</div>

        <form>
          <input className="focus:border-0 outline-none mt-4 p-3 rounded-lg bg-gray-800 text-white border-0" type="text" placeholder="Google Search" /> 
        </form>


    </div>
  )
}

export default App
