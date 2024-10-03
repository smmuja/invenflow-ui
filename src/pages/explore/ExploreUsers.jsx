import { useLoaderData } from "react-router-dom";
import { ExploreUsersCards } from "@/components/features/ExploreUsersCard";
import { fetcher } from "@/utils/fetcher";

export async function loader() {
  const users = await fetcher(`/users`);
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
