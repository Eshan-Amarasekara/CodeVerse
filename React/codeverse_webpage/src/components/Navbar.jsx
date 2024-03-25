import React, { useState } from "react";
import { auth } from "./firebase";
import { close, menu } from "../assets";
import { navLinks } from "../constants";
import { useAuthState } from "react-firebase-hooks/auth";

const Navbar = () => {
  // State variables to manage active link and toggle for mobile view menu
  const [active, setActive] = useState("/");
  const [toggle, setToggle] = useState(false);
  const [user] = useAuthState(auth); // Fetching authenticated user from Firebase

  // Function to handle logout
  const handleLogout = async () => {
    try {
      await auth.signOut(); // Signing out user from Firebase authentication
      // Redirect to the login page after successful logout
      window.location.href = "/";
    } catch (error) {
      console.error("Logout error:", error); // Logging any errors that occur during logout
    }
  };

  return (
    <nav className="w-full flex py-4 justify-between items-center navbar">
      <span className="text-gradient text-4xl font-bold">CODEVERSE</span> {/* Brand name */}

      {/* Desktop view navigation links */}
      <ul className="list-none sm:flex hidden justify-end items-center flex-1">
        {navLinks.map((nav, index) => (
          <li
            key={nav.id}
            className={`font-poppins font-normal cursor-pointer text-[16px] ${
              active === nav.title ? "text-purple-500" : "text-dimWhite"
            } ${index === navLinks.length - 1 ? "mr-0" : "mr-10"}`}
            onClick={() => setActive(nav.title)} // Setting active link onClick
          >
            <a href={`#${nav.id}`}>{nav.title}</a>
          </li>
        ))}
        {/* Displaying Logout/Login link based on user authentication status */}
        {user ? (
          <li
            className="font-poppins font-normal cursor-pointer text-[16px] text-dimWhite"
            onClick={handleLogout}
          >
            <a href="#logout">Logout</a>
          </li>
        ) : (
          <li
            className="font-poppins font-normal cursor-pointer text-[16px] text-dimWhite"
          >
            <a href="/login">Login</a>
          </li>
        )}
      </ul>

      {/* Mobile view menu option and close button */}
      <div className="sm:hidden flex flex-1 justify-end items-center">
        <img
          src={toggle ? close : menu} // Displaying menu/close icon based on toggle state
          alt="menu"
          className="w-[28px] h-[28px] object-contain"
          onClick={() => setToggle(!toggle)} // Toggling menu on click
        />

        {/* Mobile view sidebar */}
        <div
          className={`${
            !toggle ? "hidden" : "flex"
          } p-6 bg-black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] rounded-xl sidebar`}
        >
          <ul className="list-none flex justify-end items-start flex-1 flex-col">
            {navLinks.map((nav, index) => (
              <li
                key={nav.id}
                className={`font-poppins font-medium cursor-pointer text-[16px] ${
                  active === nav.title ? "text-purple-500" : "text-dimWhite"
                } ${index === navLinks.length - 1 ? "mb-0" : "mb-4"}`}
                onClick={() => setActive(nav.title)} // Setting active link onClick
              >
                <a href={`#${nav.id}`}>{nav.title}</a>
              </li>
            ))}
            {/* Displaying Logout/Login link based on user authentication status */}
            {user ? (
              <li
                className="font-poppins font-medium cursor-pointer text-[16px] text-dimWhite"
                onClick={handleLogout}
              >
                <a href="#logout">Logout</a>
              </li>
            ) : (
              <li
                className="font-poppins font-medium cursor-pointer text-[16px] text-dimWhite"
              >
                <a href="/login">Login</a>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;