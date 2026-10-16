
import { NavLink } from "react-router-dom";
import { IoClose } from "react-icons/io5";

export default function ResponsiveMenu({ showMenu, setShowMenu }) {
    const navLinks = [
        { name: "Home", path: "/" },
        { name: "Explore", path: "/explore" },
        { name: "Gallery", path: "/gallery" },
        { name: "Tours", path: "/tours" },
        { name: "My Bookings", path: "/my-bookings" },
        { name: "Contact", path: "/contact" },
    ];

    if (!showMenu) {
        return null;
    }

    return (
        <div className="fixed inset-0 z-50 bg-black/50 md:hidden">
            <div className="ml-auto min-h-screen w-4/5 max-w-sm bg-white p-6 shadow-xl">
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-gray-800">
                        Trip <span className="text-red-500">Buddy</span>
                    </h2>

                    <button
                        type="button"
                        onClick={() => setShowMenu(false)}
                        className="text-gray-700"
                        aria-label="Close menu"
                    >
                        <IoClose size={30} />
                    </button>
                </div>

                <nav className="mt-10">
                    <ul className="space-y-2">
                        {navLinks.map((link) => (
                            <li key={link.path}>
                                <NavLink
                                    to={link.path}
                                    onClick={() => setShowMenu(false)}
                                    className={({ isActive }) =>
                                        `block rounded-lg px-4 py-3 text-lg font-semibold transition ${isActive
                                            ? "bg-red-50 text-red-500"
                                            : "text-gray-700 hover:bg-gray-100"
                                        }`
                                    }
                                >
                                    {link.name}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </div>
    );
}
