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
  const [selectedImage, setSelectedImage] = useState('');
  
  // const handleEditorChange = (content, delta, source, editor) => {
  //   const res = toPlaintext(editor.getContents())
  //   console.log(res)
  //   setDesc(res);
  // }
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
      const res = await axios.post(URL+"/api/posts/create",post, {withCredentials:true})
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
      <button onClick={handleCreate} className={`${title === "" ? `disable opacity-50 cursor-not-allowed`:`opacity-100` } bg-teal-400 font-lato font-bold hover:shadow-md transition duration-300 text-white px-4 py-2 rounded-[10px] cursor-pointer`}>Publish</button>
    </div>
    <div className="flex font-saira flex-col items-start md:px-[13em] px-4 py-[3em] gap-3 w-full ">
      <div className="flex items-center justify-center p-4 border border-[1px] rounded-[10px] cursor-pointer hover:bg-slate-800 hover:text-white transition duration-300 ease-in-out hover:shadow-md" >
        <input id="image" onChange={(e) => handleImageChange(e)} type="file" placeholder="Select image" style={{display:'none', cursor:'pointer'}} />
        <label htmlFor="image">
          {/* <BsFillImageFill  className="scale-100 cursor-pointer" /> */}
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
      <input onChange={(e) => setTitle(e.target.value)} placeholder='Title' type='text' className="outline-none md:text-6xl text-3xl w-full px-4 py-2 h-full font-bold font-georama"/>
      {/* <p className="font-fira">{file?.name}</p>
       */}
      <ReactQuill theme="bubble" value={desc}  className="w-full border-none font-saira outline-0 text-xl"   placeholder='Tell your Story....' onChange={setDesc}/>
    </div>
    </>
  )
}

export default CreatePost