import { useNavigate } from "react-router-dom";
import userImg from "/src/assets/user-male.png";
import { exploreUserUrl } from "../../config/paths";

export function ProductDetailOwner({ product = {} }) {
  const navigate = useNavigate();
  return (
    <>
      <div className="p-3 mb-5 bg-gray-300 rounded-md w-full sm:max-w-lg">
        <h2 className="font-semibold">Product and Business Owner</h2>
        <div className="flex flex-row items-center gap-3">
          <div className="bg-blue-300 w-fit p-5 rounded-full my-3">
            <img src={userImg} alt="" className="rounded-full size-16" />
          </div>
          <p>{product.user_id.username}</p>
        </div>

        <button
          onClick={() => {
            navigate(`${exploreUserUrl}/${product.user_id.username}`);
          }}
          className="bg-blue-500 px-4 py-2 rounded-md my-5"
        >
          View Profile
        </button>
      </div>
    </>
  );
}
