import { Navigate, useActionData, useLoaderData } from "react-router-dom";
import { ProfileDetailForm } from "../../components/ProfileDetailForm";
import { useFetch } from "../../hooks/useFetch";
import { dashboardProfileUrl } from "../../config/paths";

const currentUser = JSON.parse(localStorage.getItem("user"));
const username = currentUser?.username;

export async function loader() {
  const user = await useFetch(`/user-accounts/${username}`);
  if (!user) {
    return { userError: "User not found" };
  }
  return { user: user.data };
}

export async function action({ request }) {
  const formData = await request.formData();
  const updateUser = {
    first_name: formData.get("first_name"),
    last_name: formData.get("last_name"),
    phone_number: formData.get("phone_number"),
    bio: formData.get("bio"),
    gender: formData.get("gender"),
  };

  const response = await useFetch(`/user-accounts/${username}`, {
    method: "PUT",
    body: JSON.stringify(updateUser),
  });
  //   user._id ? `/user-accounts/${username}` : `/user-accounts`,
  //   {
  //     method: user._id ? "PUT" : "POST",
  //     body: JSON.stringify(updateUser),
  //   }
  // );

  if (response) {
    return { success: true };
  } else {
    return { error: "Failed to update profile" };
  }
}

export function DashboardProfileEdit() {
  const { user } = useLoaderData();
  const actionData = useActionData();

  if (actionData?.error) {
    return <div className="text-red-500">{actionData.error}</div>;
  }

  if (actionData?.success) {
    return <Navigate to={`${dashboardProfileUrl}/${username}`} />;
  }
  return (
    <>
      <ProfileDetailForm user={user} />
    </>
  );
}
