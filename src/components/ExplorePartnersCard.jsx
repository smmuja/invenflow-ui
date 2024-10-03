import { useNavigate } from "react-router-dom";
import { firstEachWordCapitalize } from "../utils";
import userMaleImage from "/src/assets/user-male.png";
import { exploreUserUrl } from "../config/paths";

export function ExplorePartnersCards({ users }) {
  const navigate = useNavigate();
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 px-3 pb-3 ">
        {users.map((user) => (
          <>
            <div
              key={user._id}
              className="bg-white rounded-md border shadow-md p-3"
            >
              <div className="bg-gray-200  size-20 rounded-full flex flex-row gap-3">
                <img
                  src={userMaleImage}
                  alt="Product image"
                  className="p-2 size-20"
                />
                <div className="flex flex-col justify-between mb-2">
                  <p>
                    {firstEachWordCapitalize(
                      `${user.user_info?.first_name || "User"} ${
                        user.user_info?.last_name || "User"
                      }`
                    )}
                  </p>
                  <button
                    className={`bg-blue-300 px-2 py-1 rounded-md text-sm`}
                  >
                    {user.email}
                  </button>
                </div>
              </div>
              <div className="m-3">
                <button
                  onClick={() => {
                    navigate(`${exploreUserUrl}/${user.username}`);
                  }}
                  className="bg-blue-500 px-4 py-2 rounded-md w-full my-3"
                >
                  Visit Profile
                </button>
              </div>
            </div>
          </>
        ))}
      </div>
    </>
  );
}
