import Icon from "./icon"
import { useEffect, useState } from "react"
function Bookmarks() {
  
  const [bookmarks, setBookmarks] = useState([{
    href: "",
    src: "",
    alt: ""
  }])

  useEffect(() => {
    setBookmarks([])
    for(let i = 1; i <= 9; i++) {
      setBookmarks(prev => [...prev, {
        href: `https://example.com/bookmark${i}`,
        src: `/assets/bookmark${i}.png`, 
        alt: `Bookmark ${i}`
      }])
    } 
  }, [])

  return (
    <div className="mt-10 max-w-1/2 flex justify-center items-center gap-6 flex-wrap">
      {bookmarks.map((bookmark, index) => (
        <Icon key={index} href={bookmark.href} src={bookmark.src} alt={bookmark.alt} />
      ))}
    </div>
  )
}

export default Bookmarks