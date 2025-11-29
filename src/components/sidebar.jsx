import { useState, useEffect } from "react"
import { Link } from "react-router-dom"

export default function SideBar() {
  const [currentTimeText, setCurrentTimeText] = useState("")

  useEffect(() => {
    const update = () => {
      const now = new Date()
      const hours = String(now.getHours()).padStart(2, '0')
      const minutes = String(now.getMinutes()).padStart(2, '0')
      const seconds = String(now.getSeconds()).padStart(2, '0')
      setCurrentTimeText(`${hours}:${minutes}:${seconds} ${now.toDateString()}`)
    }

    update()
    const id = setInterval(update, 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <nav
      style={{ height: '7vh', backgroundColor: 'rgba(55, 65, 81, 0.5)' }}
      className="relative w-full z-50 bg-gray-700 hover:bg-gray-600 transition-colors duration-300 rounded-b-xl flex items-center"
    >
      <div className="flex justify-between w-full text-white px-4">
        <Link
          style={{ fontSize: 'clamp(14px, 2vw, 20px)' }}
          className="font-semibold hover:font-bold"
          to="/drignei-web/"
        >
          Home
        </Link>

        <Link
          style={{ fontSize: 'clamp(14px, 2vw, 20px)' }}
          className="ml-4 font-semibold hover:font-bold"
          to="/drignei-web/bouncegame"
        >
          Cosmin Bounce
        </Link>
      </div>

      <div
        aria-hidden={false}
        className="absolute text-center text-lg left-1/2 transform -translate-x-1/2 text-white font-light "
        style={{ pointerEvents: 'none',
          fontSize: 'clamp(9px, 2vw, 20px)',
          width: '20vw'
         }}
      >
        {currentTimeText}
      </div>
    </nav>
  )
}
                  