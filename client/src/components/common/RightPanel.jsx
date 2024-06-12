import { Link } from "react-router-dom";
import RightPanelSkeleton from "../skeletons/RightPanelSkeleton";
import { USERS_FOR_RIGHT_PANEL } from "../../utils/fakeData";

export default function RightPanel() {
  const isLoading = false;

  return (
    <div className="hidden lg:block my-4 mx-2">
      <div className="bg-[#1b1b1b] p-4 rounded-md sticky top-2">
        <p className="font-bold border-b border-gray-400 mb-2 text-slate-200">
          Who to follow
        </p>
        <div className="flex flex-col gap-4">
          {/* item */}
          {isLoading && (
            <>
              <RightPanelSkeleton />
              <RightPanelSkeleton />
              <RightPanelSkeleton />
              <RightPanelSkeleton />
            </>
          )}
          {!isLoading &&
            USERS_FOR_RIGHT_PANEL?.map((user) => (
              <Link
                to={`/profile/${user.username}`}
                className="flex items-center justify-between gap-4"
                key={user._id}
              >
                <div className="flex gap-2 items-center">
                  <div className="avatar">
                    <div className="w-8 rounded-full">
                      <img src={user.profileImg || "/avatar-placeholder.png"} />
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-semibold tracking-tight truncate w-28 text-slate-200">
                      {user.fullName}
                    </span>
                    <span className="text-sm text-gray-600">
                      @{user.username}
                    </span>
                  </div>
                </div>
                <div>
                  <button
                    className="btn hover:bg-white hover:opacity-90 rounded-full btn-sm btn-outline border-slate-200 text-slate-200"
                    onClick={(e) => e.preventDefault()}
                  >
                    + Follow
                  </button>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
}
