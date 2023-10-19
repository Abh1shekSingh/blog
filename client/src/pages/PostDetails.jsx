/* eslint-disable react-hooks/exhaustive-deps */
import { useNavigate, useParams } from "react-router-dom"
import Comment from "../components/Comment"
import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import { BiEdit } from "react-icons/bi"
import { MdDelete } from "react-icons/md"
import axios from "axios"
import { URL,IF } from "../url"
import { useContext, useEffect,  useState } from "react"
import { UserContext } from "../context/userContext"

const PostDetails = () => {
    
    
    const navigate = useNavigate()
    const { user } = useContext(UserContext)
    const [comments, setComments] = useState([])
    const [comment, setComment] = useState("")
    const [open, setOpen] = useState(false);
    const postId = useParams().id
    
    const [post, setPost] = useState()
    const fetchPost = async() => {
        try {
            const res = await axios.get(URL+"/api/posts/"+postId)
            // console.log(res.data)
            setPost(res.data)
        }catch(err) {
            console.log(err)
        }
    }

    
    useEffect(() => {
        
        fetchPost()
    }, [postId])

    const fetchPostComments = async() => {
        try {
            const res = await axios.get(URL + "/api/comments/post/"+postId)
            setComments(res.data)
        }catch(err) {
            console.log(err)
        }
    }
    
    useEffect(() => {
        fetchPostComments()
    
    }, [postId])

    const handleDeletePost = async() => {
        try{
            await axios.delete(URL + "/api/posts/"+postId, {withCredentials:true})
            // console.log(res.data)
            navigate("/")
        }catch(err) {
            console.log(err);
        }
    }

    const handleAddComment = async() => {
        try {
            await axios.post(URL + "/api/comments/create", {comment:comment, author:user.username, postId:postId, userId:user._id}, {withCredentials:true})
            // console.log(res.data)
            fetchPostComments()
            setComment("")
            window.location.reload(true)
        }catch(err) {
            console.log(err)
        }
    }
    const handleOpen = () => {
        setOpen(!open)
    }
  return (
    <div>
        <Navbar />
        <div className="px-8 md:px-[300px] mt-14 ">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl text-black md:text-[42px] font-archivo ">{post?.title}</h1>
                {user?._id === post?.userId && <div className="flex items-center justify-center space-x-2 text-lg">
                    <p className="cursor-pointer" onClick={() => navigate("/edit/"+postId)}><BiEdit /></p>
                    <p className="cursor-pointer hover:text-red-600 transition duration-300 ease-in-out" onClick={handleOpen}><MdDelete /></p>
                </div>}
            </div>
            {open && <div className="bg-white rounded w-[80%] md:w-[25%] p-5 gap-3 flex justify-center items-center flex-col absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] ">
                {/* <p className="">criss</p> */}
                <p className="font-merriweather text-center text-md">Are you sure? You want to Delete the post.</p>
                <div className="flex gap-2">
                    <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={handleDeletePost}>Delete</button>
                    <button className="bg-black text-white px-4 py-2 rounded" onClick={handleOpen} >Cancel</button>
                </div>
            </div>}
            <div className="flex items-center justify-between mt-2 md:mt-4">
                <p className="italic underline font-fira font-light text-sm">by {post?.username}</p>
                <div className="flex space-x-2 italic text-sm">
                    <p>{new Date(post?.addedAt).toString().slice(0,15)}</p>
                    <p className="hidden">{new Date(post?.addedAt).toString().slice(16,21)}</p>
                </div>
            </div>
            <img src={IF+post?.photo} alt="" className="w-[55em] mx-auto mt-8 h-full object-cover" />
            <div className="mx-auto mt-8 text-xl font-merriweather font-light leading-9" dangerouslySetInnerHTML={{__html: post?.desc}} />
        {/* <div className="flex  items-center mt-8 space-x-4 font-semibold">
            <p>Categories</p>
            <div className="flex justify-center items-center space-x-2">
                {post?.categories?.map((c, i) => (
                <div key={i} className="bg-gray-300 rounded-lg px-3 py-1 ">
                    {c}
                </div>
                ))}
            </div>
        </div> */}
            <div className="flex flex-col mt-4">
                <h3 className="mt-6 mb-4 font-semibold font-fira ">Comments</h3>
                {comments.map((c) => (
                    <Comment key={c._id} c={c} post = {post} />
                ))}               
            </div>
            {/* WRITE THE COMMENTS */}
            <div className="w-full flex flex-col mt-4 md:flex-row">
                <input onChange={(e) => setComment(e.target.value)} className="md:w-[90%] outline-none px-4 mt-4 md:mt-0 font-fira" type="text" placeholder="Leave a comment" />
                <button onClick={handleAddComment} className="bg-black text-white px-4 py-2 mt-4 md:mt-0 font-lato">Comment</button>
            </div>
        </div>
        <Footer />
    </div>
  )
}

export default PostDetails