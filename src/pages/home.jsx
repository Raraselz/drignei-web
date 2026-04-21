import { useState, useEffect } from 'react'
import Bookmarks from '../components/bookmarks.jsx'
import editButtonImg from '../assets/edit-button.png'
import { X, Search } from 'lucide-react'

function Home({ color1, setColor1, color2, setColor2, color3, setColor3, degrees, setDegrees }) {
  const [query, setQuery] = useState('');
  const [darkOverlayOpacity, setDarkOverlayOpacity] = useState(0);
  const [dialogDivOpen, setDialogDivOpen] = useState(false);
  const [currentBookmarkIndex, setCurrentBookmarkIndex] = useState(0);
  const [currentBookmarkIndexURL, setCurrentBookmarkIndexURL] = useState("");
  const [currentCustomizationPanelOpen, setCurrentCustomizationPanelOpen] = useState(false);
  const [currentCustomizationPanelPosition, setCurrentCustomizationPanelPosition] = useState('-280px');

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
      //return `https://api.faviconkit.com/${domain}/${size}`;
      return `https://www.google.com/s2/favicons?domain=${domain}&sz=${size}`;
    } catch (e) {
      return "";
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

  const toggleCustomizationPanel = () => {
    if (!currentCustomizationPanelOpen) {
      setCurrentCustomizationPanelPosition('0px');
      setCurrentCustomizationPanelOpen(true);
    }
    else {
      setCurrentCustomizationPanelPosition('-280px');
      setCurrentCustomizationPanelOpen(false);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if(query.trim())
    {
      window.open(`https://www.google.com/search?q=${encodeURIComponent(query)}`, '_blank');
    }
  }

  useEffect(() => { localStorage.setItem('color1', color1); }, [color1]);
  useEffect(() => { localStorage.setItem('color2', color2); }, [color2]);
  useEffect(() => { localStorage.setItem('color3', color3); }, [color3]);
  useEffect(() => { localStorage.setItem('degrees', degrees); }, [degrees]);

  return (
    <div className="relative w-full bg-transparent">
      <div style={{ height: '93vh' }} className="w-full flex justify-center flex-col flex-nowrap items-center" >

        <div className={`text-white font-bold select-none font-custom`} style={{
          fontSize: 'clamp(30px, 5vw, 64px)',
        }}>DRIGNEI Web</div>
        <form onSubmit={handleSubmit} className="flex items-center mt-10">
          <input
            style={{ width: '50vw' }}
            className="focus:border-0 focus:bg-gray-700 transition-all outline-none p-3 rounded-lg bg-gray-800 text-white border-0"
            type="text"
            placeholder="Google Search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            type="submit"
            className="ml-2 px-3 py-3 rounded-lg bg-gray-600 hover:bg-gray-500 text-white cursor-pointer transition inline-flex items-center justify-center"
          >
            <Search />
          </button>
        </form>

        <Bookmarks toggleDialogDiv={toggleDialogDiv} dialogDivOpen={dialogDivOpen} />
      </div>

      <div
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
      
      <button style={{
        maxwidth: `${Math.max(window.innerWidth * 0.09, 30)}px`,
        height: `${Math.max(window.innerWidth * 0.04, 30)}px`,
      }} className='group absolute cursor-pointer flex-row justify-between gap-2 bottom-0 right-0 m-2 bg-transparent rounded-md flex items-center p-1'>
        <div style={{
          fontSize: `clamp(14px, 2vw, 20px)`,
        }}className='bg-trasparent z-0 font-semibold text-white origin-right translate-x-5 scale-0 group-hover:translate-x-0 group-hover:scale-100 transition-all duration-300'>Customise</div>
        <img style={{
          width: `${Math.max(window.innerWidth * 0.03, 30)}px`,
          height: `${Math.max(window.innerWidth * 0.03, 30)}px`,
        }} src={editButtonImg} onClick={toggleCustomizationPanel} className='z-5 group-hover:scale-110 transition-all'></img>
      </button>

      <div style={{ right: currentCustomizationPanelPosition, top: "7vh", height:"93vh", transition: 'right 0.3s ease-in-out' }} className='select-none fixed w-70 z-40 bg-gray-900 border-l border-gray-700 shadow-lg'>
        <div className='p-4 flex flex-row justify-between items-center'>
          <h2 className='text-white font-semibold text-lg font-sans'>Customization</h2> <X className="text-white cursor-pointer hover:opacity-90 hover:shadow-white" onClick={toggleCustomizationPanel} /> 
        </div>
        <div className="px-4">
          <div className="grid grid-cols-1 gap-4">
            <label className="flex items-center justify-between gap-3 bg-gray-800 p-2 rounded">
              <span className="text-white">Color #1</span>
              <input type="color" className="cursor-pointer  hover:border-2 border-white transition-all w-12 h-8 rounded" value={color1} onChange={(e) => setColor1(e.target.value)} />
            </label>

            <label className="flex items-center justify-between gap-3 bg-gray-800 p-2 rounded">
              <span className="text-white">Color #2</span>
              <input type="color" className="cursor-pointer hover:border-2 border-white w-12 h-8 rounded" value={color2} onChange={(e) => setColor2(e.target.value)} />
            </label>
            <label className="flex items-center justify-between gap-3 bg-gray-800 p-2 rounded">
              <span className="text-white">Color #3</span>
              <input type="color" className="cursor-pointer hover:border-2 border-white transition-all w-12 h-8 rounded" value={color3} onChange={(e) => setColor3(e.target.value)} />
            </label>
            <div className="flex flex-col bg-gray-800 p-2 rounded">
              <label className="flex items-center justify-between mb-2">
                <span className="text-white">Gradient Angle</span>
                <span className="text-white">{degrees}°</span>
              </label>
              <input
                type="range"
                min="0"
                max="360"
                value={degrees}
                onChange={(e) => setDegrees(Number(e.target.value))}
                className="w-full"
              />
            </div>
          </div>
        </div>
      </div>

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
