import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Bookmarks from './components/bookmarks.jsx'

function App() {
  const [query, setQuery] = useState('');
  const [darkOverlayOpacity, setDarkOverlayOpacity] = useState(0);
  const [dialogDivOpen, setDialogDivOpen] = useState(false);
  const [currentBookmarkIndex, setCurrentBookmarkIndex] = useState(0);
  const [currentBookmarkIndexTitle, setCurrentBookmarkIndexTitle] = useState("");
  const [currentBookmarkIndexURL, setCurrentBookmarkIndexURL] = useState("");


  const toggleDialogDiv = (bookmark_index) => {
    setCurrentBookmarkIndex(bookmark_index);
    const nextOpen = !dialogDivOpen;
    setCurrentBookmarkIndex(bookmark_index);
    setDialogDivOpen(nextOpen);
    setDarkOverlayOpacity(nextOpen ? 0.5 : 0);
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

        <div className="mt-4">
          <button // open dialog
            onClick={() => toggleDialogDiv(0)}
            className="p-2 rounded bg-indigo-600 text-white hover:bg-indigo-700"
          >
            Test Dialog
          </button>
        </div>

        <Bookmarks />
      </div>
      </div>
      <div // dark overlay
        className="fixed inset-0 bg-black pointer-events-none" 
        style={{ opacity: darkOverlayOpacity }}
      ></div>

      <div className={"fixed inset-0 flex items-center justify-center"} style={{ display: dialogDivOpen ? 'flex' : 'none'}}>
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full mx-4">
          <div className="flex justify-between items-start">
            <h3 className="text-lg font-semibold">Edit Bookmark</h3>
            <button onClick={() => toggleDialogDiv(0)} className="text-gray-600 hover:text-gray-800">✕</button>
          </div>
          <form className="p-3">
            <label className="block text-sm font-medium">Title</label>
            <input
              type="text"
              className="border-1 rounded-sm mt-2 w-full p-1"
              value={currentBookmarkIndexTitle}
              onChange={(e) => setCurrentBookmarkIndexTitle(e.target.value)}
            />
            <label className="block text-sm font-medium mt-4">URL</label>
            <input
              type="text"
              className="border-1 rounded-sm mt-2 w-full p-1"
              value={currentBookmarkIndexURL}
              onChange={(e) => setCurrentBookmarkIndexURL(e.target.value)}
            />
          </form>
        </div>
      </div>

    </div>
  )
}

export default App