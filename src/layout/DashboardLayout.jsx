import { Outlet, Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { Navbar } from "./components/Navbar";

export function DashboardLayout() {
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
                to="/dashboard/products"
                className={`block py-2 px-4 text-gray-700 ${
                  isActiveNavLink("/dashboard/products") ? "bg-gray-200" : ""
                } hover:bg-gray-200 rounded`}
                onClick={closeSidebar}
              >
                Products
              </Link>
              <Link
                to="/business"
                className={`block py-2 px-4 text-gray-700 ${
                  isActiveNavLink("/business") ? "bg-gray-200" : ""
                } hover:bg-gray-200 rounded`}
                onClick={closeSidebar}
              >
                Business
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
                  <Link to="/products">Products</Link>
                </li>
              </ol>
              {/* <button
                onClick={logout}
                className="md:hidd en block py-2 px-4 text-gray-700 bg-gray-200 rounded"
              >
                Logout
              </button> */}
            </nav>
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
}
