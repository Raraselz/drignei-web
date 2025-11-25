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
    for(let i = 1; i <= 7; i++) {
      setBookmarks(prev => [...prev, {
        href: `https://www.facebook.com/maria.drignei/?locale=ro_RO`,
        src: `https://scontent.fcra1-1.fna.fbcdn.net/v/t39.30808-1/356379865_3457504497848826_2587823873892593405_n.jpg?stp=c0.0.396.396a_dst-jpg_s200x200_tt6&_nc_cat=107&ccb=1-7&_nc_sid=e99d92&_nc_ohc=nVCbaWUGeuAQ7kNvwFCb4Ea&_nc_oc=AdmvycPxNoB1VoPx_C9MGRKSoetcHY-ni5f2CDFKvI1YtIykPqNtR6_BXIq4VXBJI60&_nc_zt=24&_nc_ht=scontent.fcra1-1.fna&_nc_gid=NpuwEgKPXo1e6oqhs9Yrgg&oh=00_AfhS8Bt-1j_b0CjZGZF559eCYkFhY80Wkc76bYBUJ6mhlg&oe=692BF391`, 
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