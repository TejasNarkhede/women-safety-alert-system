import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ user, setUser }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  return (
    <nav className="bg-purple-600 p-4 text-white shadow-md">
      <div className="container mx-auto flex justify-between">
        <Link to="/" className="text-xl font-bold">
          Women Safety Alert System
        </Link>
        <div className="space-x-4">
          {user ? (
            <>
              <Link to="/contacts" className="hover:underline">
                Contacts
              </Link>
              <Link to="/send-alert" className="hover:underline">
                Send Alert
              </Link>
              <Link to="/history" className="hover:underline">
                History
              </Link>
              <Link to="/profile" className="hover:underline">
                Profile
              </Link>
              <button onClick={handleLogout} className="hover:underline">
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="hover:underline">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
