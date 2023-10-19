/* eslint-disable react-hooks/exhaustive-deps */
import "../App.css"
import { BsFillImageFill } from "react-icons/bs"
import { useContext, useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.bubble.css';
import { Link, useNavigate, useParams } from "react-router-dom";
import { URL } from "../url";
import axios from "axios";
import { UserContext } from "../context/userContext";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditPost = () => {
  const notify = () => {
    toast("⚠️ Remember to select the photo again! ")
  }
  const postId = useParams().id
  // console.log(postId)
  const { user } = useContext(UserContext) 
  const navigate = useNavigate()
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);

  const fetchPost = async() => {
    try {
      const res =await axios.get(URL + "/api/posts/"+postId)
      // console.log(res.data)
      setTitle(res.data.title)
      setDesc(res.data.desc)
      setFile(res.data.photo)
    }
    catch(err) {
      console.log(err);
    }
  }


  useEffect(() =>{
    notify();
    fetchPost();
  }, [postId])

  const handleUpdate = async(e) => {
    e.preventDefault();
    const post = {
      title,
      desc,
      username:user.username,
      userId:user._id,
      
    }

    if(file) {
      const data = new FormData()
      const filename = Date.now()+file.name 
      data.append("img", filename)
      data.append("file", file)
      post.photo = filename
      // console.log(data);
      try {
        await axios.post(URL+"/api/upload",data)
        // console.log(imageUpload.data)
      }catch(err) {
        console.log(err);
      }
    }

    //POST UPLOAD
    // console.log(post)
    try {
      const res = await axios.put(URL+"/api/posts/"+postId,post, {withCredentials:true})
      // console.log(res);
      navigate("/posts/post/"+res.data._id)
    }catch(err) {
      console.log(err);
    }
  }
  return (
    <>
    <div className="flex items-center justify-between px-6 md:px-[200px] py-4">
      <h1 className="text-lg font-extrabold"><Link to="/">CraftzBlogs</Link></h1>
      <button onClick={handleUpdate} className="bg-green-400 text-white px-4 py-2 rounded-full cursor-pointer">Update</button>
      <ToastContainer />
    </div>
    <div className="flex flex-col items-start md:px-[13em] px-4 py-[3em] gap-3 w-full ">
      <input onChange={(e) => setTitle(e.target.value)} value={title} placeholder='Title' type='text' className="outline-none md:text-4xl text-3xl w-full px-4 py-2 h-full font-bold"/>
      <div className="flex items-center justify-center border border-[1px] w-[50px] h-[50px]  rounded-full cursor-pointer" >
      <input id="image" onChange={(e) => setFile(e.target.files[0])} type="file" placeholder="Select image" style={{display:'none'}} />
        <label htmlFor="image">
          <BsFillImageFill className="scale-100 cursor-pointer" />
        </label>
      </div>
      <ReactQuill theme="bubble" className="w-full"  value={desc} onChange={setDesc} placeholder='Tell you Story....'/>
    </div>
    </>
  )
}

export default EditPost