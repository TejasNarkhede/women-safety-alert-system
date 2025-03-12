import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-purple-600 p-4 text-white shadow-md">
      <div className="container mx-auto flex justify-between">
        <Link to="/" className="text-xl font-bold">Women Safety Alert System</Link>
        <div className="space-x-4">
          <Link to="/contacts" className="hover:underline">Contacts</Link>
          <Link to="/send-alert" className="hover:underline">Send Alert</Link>
          <Link to="/history" className="hover:underline">History</Link>
          <Link to="/login" className="hover:underline">Login</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
