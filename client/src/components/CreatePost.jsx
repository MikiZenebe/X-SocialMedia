import { CiImageOn, CiMenuBurger, CiCalendar } from "react-icons/ci";
import { BsCameraVideo } from "react-icons/bs";
import { useRef, useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

export default function CreatePost() {
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);
  const imgRef = useRef(null);

  const { data: user } = useQuery({ queryKey: ["authUser"] });
  const queryClient = useQueryClient();

  const {
    mutate: createPost,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: async ({ text, img }) => {
      try {
        const res = await fetch("/api/post/create", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ text, img }),
        });
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || "Something went wrong");
        }
        toast.success("Post created successfully");
        return data;
      } catch (error) {
        throw new Error(error);
      }
    },

    onSuccess: () => {
      setText("");
      setImg(null);

      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    createPost({ text, img });
  };

  const handleImgChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImg(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex p-4 items-start gap-4 border rounded-lg mt-3 border-[#363636]">
      <div className="avatar">
        <div className="w-8 rounded-full">
          <img src={user.profileImg || "/avatar-placeholder.png"} />
        </div>
      </div>
      <form className="flex flex-col gap-2 w-full" onSubmit={handleSubmit}>
        <div className="flex">
          <textarea
            className="textarea w-full p-0 text-lg resize-none bg-transparent border-none focus:outline-none  border-gray-800"
            placeholder="What is happening?"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />

          <button
            type="submit"
            className="btn bg-[#1da1f2] rounded-full btn-sm text-white px-4"
          >
            {isPending ? "Tweeting..." : "Tweet"}
          </button>
        </div>

        {img && (
          <div className="relative w-72 mx-auto">
            <IoCloseSharp
              className="absolute top-0 right-0 text-white bg-gray-800 rounded-full w-5 h-5 cursor-pointer"
              onClick={() => {
                setImg(null);
                imgRef.current.value = null;
              }}
            />
            <img
              src={img}
              className="w-full mx-auto h-72 object-contain rounded"
            />
          </div>
        )}

        <div className="flex justify-around md:justify-between border-t py-2 border-t-[#363636]">
          <div>
            <div
              onClick={() => imgRef.current.click()}
              className="flex gap-1 items-center cursor-pointer"
            >
              <CiImageOn size={20} className="fill-[#6e6e6e] cursor-pointer " />
              <span className="hidden md:flex">Image</span>
              <input
                type="file"
                accept="image/*"
                hidden
                ref={imgRef}
                onChange={handleImgChange}
              />
            </div>
          </div>
          <div>
            <div className="flex gap-1 items-center cursor-pointer">
              <BsCameraVideo
                size={20}
                className="fill-[#6e6e6e] cursor-pointer "
                onClick={() => imgRef.current.click()}
              />
              <span className="hidden md:flex">Video</span>
            </div>
          </div>
          <div>
            <div className="flex gap-1 items-center cursor-pointer">
              <CiMenuBurger
                size={20}
                className="fill-[#6e6e6e] cursor-pointer "
                onClick={() => imgRef.current.click()}
              />
              <span className="hidden md:flex">Thread</span>
            </div>
          </div>
          <div>
            <div className="flex gap-1 items-center cursor-pointer">
              <CiCalendar
                size={20}
                className="fill-[#6e6e6e] cursor-pointer "
                onClick={() => imgRef.current.click()}
              />
              <span className="hidden md:flex">Meeting</span>
            </div>
          </div>
        </div>
        {isError && <div className="text-red-500">{error.message}</div>}
      </form>
    </div>
  );
}
