import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { UserRound } from "lucide-react";
import { useUser } from "../context/userContext.jsx";

import newPic from "../../backend/uploads/avatars/1759645876847.jpg";

export default function ProfileDropdown({ post }) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { user, logout } = useUser();

  // Close dropdown when clicking outside
  useEffect(() => {
    console.log("new avatar👌", user?.avatar);

    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative cursor-pointer" ref={dropdownRef}>
      {/* Profile Image */}

      <button
        onClick={() => setOpen(!open)}
        className="w-10 h-10 cursor-pointer rounded-full overflow-hidden border-2 border-gray-300 focus:outline-none flex items-center justify-center"
      >
        {user?.avatar ? (
          <img
            src={`/backend${user?.avatar}`} // Replace with user.avatar
            alt="User avatar"
            className="w-full h-full object-cover"
          />
        ) : (
          <UserRound className="w-1/2 h-full object-cover" />
        )}
      </button>

      {/* Dropdown Menu */}
      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg z-50">
          <ul className="py-2 text-gray-700">
            <li className="block px-4 py-2">
              <p className="text-xl font-medium leading-tight tracking-wider uppercase cursor-not-allowed">
                {user?.username}
              </p>
              <h3 className="text-sm text-gray-500">{user?.email}</h3>
            </li>
            <li>
              <Link
                to="/dashboard"
                className="block px-4 py-2 hover:bg-gray-100"
              >
                Dashboard
              </Link>
            </li>

            <li>
              <button
                onClick={logout}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                Sign Out
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
