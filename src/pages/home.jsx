import { useState, useEffect } from 'react'
import Bookmarks from '../components/bookmarks.jsx'
import editButtonImg from '../assets/edit-button.png'

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

  // const getGithubAvatar = async (username) => {
  //   const res = await fetch(`https://api.github.com/users/${username}`);
  //   if (!res.ok) {
  //     throw new Error('Network response was not ok');
  //   }
  //   const data = await res.json();
  //   return data;
  // }

  const handleSubmit = (e) => {
    e.preventDefault();
    window.open(`https://www.google.com/search?q=${query}`, '_blank');
  }

  // useEffect(() => {
  //   getGithubAvatar('raraselz').then(profile => {
  //     document.getElementById("author1").src = profile.avatar_url ;
  //     document.getElementById("author1_link").href = profile.html_url;
  //   });
  //   getGithubAvatar('constantyn-silvian').then(profile => {
  //     document.getElementById("author2").src = profile.avatar_url ;
  //     document.getElementById("author2_link").href = profile.html_url;
  //   });
  // }, []);

  return (
    <div className="relative w-full bg-transparent">
      <div style={{ height: '93vh' }} className="w-full flex justify-center flex-col flex-nowrap items-center" >

        {/* Titlu */}
        <div className={`text-white font-bold select-none font-custom`} style={{
          fontSize: 'clamp(30px, 5vw, 64px)',
        }}>DRIGNEI Web</div>
        {/* Search Form */}
        <form onSubmit={handleSubmit}>
          <input style={{
            width: "50vw"
          }} className="mt-10 focus:border-0 outline-none p-3 rounded-lg bg-gray-800 text-white border-0" type="text" placeholder="Google Search" value={query} onChange={(e) => setQuery(e.target.value)} />
          <button style={{

          }} className="ml-2 p-3 rounded-lg bg-gray-600 text-white font-semibold hover:bg-gray-900 transition" type="submit">Search</button>
        </form>

        {/* Bookmarks */}
        <Bookmarks toggleDialogDiv={toggleDialogDiv} dialogDivOpen={dialogDivOpen} />
      </div>

      <div // dark overlay
        className="fixed inset-0 bg-black pointer-events-none"
        style={{ opacity: darkOverlayOpacity }}
      ></div>

      <div className={"z-50 fixed inset-0 flex items-center justify-center"} style={{ display: dialogDivOpen ? 'flex' : 'none' }}>
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
      {/* Edit Button */}
      
      <button style={{
        maxwidth: `${Math.max(window.innerWidth * 0.09, 30)}px`,
        height: `${Math.max(window.innerWidth * 0.04, 30)}px`,
      }} className='group absolute flex-row justify-between gap-2 bottom-0 right-0 m-2 bg-transparent rounded-md flex items-center  p-1'>
        <div style={{
          fontSize: `clamp(14px, 2vw, 20px)`,
        }}className='bg-trasparent z-0 font-semibold text-white origin-right translate-x-5 scale-0 group-hover:translate-x-0 group-hover:scale-100 transition-all duration-300'>Customise</div>
        <img style={{
          width: `${Math.max(window.innerWidth * 0.03, 30)}px`,
          height: `${Math.max(window.innerWidth * 0.03, 30)}px`,
        }} src={editButtonImg} className='z-5 group-hover:scale-110 transition-all'></img>
      </button>

      {/* Credentials */}
      <div className='absolute flex flex-row justify-between gap-2 left-0 bottom-0 rounded-tr-md p-2 text-white text-xs select-none font-custom'>
        <a id="author1_link" href='https://github.com/raraselz' target='_black'>
          <img src="https://avatars.githubusercontent.com/u/204874877?v=4" style={{
            width: `${Math.max(window.innerWidth * 0.03, 30)}px`,
            height: `${Math.max(window.innerWidth * 0.03, 30)}px`,
            borderRadius: '50%',
            marginRight: '4px'
          }} className="hover:border-2" id="author1"></img>
        </a>
        <a id="author2_link" href="https://github.com/constantyn-silvian" target='_black'>
          <img src="https://avatars.githubusercontent.com/u/205173445?v=4" style={{
            width: `${Math.max(window.innerWidth * 0.03, 30)}px`,
            height: `${Math.max(window.innerWidth * 0.03, 30)}px`,
            borderRadius: '50%',
            marginRight: '4px'
          }} className="hover:border-2" id="author2"></img>
        </a>
      </div>

    </div>
  )
}

export default Home