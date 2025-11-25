import Icon from "./icon"
import { useEffect, useState } from "react"
function Bookmarks() {
  
  const [bookmarks, setBookmarks] = useState([{
    href: "",
    src: "",
    alt: ""
  }])

  useEffect(() => {
    for(let i = 0; i < 8; i++) {
      setBookmarks(prev => [...prev, {
        href: `https://example.com/bookmark${i}`,
        src: `/assets/bookmark${i}.png`, 
        alt: `Bookmark ${i}`
      }])
    } 
  }, [])

  return (
    <div className="mt-20 max-w-sm flex justify-center items-center space-x-8">
      {bookmarks.map((bookmark, index) => (
        <Icon key={index} href={bookmark.href} src={bookmark.src} alt={bookmark.alt} />
      ))}
    </div>
  )
}

export default Bookmarks