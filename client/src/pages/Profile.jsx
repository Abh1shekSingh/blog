/* eslint-disable react-hooks/exhaustive-deps */

import { useContext, useEffect, useState } from "react"
import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import ProfilePost from "../components/ProfilePost"
import axios from "axios"
import { URL } from "../url"
import { UserContext } from "../context/userContext"
import { Link, useNavigate, useParams } from "react-router-dom"


const Profile = () => {

    const param = useParams().id
    const { user, setUser } = useContext(UserContext)
    const navigate = useNavigate()
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [posts, setPosts] = useState([]);
    const [update, setUpdate] = useState(false);
    const [open, setOpen] = useState(false)

    const handleOpen = () => {
        setOpen(!open)
    }

    const fetchProfile = async() => {
        try {
            const res = await axios.get(URL+"/api/users/"+user._id)
            setUsername(res.data.username)
            setEmail(res.data.email)
            setPassword(res.data.password)
        }catch(err) {
            console.log(err);
        }
    }

    

    const handleUserUpdate = async() => {
        setUpdate(false)
        try {
            await axios.put(URL+"/api/users/"+user._id, {username, email, password}, {withCredentials:true})
            // console.log(res.data)
            setUpdate(true)
        }catch(err) {
            console.log(err)
            setUpdate(false)
        }
    }

    const handleUserDelete = async() => {
        try {
             await axios.delete(URL+"/api/users/"+user._id, {withCredentials:true})
            // console.log(res.data)
            setUser(null)
            navigate("/")
        }catch(err) {
            console.log(err)
        }
    }

    const fetchUserPost = async() => {
        try {
            const res = await axios.get(URL+"/api/posts/user/"+user._id)
            setPosts(res.data)
        }catch(err) {
            console.log(err)
        }
    }

    useEffect(() => {
        fetchProfile()
    }, [param])

    useEffect(() => {
        fetchUserPost()
    }, [param])

    
  return (
    <div className="relative">
        <Navbar />
        <div className="px-8 md:px-[200px] mt-8 flex md:flex-row flex-col-reverse md:items-start ">
        <div className="flex flex-col md:w-[70%] min-h-[80vh] w-full mt-8 md:mt-0">
            <h1 className="text-xl font-bold mb-4 font-fira">Your Posts</h1>
            {posts.length !== 0 ? posts.map((post) => (
                <Link key={post._id} to={`/posts/post/${post._id}`}><ProfilePost key={post._id} post = {post} /></Link>
            )) : <h3 className="flex justify-center items-center font-fira font-bold italic">No post available!</h3>}
        </div>
        <div className="md:sticky md:top-16 flex justify-start md:justify-end items-start md:w-[30%] w-full md:items-end ">
            <div className="flex flex-col spce-y-4 items-start">
                <h1 className="text-xl font-bold mb-4 font-fira">Profile</h1>
                <input onChange={(e) => setUsername(e.target.value)}  value={username} className="outline-none border-2 mb-1 px-4 py-2 text-gray-500 font-fira font-light" placeholder="Username" type="text"/>
                <input onChange={(e) => setEmail(e.target.value)} value={email} className="outline-none border-2 px-4 py-2 text-gray-500 font-fira font-light" placeholder="Email" type="email"/>
                {/* <input onChange={(e) => setPassword(e.target.value)} className="outline-none px-4 py-2 text-gray-500" placeholder="Passoword" type="password"/> */}
                <div className="flex items-center space-x-4 mt-8">
                    <button onClick={handleUserUpdate} className="text-white font-smibold bg-black px-4 py-2 hover:text-black hover:bg-gray-400 rounded transition duration-300">Update</button>
                    <button onClick={handleOpen} className="text-white font-smibold bg-red-500 px-4 py-2 hover:text-black hover:bg-gray-400 rounded transition duration-300">Delete</button>
                </div>
                {update && <h3 className="text-gree-500">User Updated Successfully!</h3>}
            </div>
        </div>
        {open && <div className="bg-white border-2 py-10 rounded w-[80%] md:w-[25%] flex justify-center items-center flex-col absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]">
                <p className="font-merriweather mb-3">You want to delete your profile?</p>
                <div className="flex gap-2">
                    <button className="rounded bg-red-500 px-4 py-2 text-white" onClick={handleUserDelete}>Delete</button>
                    <button className="rounded bg-black px-4 py-2 text-white" onClick={handleOpen}>Cancel</button>
                </div>
        </div>}
        </div>
        <Footer />
    </div>
  )
}

export default Profile