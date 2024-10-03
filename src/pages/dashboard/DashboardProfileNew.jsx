import { Navigate, useActionData } from "react-router-dom";
import { ProfileDetailForm } from "@/components/form/ProfileDetailForm";
import { useFetch } from "@/hooks/useFetch";
import { dashboardProfileUrl } from "@/config/paths";

const currentUser = JSON.parse(localStorage.getItem("user"));
const username = currentUser?.username;

export async function action({ request }) {
  const formData = await request.formData();
  const updateUser = {
    first_name: formData.get("first_name"),
    last_name: formData.get("last_name"),
    phone_number: formData.get("phone_number"),
    bio: formData.get("bio"),
    gender: formData.get("gender"),
  };

  const response = await useFetch(`/user-accounts`, {
    method: "POST",
    body: JSON.stringify(updateUser),
  });

  if (response) {
    return { success: true };
  } else {
    return { error: "Failed to update profile" };
  }
}

export function DashboardProfileNew() {
  const actionData = useActionData();

  if (actionData?.error) {
    return <div className="text-red-500">{actionData.error}</div>;
  }

  if (actionData?.success) {
    return <Navigate to={`${dashboardProfileUrl}/${username}`} />;
  }
  return (
    <>
      <ProfileDetailForm />
    </>
  );
}
