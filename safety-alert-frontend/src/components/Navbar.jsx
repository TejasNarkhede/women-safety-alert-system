import { Link, useNavigate } from "react-router-dom";
import { Menu, ShieldAlert, User, X } from "lucide-react";
import { useState } from "react";

const Navbar = ({ user, setUser }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Row */}
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center text-gray-900 font-medium text-xl"
          >
            <ShieldAlert className="h-7 w-7 text-fuchsia-500 mr-2" />
            Women Safety Alert System
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden sm:flex items-center space-x-6">
            {user ? (
              <>
                <Link
                  to="/send-alert"
                  className="text-base font-medium text-gray-700 hover:text-fuchsia-600"
                >
                  Send Alert
                </Link>
                <Link
                  to="/alert-history"
                  className="text-base font-medium text-gray-700 hover:text-fuchsia-600"
                >
                  History
                </Link>
                <Link
                  to="/contacts"
                  className="text-base font-medium text-gray-700 hover:text-fuchsia-600"
                >
                  Contacts
                </Link>
                <Link
                  to="/profile"
                  className="text-base font-medium text-gray-700 hover:text-fuchsia-600 flex items-center gap-1"
                >
                  <User className="h-4 w-4" /> Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-base font-medium text-red-600 hover:text-red-700"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="text-base font-medium text-fuchsia-600 hover:text-fuchsia-700"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="sm:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-gray-800 focus:outline-none"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {isOpen && (
          <div className="sm:hidden mt-2 pb-4 border-t pt-4 space-y-3">
            {user ? (
              <>
                <Link
                  to="/send-alert"
                  className="block text-gray-700 hover:text-fuchsia-600"
                >
                  Send Alert
                </Link>
                <Link
                  to="/alert-history"
                  className="block text-gray-700 hover:text-fuchsia-600"
                >
                  History
                </Link>
                <Link
                  to="/contacts"
                  className="block text-gray-700 hover:text-fuchsia-600"
                >
                  Contacts
                </Link>
                <Link
                  to="/profile"
                  className="block text-gray-700 hover:text-fuchsia-600"
                >
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="block text-left text-red-600 hover:text-red-700 w-full"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="block text-gray-700 hover:text-fuchsia-600"
              >
                Login
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
