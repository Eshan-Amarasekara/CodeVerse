import React from "react";
import { Link } from "react-router-dom"; // Import Link from React Router

const Navbar = () => {
  return (
    <nav className="w-full flex py-4 justify-between items-center navbar">
      {/* Wrap the text in a Link component */}
      <Link to="/" className="text-gradient text-4xl font-bold">CODEVERSE</Link>
    </nav>
  );
};

export default Navbar;
