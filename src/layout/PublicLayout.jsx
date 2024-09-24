import { Outlet } from "react-router-dom";
import { Navbar } from "./components/Navbar";

export function PublicLayout() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="flex-1 flex flex-col">
        <Navbar />
        <Outlet />
      </div>
    </div>
  );
}
