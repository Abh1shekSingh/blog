/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios"
import Footer from "../components/Footer"
import HomePosts from "../components/HomePosts"
import Navbar from "../components/Navbar"
import { useContext, useEffect, useState } from "react"
import { URL } from "../url"
import { Link, useLocation } from "react-router-dom"
import Loader from "../components/Loader"
import { UserContext } from "../context/userContext"
import Instagram from "../assets/instagramLogo.svg"
import LinkedIn from "../assets/linkedinLogo.svg"
// import Leetcode from "../assets/leetcodeLogo.svg"

const Home = () => {

  const { user } = useContext(UserContext)
  // console.log(user)
  const { search } = useLocation()
  // console.log(path)
  const [post, setPosts] = useState([]);
  const [noResults, setNoResults] = useState(false);
  const [loader, setLoader] = useState(false);

  const fetchPost = async() => {
    setLoader(true)
    try {
      const res = await axios.get(URL+"/api/posts/"+search)
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
    <>
      <Navbar />
      <div className="mt-[5em] px-[2em] md:px-[12em] flex flex-col items-start justify-center">
        <h1 className="text-4xl mb-[1.5em] md:text-6xl font-fira font-light"><b className="font-bricolage">Hey, Craftingbugs here!</b> Discover new Stories and creative ideas.</h1>
        <div className="flex items-start justify-center gap-[50px] flex-col md:flex-row">
          <div className="flex-1 h-[500px] ">
            <img src="https://images.pexels.com/photos/5185446/pexels-photo-5185446.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" className="object-cover" />
          </div>
          <div className="px-4 flex-1 flex flex-col gap-[20px] ">
            <h1 className="text-3xl font-bold font-merriweather">Craftzblogs-<span className="font-merriweather font-light">Explore, Learn, Grow</span></h1>
            <p className="text-[--softTextColor] font-fira font-light">
            Welcome to CraftzBlogs, your destination for inspiration and knowledge. Discover a world of insights, trends, and expert tips. Dive in, explore, and be inspired. Join us on this journey of discovery.

This shorter introduction conveys the essence of your blog, inviting visitors to explore and learn without excessive detail. Engage with our content, connect with like-minded individuals, and take your first step towards a world of possibilities.
            </p>
            <div className="flex gap-2">
              <Link to="https://www.instagram.com/_abh1sheksingh/"><img className="w-[25px] rounded cursor-pointer" src={Instagram} alt="instagram_logo"/></Link>
              <Link to="https://www.linkedin.com/in/craftingbugs/"><img className="w-[25px] rounded cursor-pointer" src={LinkedIn} alt="linkedin_logo"/></Link>
              <Link to="https://leetcode.com/abhishek210702/"><img className="w-[25px] rounded cursor-pointer" src="" alt="leetcode_logo"/></Link>
            </div>
          </div>
        </div>
      </div>
      <h2 className="text-3xl text-center mb-[2em] md:mt-0 mt-[2em] font-semibold font-fira ">Recent Posts</h2>
      <div className="px-8 md:px-[200px] min-h-[80vh] ">
        {loader ? <div className="h-[40vh] flex justify-center items-center"><Loader /></div> : !noResults ? post.map((p) => (
          <>
            <Link to={user ? `/posts/post/${p._id}` : "/login"}>
              <HomePosts key={p._id} post = {p} />
            </Link>
          </>
        )) : <h3 className="text-center font-light font-fira mt-16 italic">No Post Available</h3>}
      </div>
      <Footer />
    </>
  )
}

export default Home