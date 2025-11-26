import { Link } from "react-router-dom"

export default function SideBar() {
  return (
    <nav style={{ height: '7vh' }} className="w-full z-50 bg-gray-700 hover:bg-gray-600 transition-colors duration-300 rounded-b-md flex items-center">
     <div className="flex justify-between w-full text-white px-4 ">
      <Link style={{ fontSize: "clamp(14px, 2vw, 20px)" }} className=" font-semibold hover:font-bold " to="/drignei-web/">Home</Link>
      <Link style={{ fontSize: "clamp(14px, 2vw, 20px)" }} className="ml-4 font-semibold hover:font-bold" to="/drignei-web/bouncegame">Bounce Game</Link>
      </div>
    </nav>    
  )
}
                  