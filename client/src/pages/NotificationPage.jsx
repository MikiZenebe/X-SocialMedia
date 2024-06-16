import { Link } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import LoadingSpinner from "../components/common/LoadingSpinner";

import { IoSettingsOutline } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";

export default function NotificationPage() {
  const queryClient = useQueryClient();

  const { data: notifications, isLoading } = useQuery({
    queryKey: ["notifications"],
    queryFn: async () => {
      try {
        const res = await fetch("/api/notification");
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Something went wrong");
        console.log(data);
        return data;
      } catch (error) {
        throw new Error(error);
      }
    },
  });

  const { mutate: deleteNotifications } = useMutation({
    mutationFn: async () => {
      try {
        const res = await fetch("/api/notification", {
          method: "DELETE",
        });
        const data = await res.json();

        if (!res.ok) throw new Error(data.error || "Something went wrong");
        toast.success("Notifications deleted successfully");

        return data;
      } catch (error) {
        throw new Error(error);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return (
    <>
      <div className="flex-[4_4_0]  bg-[#1b1b1b] rounded-lg min-h-screen ">
        <div className="flex justify-between items-center p-4 border-b border-gray-700">
          <p className="font-bold text-white">Notifications</p>
          <div className="dropdown ">
            <div tabIndex={0} role="button" className="m-1">
              <IoSettingsOutline className="w-4" />
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <a onClick={deleteNotifications}>Delete all notifications</a>
              </li>
            </ul>
          </div>
        </div>
        {isLoading && (
          <div className="flex justify-center h-full items-center">
            <LoadingSpinner size="lg" />
          </div>
        )}
        {notifications?.length === 0 && (
          <div className="text-center p-4 font-bold">No notifications 🤔</div>
        )}

        <div className="flex flex-col gap-2 rounded-lg">
          {notifications?.map((notification) => (
            <div className=" bg-[#272e38] " key={notification._id}>
              <div className="flex gap-2 p-4 items-center">
                {notification.type === "follow" && (
                  <FaUser size={20} className=" text-[#1da1f2]" />
                )}
                {notification.type === "like" && (
                  <FaHeart className=" text-red-500" />
                )}
                <Link
                  className="flex items-center gap-2"
                  to={`/profile/${notification.from.username}`}
                >
                  <div className="avatar">
                    <div className="w-8 rounded-full">
                      <img
                        src={
                          notification.from.profileImg ||
                          "/avatar-placeholder.png"
                        }
                      />
                    </div>
                  </div>
                  <div className="flex gap-1 items-center">
                    <span className="font-bold text-slate-200">
                      @{notification.from.username}
                    </span>{" "}
                    <span className="text-sm">
                      {notification.type === "follow"
                        ? "followed you"
                        : "liked your post"}
                    </span>
                  </div>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
