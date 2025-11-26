import { useState } from 'react'
import Bookmarks from '../components/bookmarks.jsx'

function Home() {
  const [query, setQuery] = useState('');
  const [darkOverlayOpacity, setDarkOverlayOpacity] = useState(0);
  const [dialogDivOpen, setDialogDivOpen] = useState(false);
  const [currentBookmarkIndex, setCurrentBookmarkIndex] = useState(0);
  const [currentBookmarkIndexURL, setCurrentBookmarkIndexURL] = useState("");

  const getURLfavicon = (url) => {
    try {
      const urlObj = new URL(url);
      return `${urlObj.protocol}//${urlObj.hostname}/favicon.ico`;
    } catch (error) {
      return "";
    }
  }

  function highResFaviconUrl(pageUrl, size = 128) {
    try {
      const urlObj = new URL(pageUrl);
      const domain = urlObj.hostname;
      // FaviconKit (preferred)
      //return `https://api.faviconkit.com/${domain}/${size}`;
      // Or, if you prefer Google:
      return `https://www.google.com/s2/favicons?domain=${domain}&sz=${size}`;
    } catch (e) {
      return ""; // invalid URL
    }
  }

  const toggleDialogDiv = (bookmark_index) => {
    if (!dialogDivOpen) {
      setCurrentBookmarkIndex(bookmark_index);
      const bookmark = localStorage.getItem('bookmark_' + bookmark_index);
      setCurrentBookmarkIndexURL(bookmark ? JSON.parse(bookmark).href : "");
    }
    else if (dialogDivOpen) {
      const imgfavicon = highResFaviconUrl(currentBookmarkIndexURL);
      localStorage.setItem('bookmark_' + currentBookmarkIndex, JSON.stringify({ href: currentBookmarkIndexURL, src: `${imgfavicon}`, alt: `bookmark_ + ${currentBookmarkIndex}` }));
    }
    const nextOpen = !dialogDivOpen;
    setDialogDivOpen(nextOpen);
    setDarkOverlayOpacity(nextOpen ? 0.5 : 0);
  }


  const handleSubmit = (e) => {
    e.preventDefault();
    window.open(`https://www.google.com/search?q=${query}`, '_blank');
  }

  return (
    <div className="relative w-full h-full">
      <div className="w-full h-screen flex justify-center flex-col flex-nowrap items-center" >

        <div className="text-white text-5xl italic font-bold select-none">DRIGNEI Web</div>

        <form onSubmit={handleSubmit}>
          <input className="min-w-2xl max-w-2xl mt-10 focus:border-0 outline-none p-3 rounded-lg bg-gray-800 text-white border-0" type="text" placeholder="Google Search" value={query} onChange={(e) => setQuery(e.target.value)} />
          <button className="ml-2 p-3 rounded-lg bg-gray-600 text-white font-semibold hover:bg-gray-900 transition" type="submit">Search</button>
        </form>

        <div className="mt-4">
          {/* <button // open dialog
            onClick={() => toggleDialogDiv(1)}
            className="p-2 rounded bg-indigo-600 text-white hover:bg-indigo-700"
          >
            Test Dialog
          </button> */}
        </div>

        <Bookmarks toggleDialogDiv={toggleDialogDiv} dialogDivOpen={dialogDivOpen} f />
      </div>

      <div // dark overlay
        className="fixed inset-0 bg-black pointer-events-none"
        style={{ opacity: darkOverlayOpacity }}
      ></div>

      <div className={"fixed inset-0 flex items-center justify-center"} style={{ display: dialogDivOpen ? 'flex' : 'none' }}>
        <div className="flex flex-col bg-white p-6 rounded-lg shadow-lg max-w-lg w-full mx-4">
          <div className="flex justify-between items-start">
            <h3 className="text-lg font-semibold">Edit Bookmark</h3>
            <button onClick={() => toggleDialogDiv(currentBookmarkIndex)} className="text-gray-600 hover:text-gray-800">✕</button>
          </div>
          <form onSubmit={(e) => { toggleDialogDiv(currentBookmarkIndex) }}>
            <label className="block text-sm font-medium mt-4">URL</label>
            <input
              type="text"
              className="border rounded-sm mt-2 w-full p-1"
              value={currentBookmarkIndexURL}
              onChange={(e) => setCurrentBookmarkIndexURL(e.target.value)}
            />
            <button type="submit" className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
              Save
            </button>
          </form>
        </div>
      </div>

    </div>
  )
}

export default Home