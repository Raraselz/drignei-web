import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Bookmarks from './components/bookmarks.jsx'

function App() {
  const [query, setQuery] = useState('');
  const [darkOverlayOpacity, setDarkOverlayOpacity] = useState(0);
  const [dialogDivOpen, seDialogDivOpen] = useState(false);

  const toggleDialogDiv = () => {
    seDialogDivOpen(!dialogDivOpen);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    window.open(`https://www.google.com/search?q=${query}`, '_blank');
  }

  const displayBookmarkEdit = () => {
  }

  return (
    <div className="relative w-full h-screen">
      <div className=' bg-linear-160 from-red-700 via-black to-black'>
      <div className="w-full h-screen flex justify-center flex-col flex-nowrap items-center" >
      
        <div className="text-white text-5xl italic font-bold select-none">DRIGNEI Web</div>

        <form onSubmit={handleSubmit}>
          <input className="min-w-2xl max-w-2xl mt-10 focus:border-0 outline-none p-3 rounded-lg bg-gray-800 text-white border-0" type="text" placeholder="Google Search" value={query} onChange={(e) => setQuery(e.target.value)}/> 
          <button className="ml-2 p-3 rounded-lg bg-gray-600 text-white font-semibold hover:bg-gray-900 transition" type="submit">Search</button>
        </form>

        <Bookmarks />
      </div>
      </div>
      <div 
        className="fixed inset-0 bg-black pointer-events-none" 
        style={{ opacity: darkOverlayOpacity }}
      ></div>

      <div className='fixed position-absolute top-1/6 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg'
           style={{ display: dialogDivOpen ? 'block' : 'none' }}
      >
        dialog test
      </div>

    </div>
  )
}

export default App