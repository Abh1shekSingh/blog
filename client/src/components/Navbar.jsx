import { Link, useLocation, useNavigate } from "react-router-dom"
import "../App.css"
import { BsSearch } from "react-icons/bs"
import { FaBars } from "react-icons/fa"
import { useContext, useEffect, useState } from "react"
import Menu from "./Menu"
import { UserContext } from "../context/userContext"
import { BsPencilSquare } from 'react-icons/bs'
import { ImCross } from "react-icons/im"
const Navbar = () => {

  const path = useLocation().pathname
  const navigate = useNavigate();
  const [prompt, setPrompt] = useState("");
  // console.log(prompt)
  const [menu , setMenu] = useState(false);
  const [showNote,setShowNote] = useState(true);
  const showMenu = () => {
    setMenu(!menu);
  }

  const handleClick = () => {
    setShowNote(false);
    localStorage.setItem('visitedBefore', 'true');
  };

  useEffect(() => {
    const hasVisitedBefore = localStorage.getItem('visitedBefore');
    if (hasVisitedBefore) {
      setShowNote(false);
    }
  }, []);
  const { user } = useContext(UserContext)
  // console.log(user);
  
  return (
    <>
    {showNote && <div className="bg-yellow-400 text-white flex items-center gap-10 justify-evenly p-4 ">
      <div className="flex items-center justify-center flex-col">
        <h3 className="font-fira md:text-xl  text-lg text-black"><strong>NOTE:</strong> Wait 1 - 2 minutes for Server to load before making any query ! </h3>
        {/* <p className="text-sm md:block hidden font-fira text-black">I am using free backend service which shuts the server automatically and delete images of the blog after 15 minutes of no traffic</p> */}
      </div>
      <div className="right-7 cursor-pointer text-black" onClick={handleClick}><ImCross /></div>
    </div>}
    <div className={` flex items-center justify-between px-6 md:px-[200px] py-4`} >
      <h1 className="text-2xl font-extrabold font-bricolage"><Link to="/">CraftzBlogs</Link></h1>
     {path === "/" && <div className="flex justify-center items-center space-x-0">
        <p onClick={() => navigate(prompt?"?search="+prompt:navigate("/"))} className="cursor-pointer"><BsSearch/></p>
        <input onChange={(e) => setPrompt(e.target.value)} className={`outline-none px-3 font-fira`} placeholder="Search Post" type="text" />
      </div>}
      <div className="hidden md:flex items-center justify-center space-x-2 md:space-x-4 font-fira">
        {/* <h3 onClick={toggleTheme} className="cursor-pointer">
          {theme === 'dark' ? <BsMoonFill /> : <BsSunFill />}
        </h3> */}
        { user ?<Link to="/write"><div className="flex justify-center items-center hover:text-slate-500 cursor-pointer transition duration-300"><BsPencilSquare /><h3 className=" px-2 py-1 rounded text-black hover:text-slate-500 transition duration-300 font-fira">Write</h3></div></Link> : <div className="transition duration-500 ease-in-out border border-black-500 px-4 py-2 rounded-lg  text-black hover:shadow-lg cursor-pointer"><Link to="/login">Login</Link></div>}
        { user ?<div onClick={showMenu} >
          <p className="cursor-pointer relative"><FaBars /></p>
          {menu  && <Menu user = {user} />}
        </div> : <div><Link to="/register" className="transition duration-500 ease-in-out border border-black px-4 py-2 rounded-lg bg-black text-white hover:shadow-lg cursor-pointer">Register</Link></div>}
      </div>
      <div onClick={showMenu} className="md:hidden">
        <p className="cursor-pointer relative "><FaBars /></p>
        {menu  && <Menu user = {user} />}
      </div>
    </div>
    </>
  )
}

export default Navbar