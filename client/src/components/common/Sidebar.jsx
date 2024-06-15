import Logo from "/logo.png";
import { MdHomeFilled } from "react-icons/md";
import { IoNotifications, IoLogOut } from "react-icons/io5";
import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

export default function Sidebar() {
  const queryClient = useQueryClient();
  const { mutate: logoutMutate } = useMutation({
    mutationFn: async () => {
      try {
        const res = await fetch("/api/auth/logout", {
          method: "POST",
        });
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "Something went wrong");
        }
        toast.success("Logged out 🚀🚀");
      } catch (error) {
        toast.error(error.message);
      }
    },

    onSuccess: () => {
      //refetch the authUser
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
  });

  const { data: user } = useQuery({ queryKey: ["authUser"] });

  return (
    <div className="md:flex-[2_2_0] w-18 max-w-52 mr-3 ">
      <div className="sticky top-0 left-0 h-screen flex flex-col  w-20 md:w-full bg-[#1b1b1b] rounded-lg">
        <Link
          to="/"
          className="flex items-center  justify-center md:justify-start p-3"
        >
          <img src={Logo} width={50} height={50} />
          <h1 className="hidden md:flex text-white font-semibold">X-Tweet</h1>
        </Link>
        <ul className="flex flex-col gap-3 mt-4 text-white p-3">
          <li className="flex justify-center md:justify-start">
            <Link
              to="/"
              className="flex gap-3 items-center hover:bg-[#2b333d] transition-all rounded-full duration-300 py-2 pl-2 pr-4 max-w-fit cursor-pointer"
            >
              <MdHomeFilled size={20} />
              <span className="text-lg hidden md:block">Home</span>
            </Link>
          </li>
          <li className="flex justify-center md:justify-start">
            <Link
              to="/notifications"
              className="flex gap-3 items-center hover:bg-[#2b333d] transition-all rounded-full duration-300 py-2 pl-2 pr-4 max-w-fit cursor-pointer"
            >
              <IoNotifications size={20} />
              <span className="text-lg hidden md:block">Notifications</span>
            </Link>
          </li>

          <li className="flex justify-center md:justify-start">
            <Link
              to={`/profile/${user?.username}`}
              className="flex gap-3 items-center hover:bg-[#2b333d] transition-all rounded-full duration-300 py-2 pl-2 pr-4 max-w-fit cursor-pointer"
            >
              <FaUser size={20} />
              <span className="text-lg hidden md:block">Profile</span>
            </Link>
          </li>
        </ul>
        {user && (
          <Link
            to={`/profile/${user.username}`}
            className="mt-auto mb-10 flex gap-2 items-start transition-all duration-300 hover:bg-[#2b333d] py-2 px-4 rounded-full"
          >
            <div className="avatar hidden md:inline-flex">
              <div className="w-8 rounded-full">
                <img src={user?.profileImg || "/avatar-placeholder.png"} />
              </div>
            </div>
            <div className="flex justify-between flex-1">
              <div className="hidden md:block">
                <p className="text-white font-bold text-sm w-20 truncate">
                  {user?.fullName}
                </p>
                <p className="text-slate-500 text-sm">@{user?.username}</p>
              </div>
              <IoLogOut
                onClick={(e) => {
                  e.preventDefault();
                  logoutMutate();
                }}
                className="w-5 h-5 cursor-pointer"
              />
            </div>
          </Link>
        )}
      </div>
    </div>
  );
}
