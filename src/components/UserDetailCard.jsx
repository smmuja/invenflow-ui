import { firstEachWordCapitalize, dateFormatter } from "../utils";
import userMaleImage from "/src/assets/user-male.png";

export const DataPair = ({ label, data }) => {
  return (
    <div className="rounded-md p-1 px-5 my-2 flex w-full justify-between gap-3">
      <div className="flex items-start justify-start w-2/5">
        <p>{label}</p>
      </div>
      <div className="flex justify-start items-start w-3/5">
        <p>{data}</p>
      </div>
    </div>
  );
};

export function UserDetailCard({ user = {} }) {
  return (
    <>
      <div className="bg-white flex flex-col items-center border p-3">
        <div className="bg-gray-200  size-20 rounded-full flex flex-row items-center gap-3">
          <img
            src={userMaleImage}
            alt="Product image"
            className="p-2 size-20"
          />
        </div>

        <div className="w-full lg:w-1/2">
          <DataPair
            label="Member since"
            data={dateFormatter(user.createdAt || 1970)}
          />
          <hr />
          <DataPair label="Username" data={user.username} />
          <DataPair label="Email" data={user.email} />
          <hr />
          <DataPair
            label="First Name"
            data={firstEachWordCapitalize(user.user_info?.first_name || "-")}
          />

          <DataPair
            label="Last Name"
            data={firstEachWordCapitalize(user.user_info?.last_name || "-")}
          />
          <DataPair label="Bio" data={user.user_info?.bio} />

          <DataPair label="Phone" data={user.user_info?.phone_number} />
          <DataPair label="Gender" data={user.user_info?.gender} />
        </div>
      </div>
    </>
  );
}
