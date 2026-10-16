import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { IoMenu } from "react-icons/io5";

import ResponsiveMenu from "./ResponsiveMenu";

export default function Navbar() {
  const [showMenu, setShowMenu] = useState(false);

  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(
    Boolean(localStorage.getItem("token"))
  );

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Explore", path: "/explore" },
    { name: "Gallery", path: "/gallery" },
    { name: "Tours", path: "/tours" },
    { name: "My Bookings", path: "/my-bookings" },
    { name: "Contact", path: "/contact" },
  ];

  const handleLogout = () => {
    // Remove saved login information
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    // Update Navbar
    setIsLoggedIn(false);

    // Go to home page
    navigate("/");
  };

  return (
    <>
      <header className="w-full bg-gray-900">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">

          {/* Logo */}
          <NavLink to="/">
            <h1 className="text-2xl font-bold text-white">
              Trip <span className="text-red-500">Buddy</span>
            </h1>
          </NavLink>

          {/* Desktop Navbar */}
          <nav className="hidden md:block">
            <ul className="flex items-center gap-6 text-lg font-semibold">

              {navLinks.map((link) => (
                <li key={link.path}>
                  <NavLink
                    to={link.path}
                    className={({ isActive }) =>
                      `transition ${isActive
                        ? "text-red-500"
                        : "text-white hover:text-red-400"
                      }`
                    }
                  >
                    {link.name}
                  </NavLink>
                </li>
              ))}

              {/* Authentication */}
              {!isLoggedIn ? (
                <>
                  <li>
                    <NavLink
                      to="/login"
                      className={({ isActive }) =>
                        `transition ${isActive
                          ? "text-red-500"
                          : "text-white hover:text-red-400"
                        }`
                      }
                    >
                      Login
                    </NavLink>
                  </li>

                  <li>
                    <NavLink
                      to="/register"
                      className={({ isActive }) =>
                        `transition ${isActive
                          ? "text-red-500"
                          : "text-white hover:text-red-400"
                        }`
                      }
                    >
                      Register
                    </NavLink>
                  </li>
                </>
              ) : (
                <li>
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="text-white transition hover:text-red-400"
                  >
                    Logout
                  </button>
                </li>
              )}

            </ul>
          </nav>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setShowMenu(true)}
            className="text-white md:hidden"
            aria-label="Open menu"
          >
            <IoMenu size={30} />
          </button>

        </div>
      </header>

      <ResponsiveMenu
        showMenu={showMenu}
        setShowMenu={setShowMenu}
      />
    </>
  );
}