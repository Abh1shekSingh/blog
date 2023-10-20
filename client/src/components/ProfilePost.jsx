import { IF } from "../url"

const ProfilePost = ({post}) => {
  // console.log(post)
  return (
    <div className="w-full flex md:flex-row flex-col justify-center items-center mt-8 space-x-4">
      {/* LEFT */}
      <div className="md:w-[35%]  h-[200px] flex justify-center items-center overflow-hidden">
        <img src={IF+post?.photo} alt="" className="object-cover" />
      </div>
      {/* RIGHT */}
      <div className="flex flex-col md:w-[65%] w-[85%]">
        <h1 className="text-2xl font-fira font-bold md:mb-2 mb-1 md:text-2xl md:mt-0 mt-5">
        {post?.title}
        </h1>
        <div className="flex italic font-fira font-light mb-2 text-sm  text-gray-500 items-center justify-between md:mb-4">
          <p>by {post?.username}</p>
          <div className="flex space-x-2">
            <p>{new Date(post?.addedAt).toString().slice(0,15)}</p>
            <p className="hidden">{new Date(post?.addedAt).toString().slice(16,21)}</p>
          </div>
        </div>
        <div className="text-md md:text-md text-[--softTextColor] font-fira font-regular" dangerouslySetInnerHTML={{__html: post?.desc.slice(0,300)+"...Read More"}} />
      </div>
    </div>
  )
}

export default ProfilePost