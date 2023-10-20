import "../App.css"
import { BsFillImageFill } from "react-icons/bs"
import { useContext,  useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.bubble.css';
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext";
import axios from "axios";
import { URL } from "../url";

const CreatePost = () => {
  const navigate = useNavigate()
  const { user } = useContext(UserContext)
  // console.log(user)
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  
  // const handleEditorChange = (content, delta, source, editor) => {
  //   const res = toPlaintext(editor.getContents())
  //   console.log(res)
  //   setDesc(res);
  // }

  const handleCreate = async(e) => {
    
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
      const res = await axios.post(URL+"/api/posts/create",post, {withCredentials:true,headers:{"Content-Type":'application/json', Accept:'application/json', 'Access-Control-Allow-Origin':
      'https://craftzblog.vercel.app',}})
      // console.log(res);
      navigate("/posts/post/"+res.data._id)
      
    }catch(err) {
      console.log(err);
    }
  }
  

  // console.log(title)
  // console.log(file)
  // console.log(desc)
  
  
  return (
    <>
    <div className="flex items-center justify-between px-6 md:px-[200px] py-4">
      <h1 className="text-2xl font-extrabold  font-bricolage"><Link to="/">CraftzBlogs</Link></h1>
      <button onClick={handleCreate} className={`${title === "" ? `disable opacity-50 cursor-not-allowed`:`opacity-100` } bg-teal-400 font-lato font-bold hover:shadow-md transition duration-300 text-white px-4 py-2 rounded-full cursor-pointer`}>Publish</button>
    </div>
    <div className="flex flex-col items-start md:px-[13em] px-4 py-[3em] gap-3 w-full ">
      <input onChange={(e) => setTitle(e.target.value)} placeholder='Title' type='text' className="outline-none md:text-4xl text-3xl w-full px-4 py-2 h-full font-bold font-merriweather"/>
      <div className="flex items-center justify-center border border-[1px] w-[50px] h-[50px]  rounded-full cursor-pointer hover:bg-slate-800 hover:text-white transition duration-300 ease-in-out hover:shadow-md" >
        <input id="image" onChange={(e) => setFile(e.target.files[0])} type="file" placeholder="Select image" style={{display:'none'}} />
        <label htmlFor="image">
          <BsFillImageFill  className="scale-100 cursor-pointer" />
        </label>
      </div>
      <p className="font-fira">{file?.name}</p>
      <ReactQuill theme="bubble" value={desc}  className="w-full border-none outline-0 text-xl "   placeholder='Tell you Story....' onChange={setDesc}/>
    </div>
    </>
  )
}

export default CreatePost