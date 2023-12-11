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
import error404 from "../../../server/images/404.png";
import error404_1 from "../../../server/images/4041.png";
import error404_2 from "../../../server/images/4042.png";
import error404_3 from "../../../server/images/4043.png";
import error404_4 from "../../../server/images/4046.png";
import error404_5 from "../../../server/images/4045.png";
import Modals from "../components/Modals"

const errorImages = [
  error404,error404_1,error404_2,error404_3,error404_4,error404_5
];

const getRandomErrorImage = () => {
  const randomIndex = Math.floor(Math.random() * errorImages.length);
  return errorImages[randomIndex];
};

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

  const [imgError, setImgError] = useState(false);
  const [errorImage, setErrorImage] = useState("");

  useEffect(() => {
    if (post?.photo) {
        const handleImageError = () => {
          setImgError(true);
          setErrorImage(getRandomErrorImage());
        };
  
        // Add error event listener to handle image loading errors
        const image = new Image();
        image.src = IF + post.photo;
        image.addEventListener("error", handleImageError);
  
        // Clean up the event listener on component unmount
        return () => {
          image.removeEventListener("error", handleImageError);
        };
      }
  }, [post?.photo]);

  return (
    <div>
      <Navbar />
      <div className="px-8 md:px-[300px] mt-14 font-saira relative">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl text-black md:text-[60px] leading-[1.25em] font-georama">{post?.title}</h1>
          {user?._id === post?.userId && (
            <div className="flex items-center justify-center space-x-2 text-lg">
              <p className="cursor-pointer" onClick={() => navigate("/edit/" + postId)}>
                <BiEdit />
              </p>
              <p className="cursor-pointer hover:text-red-600 transition duration-300 ease-in-out" onClick={handleOpen}>
                <MdDelete />
              </p>
            </div>
          )}
        </div>
        {open && (
            <Modals
                open={open}
                setOpen={setOpen}
                handleDeletePost={handleDeletePost}
                title="Delete Post"
                desc="Are you sure you want to delete this post?"
            />         
          
        )}
        <div className="flex items-center justify-between mt-2 md:mt-4">
          <p className="italic underline font-light text-sm">by {post?.username}</p>
          <div className="flex space-x-2 italic text-sm">
            <p>{new Date(post?.addedAt).toString().slice(0, 15)}</p>
            <p className="hidden">{new Date(post?.addedAt).toString().slice(16, 21)}</p>
          </div>
        </div>
        <img src={imgError ? errorImage : IF + post?.photo} alt="post_images" className="w-[40em] mx-auto mt-8 h-full object-cover" />
        <div className="mx-auto mt-8 text-xl leading-9" dangerouslySetInnerHTML={{ __html: post?.desc }} />
        <div className="flex flex-col mt-4">
          <h3 className="mt-6 mb-4 font-semibold ">Comments</h3>
          {comments.map((c) => (
            <Comment key={c._id} c={c} post={post} />
          ))}
        </div>
        <div className="w-full flex flex-col mt-4 mb-5 md:flex-row">
          <input onChange={(e) => setComment(e.target.value)} className="md:w-[90%] outline-none px-4 mt-4 md:mt-0" type="text" placeholder="Leave a comment" />
          <button onClick={handleAddComment} className="bg-black text-white px-4 py-2 mt-4 md:mt-0 ">
            Comment
          </button>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default PostDetails