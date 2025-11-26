import Icon from "./icon"
import { useEffect, useState } from "react"
function Bookmarks({ toggleDialogDiv, dialogDivOpen }) {
  
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    const newBookmarks = [];
    for(let i = 1; i <= 7; i++) {
      const bookmark = localStorage.getItem('bookmark_' + i);
      if(bookmark)
      {
        newBookmarks.push(JSON.parse(bookmark));
        continue;
      }
      else{
        const bookmark = {
          href: `https://www.facebook.com/maria.drignei/?locale=ro_RO`,
          src: `https://scontent.fcra1-1.fna.fbcdn.net/v/t39.30808-1/356379865_3457504497848826_2587823873892593405_n.jpg?stp=c0.0.396.396a_dst-jpg_s200x200_tt6&_nc_cat=107&ccb=1-7&_nc_sid=e99d92&_nc_ohc=nVCbaWUGeuAQ7kNvwFCb4Ea&_nc_oc=AdmvycPxNoB1VoPx_C9MGRKSoetcHY-ni5f2CDFKvI1YtIykPqNtR6_BXIq4VXBJI60&_nc_zt=24&_nc_ht=scontent.fcra1-1.fna&_nc_gid=NpuwEgKPXo1e6oqhs9Yrgg&oh=00_AfhS8Bt-1j_b0CjZGZF559eCYkFhY80Wkc76bYBUJ6mhlg&oe=692BF391`,  
          alt: `Bookmark ${i}`
        }
        newBookmarks.push(bookmark);
        localStorage.setItem('bookmark_' + i, JSON.stringify(bookmark));
      }
      // const bookmark = {
      //   href: `https://www.facebook.com/maria.drignei/?locale=ro_RO`,
      //   src: `https://scontent.fcra1-1.fna.fbcdn.net/v/t39.30808-1/356379865_3457504497848826_2587823873892593405_n.jpg?stp=c0.0.396.396a_dst-jpg_s200x200_tt6&_nc_cat=107&ccb=1-7&_nc_sid=e99d92&_nc_ohc=nVCbaWUGeuAQ7kNvwFCb4Ea&_nc_oc=AdmvycPxNoB1VoPx_C9MGRKSoetcHY-ni5f2CDFKvI1YtIykPqNtR6_BXIq4VXBJI60&_nc_zt=24&_nc_ht=scontent.fcra1-1.fna&_nc_gid=NpuwEgKPXo1e6oqhs9Yrgg&oh=00_AfhS8Bt-1j_b0CjZGZF559eCYkFhY80Wkc76bYBUJ6mhlg&oe=692BF391`, 
      //   alt: `Bookmark ${i}`
      // };
      // newBookmarks.push(bookmark);
      // localStorage.setItem('bookmark_' + i, JSON.stringify(bookmark));
    }
    setBookmarks(newBookmarks);
  }, [])

  return (
    <div className="mt-10 max-w-1/2 flex justify-center items-center gap-6 flex-wrap">
      {bookmarks.map((bookmark, index) => (
        <Icon key={index} index={index} href={bookmark.href} src={bookmark.src} alt={bookmark.alt} toggleDialogDiv={toggleDialogDiv} dialogDivOpen={dialogDivOpen} />
      ))}
    </div>
  )
}

export default Bookmarks