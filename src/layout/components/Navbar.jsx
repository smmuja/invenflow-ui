import { Link } from "react-router-dom";
import { InvenflowLogo } from "../../assets/invenflowLogo";
import { useAuth } from "../../context/AuthContext";
import { NavItem } from "./NavItem";
import { LoginLogoutButton } from "./LoginLogoutButton";
import { useState } from "react";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <nav className="mb-4 flex justify-between py-3 bg-blue-400 w-full sticky top-0">
        <Link to="/" className="hidden md:flex">
          <InvenflowLogo />
        </Link>

        <ol className="md:hidden flex space-x-2">
          <li>
            <button onClick={toggleMenu} className="text-3xl flex">
              <InvenflowLogo /> ⌄
            </button>
          </li>
        </ol>

        <div className="hidden md:flex justify-center space-x-4">
          <NavItem />
        </div>
        {isMenuOpen && (
          <>
            <div
              onClick={closeMenu}
              className="p-4 space-y-5 fixed left-0 inset-y-0 min-h-screen w-64 bg-blue-400 flex flex-col z-30"
            >
              <Link to="/">
                <InvenflowLogo />
              </Link>
              <NavItem />
            </div>
          </>
        )}
        {isMenuOpen && (
          <div
            className="fixed inset-0 z-20 bg-black opacity-50 md:hidden"
            onClick={closeMenu}
          ></div>
        )}

        <div className="flex justify-center items-center space-x-4 px-4">
          <LoginLogoutButton />
        </div>
      </nav>
    </>
  );
}
