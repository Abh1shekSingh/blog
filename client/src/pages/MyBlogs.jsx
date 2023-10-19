/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react"
import Footer from "../components/Footer"
import Loader from "../components/Loader"
import Navbar from "../components/Navbar"
import { UserContext } from "../context/userContext"
import { Link, useLocation } from "react-router-dom"
import { URL } from "../url"
import axios from "axios"
import HomePosts from "../components/HomePosts"


const MyBlogs = () => {

    const { user } = useContext(UserContext)
    console.log(user)
    const { search } = useLocation()
    // console.log(path)
    const [post, setPosts] = useState([]);
    const [noResults, setNoResults] = useState(false);
    const [loader, setLoader] = useState(false);

    const fetchPost = async() => {
        setLoader(true)
        try {
          const res = await axios.get(URL+"/api/posts/user/"+user._id)
          // console.log(res.data);
          setPosts(res.data);
          if(res.data.length === 0) {
            setNoResults(true)
          }else {
            setNoResults(false)
          }
          setLoader(false)
        }
          catch(err) {
            console.log(err);
          }
      } 
    
      useEffect(() => {
        fetchPost();
      }, [search])
  return (
    <div>
    <Navbar />
    <div className="px-8 md:px-[200px] min-h-[80vh]">
        {loader ? <div className="h-[40vh] flex justify-center items-center"><Loader /></div> : !noResults ? post.map((p) => (
          <>
            <Link to={user ? `/posts/post/${p._id}` : "/login"}>
              <HomePosts key={p._id} post = {p} />
            </Link>
          </>
        )) : <h3 className="text-center font-bold mt-16">No Post Available</h3>}
      </div>
    <Footer />
    </div>
  )
}

export default MyBlogs