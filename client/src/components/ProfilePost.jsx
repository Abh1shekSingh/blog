import { IF } from "../url"
import error404 from "../../../server/images/404.png";
import error404_1 from "../../../server/images/4041.png";
import error404_2 from "../../../server/images/4042.png";
import error404_3 from "../../../server/images/4043.png";
import error404_4 from "../../../server/images/4044.png";
import error404_5 from "../../../server/images/4045.png";
import { useEffect, useState } from "react";

const errorImages = [
  error404,error404_1,error404_2,error404_3,error404_4,error404_5
];

const getRandomErrorImage = () => {
  const randomIndex = Math.floor(Math.random() * errorImages.length);
  return errorImages[randomIndex];
};
const ProfilePost = ({post}) => {
  // console.log(post)
  const [imgError, setImgError] = useState(false);
  const [errorImage, setErrorImage] = useState("");

  useEffect(() => {
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
  }, [post.photo]);
  return (
    <div className="w-full flex md:flex-row flex-col justify-center items-center mt-8 space-x-4">
      {/* LEFT */}
      <div className="md:w-[35%]  h-[200px] flex justify-center items-center overflow-hidden">
        <img src={imgError ? errorImage : IF+post?.photo} alt="" className="object-cover" />
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