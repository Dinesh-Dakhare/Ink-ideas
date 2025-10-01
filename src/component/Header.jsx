import React, { useEffect, useState } from "react";
import ProfileDropdown from "./ProfileDropdown.jsx";
import { FiSearch } from "react-icons/fi";
import { NavLink } from "react-router-dom";
const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
const token = localStorage.getItem("token");
  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              BlogSpace
            </h1>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-8">
            {["Home", "Articles", "Categories", "About", "Contact"].map(
              (item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
                >
                  {item}
                </a>
              )
            )}
          </nav>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-4">
            <div className="relative hidden sm:block">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            {
              token?(
                <ProfileDropdown />
              ):(
               <NavLink
              to="/login"
              className="text-gray-600 hover:text-gray-900 font-medium"
            >
              Sign In
            </NavLink>
              )
            }
            
            <NavLink
              to="/blog-editor"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Get Started
            </NavLink>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
