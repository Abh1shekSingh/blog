import axios from "axios"
import { Link, useNavigate } from "react-router-dom"
import { URL } from "../url"
import { useContext } from "react"
import { UserContext } from "../context/userContext"


const Menu = () => {
  const navigate = useNavigate()
  const { user } = useContext(UserContext);
  const { setUser } = useContext(UserContext)
  const handleLogout = async() => {
    try {
      await axios.get(URL + "/api/auth/logout",{withCredentials:true})
      // console.log(res);
      setUser(null)
      navigate("/")
    }catch(err) {
      console.log(err);
    }
    // localStorage.clear();
    // setUser(null);
    
  }  
  return (
    <div className='bg-slate-900 w-[200px] font-fira shadow-xl flex flex-col items-start absolute z-10 top-12 right-6 md:right-[12em] rounded-md  absolute'>
        {!user && <Link to="/login" className="w-full"><h3 className='text-white  text-sm hover:bg-slate-200 hover:text-black cursor-pointer p-4'>Login</h3></Link>}
        {!user && <Link to="/register" className="w-full"><h3 className='text-white  text-sm hover:text-black hover:bg-slate-200 cursor-pointer p-4'>Register</h3></Link>}
        {user && <Link to="/write" className="w-full"><h3 className='text-white  text-sm  cursor-pointer p-4 hover:bg-slate-200 hover:text-black'>Write</h3></Link>}
        {user && <Link to={"/profile/"+user._id} className="w-full"><h3 className='text-white text-sm  cursor-pointer p-4 hover:bg-slate-200 hover:text-black w-full '>Profile</h3></Link>}
        {user && <Link to={"/myblogs/"+user._id} className="w-full"><h3 className='text-white  text-sm cursor-pointer hover:bg-slate-200 hover:text-black w-full p-4'>My Blogs</h3></Link>}
        {user && <h3 onClick={handleLogout} className='text-red-500 text-sm  cursor-pointer p-4 hover:bg-red-500 w-full hover:text-white'>Logout</h3>}
    </div>
    
  )
}

export default Menu