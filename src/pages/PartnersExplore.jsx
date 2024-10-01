import { useLoaderData } from "react-router-dom";
import { ExplorePartnersCards } from "../components/ExplorePartnersCard";
import { useFetch } from "../hooks/useFetch";

export async function loader() {
  const users = await useFetch(`/users`);
  console.log(users);
  return { users: users.data };
}

export function PartnersExplorePage() {
  const { users } = useLoaderData();

  return (
    <>
      <ExplorePartnersCards users={users} />
    </>
  );
}
