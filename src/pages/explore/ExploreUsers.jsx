import { useLoaderData } from "react-router-dom";
import { ExploreUsersCards } from "@/components/features/ExploreUsersCard";
import { useFetch } from "@/hooks/useFetch";

export async function loader() {
  const users = await useFetch(`/users`);
  console.log(users);
  return { users: users.data };
}

export function ExploreUsersPage() {
  const { users } = useLoaderData();

  return (
    <>
      <ExploreUsersCards users={users} />
    </>
  );
}
