import axios from "axios"
import { MdDelete } from "react-icons/md"
import { URL } from "../url"
import { useContext } from "react"
import { UserContext } from "../context/userContext"


const Comment = ({c,post}) => {

  const { user } = useContext(UserContext)

  const handleDeleteComment = async() =>{
    try {
       await axios.delete(URL + "/api/comments/" + c._id , {withCredentials:true})
      // console.log(res.data)
      window.location.reload(true)
    }catch(err) {
      console.log(err)
    }
  }
  return (
    <div className="px-2 py-2 bg-gray-200 rounded-lg my-2"> 
        <div className="flex items-center justify-between">
            <div className="flex justify-center items-center gap-2">
              <h3 className="font-light text-gray-600 font-fira text-sm italic ">@{c.author}</h3>
              <p className={`text-sm font-fira text-gray-600 font-light bg-teal-600 text-white px-2 rounded ${post?.userId === c?.userId ? 'block' : 'hidden'}`}>Author</p>
            </div>
            <div className="flex justify-center items-center space-x-4 font-fira italic text-sm">
                  <p>{new Date(c.addedAt).toString().slice(0,15)}</p>
                  <p className="hidden">{new Date(c.addedAt).toString().slice(16,21)}</p>
                {user?._id === c?.userId && <div className="flex items-center justify-center space-x-2">
                    <p className="cursor-pointer hover:text-red-600 transition duration-300 ease-in-out" onClick={handleDeleteComment}><MdDelete /></p>
                </div>}
            </div>
        </div>
        <p className="px-4 py-2 font-fira text-md">{c.comment}</p>
    </div>
  )
}

export default Comment