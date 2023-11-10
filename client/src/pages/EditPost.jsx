/* eslint-disable react-hooks/exhaustive-deps */
import "../App.css"
import { useContext, useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.bubble.css';
import { Link, useNavigate, useParams } from "react-router-dom";
import { URL } from "../url";
import axios from "axios";
import { UserContext } from "../context/userContext";
import 'react-toastify/dist/ReactToastify.css';

const EditPost = () => {
 
  const postId = useParams().id
  // console.log(postId)
  const { user } = useContext(UserContext) 
  const navigate = useNavigate()
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const [selectedImage, setSelectedImage] = useState('');

  const fetchPost = async() => {
    try {
      const res =await axios.get(URL + "/api/posts/"+postId)
      // console.log(res.data)
      setTitle(res.data.title)
      setDesc(res.data.desc)
      setFile(res.data.photo)
      setSelectedImage(URL + "/images/" + res.data.photo);
    }
    catch(err) {
      console.log(err);
    }
  }


  useEffect(() =>{
    fetchPost();
  }, [postId])

  const handleImageChange = async(e) => {
    const img = e.target.files[0]
    console.log(img);
    setFile(img);
    if (img) {
      const reader = new FileReader();

      reader.onload = (event) => {
        setSelectedImage(event.target.result);
      };

      reader.readAsDataURL(img);
    } else {
      // Clear the selected image if no file is chosen
      setSelectedImage('');
    }
  }

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
    if (selectedImage) {
      post.photo = selectedImage.split("/uploads/")[1];
    }
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
      <button onClick={handleUpdate} className="bg-green-400 text-white px-4 py-2 rounded-[10px] cursor-pointer">Update</button>
      {/* <div className="absolute">
        <ToastContainer />
      </div> */}
    </div>
    <div className="flex flex-col items-start md:px-[13em] px-4 py-[3em] gap-3 w-full ">
      <div className="flex items-center justify-center p-4 border border-[1px] rounded-[10px] cursor-pointer hover:bg-slate-800 hover:text-white transition duration-300 ease-in-out hover:shadow-md" >
        <input id="image" onChange={(e) => handleImageChange(e)} type="file" placeholder="Select image" style={{display:'none'}} />
          <label htmlFor="image">
            {/* <BsFillImageFill className="scale-100 cursor-pointer" /> */}
            <h3 className="cursor-pointer">Add a cover image</h3>
          </label>
      </div>
      {selectedImage && (
        <img
          src={selectedImage}
          alt="Selected Image"
          style={{ maxWidth: '20%', maxHeight: '400px' }}
        />
      )}
      <input onChange={(e) => setTitle(e.target.value)} value={title} placeholder='Title' type='text' className="outline-none md:text-4xl text-3xl w-full px-4 py-2 h-full font-bold"/>
      
      <ReactQuill theme="bubble" className="w-full"  value={desc} onChange={setDesc} placeholder='Tell you Story....'/>
    </div>
    </>
  )
}

export default EditPost