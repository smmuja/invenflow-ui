import { Form, useActionData, useNavigate } from "react-router-dom";

export const Input = ({ label, ...rest }) => {
  return (
    <>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
        <input {...rest} className="w-full px-3 py-2 border rounded" />
      </div>
    </>
  );
};

export const Select = ({ label, options, ...rest }) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <select {...rest} className="w-full px-3 py-2 border rounded">
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

const currentUser = JSON.parse(localStorage.getItem("user"));
const username = currentUser?.username;

export function ProfileDetailForm({ user }) {
  const actionData = useActionData();

  const navigate = useNavigate();
  const handleCancel = () => {
    navigate(-1);
  };

  const options = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
    { value: "rather not say", label: "Rather Not Say" },
  ];
  return (
    <>
      <>
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
          <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md">
            <h2 className="text-2xl font-black text-center">
              {" "}
              {user?._id ? "Edit Profile" : "Complete Profile"}{" "}
            </h2>
            {actionData?.error && (
              <p className="text-red-500">{actionData.error}</p>
            )}

            <Form
              method={user?._id ? "PUT" : "POST"}
              action={
                user?._id
                  ? `/dashboard/profile/${username}/edit`
                  : `/dashboard/profile/${username}/new`
                // `/dashboard/profile/${username}/edit`
              }
            >
              <div className="space-y-4">
                <Input
                  label="First Name"
                  type="text"
                  name="first_name"
                  id="first_name"
                  required
                  placeholder="First name"
                  defaultValue={user?.first_name}
                />
                <Input
                  label="Last Name"
                  type="text"
                  name="last_name"
                  id="last_name"
                  required
                  placeholder="Last Name"
                  defaultValue={user?.last_name}
                />
                <Input
                  label="Phone Number"
                  type="text"
                  name="phone_number"
                  id="phone_number"
                  required
                  placeholder="629090909"
                  defaultValue={user?.phone_number}
                />
                <Input
                  label="Bio"
                  type="text"
                  name="bio"
                  id="bio"
                  required
                  placeholder="Write short description about yourself"
                  defaultValue={user?.bio}
                />
                <Select
                  label="Gender"
                  name="gender"
                  id="gender"
                  options={options}
                  defaultValue={user?.gender || ""}
                  placeholder="Select gender"
                />
                <div className="flex justify-end space-x-2">
                  <button
                    onClick={handleCancel}
                    className=" bg-gray-300 px-4 py-2 rounded-md "
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className=" bg-blue-500 px-4 py-2 rounded-md text-white"
                  >
                    Save
                  </button>
                </div>
              </div>
            </Form>
          </div>
        </div>
      </>
    </>
  );
}
