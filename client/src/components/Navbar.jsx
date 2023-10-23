import { Link, useLocation, useNavigate } from "react-router-dom"
import "../App.css"
import { BsSearch } from "react-icons/bs"
import { FaBars } from "react-icons/fa"
import { useContext, useState } from "react"
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
  const [open,setOpen] = useState(true);
  const showMenu = () => {
    setMenu(!menu);
  }

  const handleClick = () => {
    setOpen(false);
  }
  const { user } = useContext(UserContext)
  // console.log(user);
  
  return (
    <>
    {open && <div className="bg-teal-700 text-white flex items-center justify-evenly p-4 ">
      <div className="flex items-center justify-center flex-col">
        <h3 className="font-fira text-xl">If you see continuous loading beneath <b>Recent posts</b> heading, just wait few minutes it will start working!</h3>
        <p className="text-sm font-fira">I am using free backend service which shuts the server automatically and delete images of the blog after 15 minutes of no traffic</p>
      </div>
      <div className="absolute right-7 cursor-pointer" onClick={handleClick}><ImCross /></div>
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