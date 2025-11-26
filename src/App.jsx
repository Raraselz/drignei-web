import { useState, useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Bookmarks from './components/bookmarks.jsx'

function App() {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeSuggestion, setActiveSuggestion] = useState(-1);
  const suggestionsRef = useRef(null);
  const [darkOverlayOpacity, setDarkOverlayOpacity] = useState(0);
  const [dialogDivOpen, setDialogDivOpen] = useState(false);
  const [currentBookmarkIndex, setCurrentBookmarkIndex] = useState(0);
  const [currentBookmarkIndexURL, setCurrentBookmarkIndexURL] = useState("");
  const debounceTimer = useRef(null);

  const getURLfavicon = (url) => {
    try {
      const urlObj = new URL(url);
      return `${urlObj.protocol}//${urlObj.hostname}/favicon.ico`;
    } catch (error) {
      return "";
    }
  }

  const fetchSuggestions = async (searchQuery) => {
    if (!searchQuery.trim()) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    try {
      // Use dev-time Vite proxy: /suggest -> https://suggestqueries.google.com/complete/search
      const url = `/suggest?client=firefox&q=${encodeURIComponent(searchQuery)}`;
      const response = await fetch(url);
      if (!response.ok) throw new Error('Suggestion API error: ' + response.status);
      const data = await response.json();
      // Google returns [query, [suggestions], ...]
      const phrases = Array.isArray(data) && Array.isArray(data[1]) ? data[1] : [];
      setSuggestions(phrases);
      setShowSuggestions(phrases.length > 0);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }

  const handleQueryChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    setActiveSuggestion(-1);
    
    // Clear existing timer
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }
    
    // Set new timer to debounce API calls
    debounceTimer.current = setTimeout(() => {
      fetchSuggestions(value);
    }, 300);
  }

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion);
    setShowSuggestions(false);
    setActiveSuggestion(-1);
    window.open(`https://www.google.com/search?q=${suggestion}`, '_blank');
  }

  const scrollActiveIntoView = () => {
    try {
      const container = suggestionsRef.current;
      if (!container) return;
      const active = container.querySelector('[data-active="true"]');
      if (active) active.scrollIntoView({ block: 'nearest' });
    } catch (e) {
      // ignore
    }
  }

  const getHighlighted = (text, q) => {
    if (!q) return text;
    const idx = text.toLowerCase().indexOf(q.toLowerCase());
    if (idx === -1) return text;
    return (
      <>
        {text.slice(0, idx)}
        <span className="bg-yellow-300 text-black px-0.5 rounded">{text.slice(idx, idx + q.length)}</span>
        {text.slice(idx + q.length)}
      </>
    );
  }

  const handleKeyDown = (e) => {
    if (!showSuggestions || suggestions.length === 0) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveSuggestion(prev => {
        const next = prev + 1 >= suggestions.length ? 0 : prev + 1;
        return next;
      });
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveSuggestion(prev => {
        const next = prev - 1 < 0 ? suggestions.length - 1 : prev - 1;
        return next;
      });
    } else if (e.key === 'Enter') {
      if (activeSuggestion >= 0) {
        e.preventDefault();
        const s = suggestions[activeSuggestion];
        handleSuggestionClick(s);
      }
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
      setActiveSuggestion(-1);
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
    if(!dialogDivOpen)
    {
      setCurrentBookmarkIndex(bookmark_index);
      const bookmark = localStorage.getItem('bookmark_' + bookmark_index);
      setCurrentBookmarkIndexURL(bookmark ? JSON.parse(bookmark).href : "");
    }
    else if(dialogDivOpen)
    {
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
    <div className="relative w-full h-screen">
      <div className=' bg-linear-160 from-red-700 via-black to-black'>
      <div className="w-full h-screen flex justify-center flex-col flex-nowrap items-center" >
      
        <div className="text-white text-5xl italic font-bold select-none">DRIGNEI Web</div>

        <form onSubmit={handleSubmit} className="relative w-full flex justify-center">
          <div className="relative">
            <input 
              className="min-w-2xl max-w-2xl mt-10 focus:border-0 outline-none p-3 rounded-lg bg-gray-800 text-white border-0 focus:ring-2 focus:ring-indigo-500" 
              type="text" 
              placeholder="Search Google or suggestions" 
              value={query} 
              onChange={handleQueryChange}
              onKeyDown={handleKeyDown}
              onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
              role="combobox"
              aria-autocomplete="list"
              aria-expanded={showSuggestions}
              aria-controls="suggestions-list"
              aria-activedescendant={activeSuggestion >= 0 ? `suggestion-${activeSuggestion}` : undefined}
            /> 
              {showSuggestions && suggestions.length > 0 && (
                <div id="suggestions-list" ref={suggestionsRef} className="absolute top-full left-0 right-0 mt-2 bg-gray-900 text-white rounded-lg shadow-xl z-50 max-h-64 overflow-y-auto w-full">
                  {suggestions.slice(0, 8).map((suggestion, index) => (
                    <div
                      key={index}
                      id={`suggestion-${index}`}
                      data-active={activeSuggestion === index}
                      onMouseDown={() => handleSuggestionClick(suggestion)}
                      onMouseEnter={() => setActiveSuggestion(index)}
                      role="option"
                      aria-selected={activeSuggestion === index}
                      className={`px-4 py-3 cursor-pointer transition border-b border-gray-700 last:border-b-0 ${activeSuggestion === index ? 'bg-gradient-to-r from-indigo-700 via-gray-800 to-gray-700' : 'hover:bg-gray-800'}`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-gray-400">🔍</span>
                        <span className="truncate">{getHighlighted(suggestion, query)}</span>
                      </div>
                    </div>
                  ))}
                  {activeSuggestion >= 0 && scrollActiveIntoView()}
                </div>
              )}
          </div>
          <button className="ml-2 mt-10 px-5 py-3 rounded-lg bg-gray-600 text-white font-semibold hover:bg-gray-900 transition" type="submit">Search</button>
        </form>

        <div className="mt-4">
          {/* <button // open dialog
            onClick={() => toggleDialogDiv(1)}
            className="p-2 rounded bg-indigo-600 text-white hover:bg-indigo-700"
          >
            Test Dialog
          </button> */}
        </div>

        <Bookmarks toggleDialogDiv={toggleDialogDiv} dialogDivOpen={dialogDivOpen}f/>
      </div>
      </div>
      <div // dark overlay
        className="fixed inset-0 bg-black pointer-events-none" 
        style={{ opacity: darkOverlayOpacity }}
      ></div>

      <div className={"fixed inset-0 flex items-center justify-center"} style={{ display: dialogDivOpen ? 'flex' : 'none'}}>
        <div className="flex flex-col bg-white p-6 rounded-lg shadow-lg max-w-lg w-full mx-4">
          <div className="flex justify-between items-start">
            <h3 className="text-lg font-semibold">Edit Bookmark</h3>
            <button onClick={() => toggleDialogDiv(currentBookmarkIndex)} className="text-gray-600 hover:text-gray-800">✕</button>
          </div>
          <form onSubmit={(e) => {toggleDialogDiv(currentBookmarkIndex)}}>
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

export default App