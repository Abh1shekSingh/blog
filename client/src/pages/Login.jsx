import axios from "axios";
import { useContext, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { URL } from "../url"
import { UserContext } from "../context/userContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const { setUser } = useContext(UserContext)
  const navigate = useNavigate();

  const handleLogin = async() => {
    try {
      const res = await axios.post(URL+"/api/auth/login", {email, password},{withCredentials:true})
      setUser(res.data);
      localStorage.setItem('user', res.data);
      navigate("/")
    }catch(err) {
      setError(true);
      console.log(err);
    }
  }
  return (
    <>
    <div className="flex items-center justify-between px-6 md:px-[200px] py-4">
        <h1 className="text-lg md:text-2xl font-extrabold font-bricolage ">CraftzBlogs</h1>
        <h3 className="bg-black px-4 py-2 font-lato text-white rounded-full hover:text-black hover:bg-slate-600 transition duration-300"><Link to="/register">Register</Link></h3>
    </div>
    <div className="-full flex justify-center items-center h-[81vh]">
        <div className="flex flex-col justify-center items-center space-y-4 w-[80%] md:w-[25%]">
            <h1 className="text-xl font-bold text-left font-merriweather">Welcome Back !</h1>
            <p className="font-fira text-center">You&apos;ve got 99 problems, but your password ain&apos;t one. Or is it? 🤔</p>
            <input onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-2 border-2 border-black outline-0 font-fira" type="email" placeholder="Email" />
            <input onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-2 border-2 border-black outline-0 font-fira" type="password" placeholder="Password" />
            <button onClick={handleLogin} className="w-full px-4 py-4 text-lg font-bold font-lato transition duration-300 text-white bg-black rounded-lg hover:bg-gray-500 hover:text-black">Log In</button>
            {error && <h3 className="text-red-500">Something Went Wrong!</h3>}
            <div className="flex justify-center items-center space-x-4 font-fira">
                <p>New here?</p>
                <p className="text-gray-500"><Link to="/register">Register</Link></p>
            </div>
        </div>
    </div>
    </>
  )
}

export default Login