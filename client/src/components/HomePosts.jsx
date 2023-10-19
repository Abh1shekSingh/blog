import { IF } from "../url"

const HomePosts = ({post}) => {
  return (
    <div className="w-full flex flex-col md:flex-row justify-center items-center mt-8 space-x-4">
      {/* LEFT */}
      <div className="md:w-[45%] w-full rounded  h-[200px] flex justify-center items-center overflow-hidden">
        <img src={IF+post.photo} alt="blog-image" className="object-cover" />
      </div>
      {/* RIGHT */}
      <div className="flex flex-col md:w-[65%] w-[85%]">
        <h1 className="text-2xl font-bold md:mb-2 mb-1 md:text-2xl font-fira md:mt-0 mt-5">
        {post.title}
        </h1>
        <div className="flex mb-2 text-sm font-semibold text-gray-500 items-center justify-between md:mb-4">
          <p className="font-fira italic font-light underline">by {post.username}</p>
          <div className="flex space-x-2 font-fira italic ">
            <p>{new Date(post.addedAt).toString().slice(0,15)}</p>
            <p>{new Date(post.addedAt).toString().slice(16,21)}</p>
          </div>
        </div>
        <div className="text-md md:text-md text-[--softTextColor] font-fira font-light md:mb-0 mb-5"  dangerouslySetInnerHTML={{__html: post?.desc.slice(0,300)+"...Read More"}}/> 
      </div>
    </div>
  )
}

export default HomePosts