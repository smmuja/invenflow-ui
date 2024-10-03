import { Outlet, Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { Navbar } from "./components/Navbar";
import { useAuth } from "@/context/AuthContext";
import { dashboardProductUrl, dashboardProfileUrl } from "../config/paths";

export function DashboardLayout() {
  const { currentUser } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const location = useLocation();
  const isActiveNavLink = (path) =>
    location.pathname === path ? "active" : "";

  const breadCrumbSlug = location.pathname.split("/")[2];
  const formattedSlug =
    breadCrumbSlug.charAt(0).toLocaleUpperCase() + breadCrumbSlug.slice(1);

  return (
    <>
      <Navbar />
      <div className="flex min-h-screen bg-gray-100">
        <aside
          className={`fixed inset-y-0 left-0 z-30 w-64 bg-white shadow-md transform ${
            isSidebarOpen ? "translate-x-0 " : "-translate-x-full "
          } transition-transform duration-300 ease-in-out md:relative md:translate-x-0 `}
        >
          <div className="flex items-center justify-between p-4 md:hidden">
            <h1 className="text-xl font-bold">Menu</h1>
            <button onClick={toggleSidebar} className="text-3xl">
              =
            </button>
          </div>
          <nav className="p-4">
            <ul className="space-y-2">
              <Link
                to={dashboardProductUrl}
                className={`block py-2 px-4 text-gray-700 ${
                  isActiveNavLink(dashboardProductUrl) ? "bg-gray-200" : ""
                } hover:bg-gray-200 rounded`}
                onClick={closeSidebar}
              >
                Products
              </Link>
              <Link
                to={`${dashboardProfileUrl}/${currentUser.username}`}
                className={`block py-2 px-4 text-gray-700 ${
                  isActiveNavLink(
                    `${dashboardProfileUrl}/${currentUser.username}`
                  )
                    ? "bg-gray-200"
                    : ""
                } hover:bg-gray-200 rounded`}
                onClick={closeSidebar}
              >
                My Profile
              </Link>
              <Link
                to={`${dashboardProfileUrl}/${currentUser.username}/edit`}
                className={`block py-2 px-4 text-gray-700 ${
                  isActiveNavLink(
                    `${dashboardProfileUrl}/${currentUser.username}/edit`
                  )
                    ? "bg-gray-200"
                    : ""
                } hover:bg-gray-200 rounded`}
                onClick={closeSidebar}
              >
                Edit Profile
              </Link>
            </ul>
          </nav>
        </aside>

        {isSidebarOpen && (
          <div
            className="fixed inset-0 z-20 bg-black opacity-50 md:hidden"
            onClick={closeSidebar}
          ></div>
        )}

        <div className="flex-1 flex flex-col w-full">
          <header className="flex items-center justify-between p-4 bg-white shadow-md md:hidden">
            <button onClick={toggleSidebar} className="text-3xl">
              =
            </button>
            <h1 className="text-xl font-bold">Dashboard</h1>
          </header>
          <main className="flex-1 p-6">
            <nav className="mb-4 flex justify-between">
              <ol className="flex space-x-2 text-gray-500">
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>/</li>
                <li>
                  <Link to={location.pathname}>{formattedSlug}</Link>
                </li>
              </ol>
            </nav>
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
}
