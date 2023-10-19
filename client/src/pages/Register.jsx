import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import { URL } from "../url"

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async() => {
    try {
      const res = await axios.post(URL+"/api/auth/register", {username, email, password})
      console.log(res);
      setUsername(res.data.username)
      setEmail(res.data.email)
      setPassword(res.data.password)
      setError(false)
      navigate("/login")
    }catch(err) {
      setError(true)
      console.log(err);
    }
  }
  
  return (
    <>
    <div className="flex items-center justify-between px-6 md:px-[200px] py-4">
        <h1 className="text-lg md:text-2xl font-extrabold font-bricolage ">CraftzBlogs</h1>
        <h3 className="transition duration-300 ease-in-out border border-black-500 bg-black hover:bg-slate-600 hover:text-black text-white font-lato font-bold px-4 py-2 rounded-lg  text-black hover:shadow-lg cursor-pointer"><Link to="/login">Login</Link></h3>
    </div>
    <div className="w-full flex justify-center items-center h-[81vh]">
        <div className="flex flex-col justify-center items-center space-y-4 w-[80%] md:w-[25%]">
            <h1 className="text-xl font-bold text-left font-merriweather">Welcome Aboard!</h1>
            <p className="text-center font-fira font-regular">Don&apos;t use you bank password! We did&apos;nt paid much for the security system.</p>
            <input onChange={(e) => setUsername(e.target.value)} className="w-full px-4 py-2 border-2 border-black outline-0 font-fira" type="text" placeholder="Username" />
            <input onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-2 border-2 border-black outline-0 font-fira" type="text" placeholder="Email" />
            <input onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-2 border-2 border-black outline-0 font-fira" type="password" placeholder="Password" />
            <button onClick={handleRegister} className="w-full px-4 py-4 text-lg font-bold text-white bg-black rounded-lg hover:bg-gray-500 hover:text-black font-lato transition duration-300">Register</button>
            {error && <h3 className="text-red-500">Something Went Wrong!!</h3>}
            <div className="flex justify-center items-center space-x-4 font-fira">
                <p>Already have account!</p>
                <p className="text-gray-500"><Link to="/login">Login</Link></p>
            </div>
        </div>
    </div>
    </>
  )
}

export default Register