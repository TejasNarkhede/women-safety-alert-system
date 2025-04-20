import { Link } from "react-router-dom";
import { Shield, History, UserPlus, Send } from "lucide-react";

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <header className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-medium text-gray-800 mb-4 hover:text-fuchsia-600">
            Welcome to Women Safety Alert System
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            A simple effective way to send emergency alerts and manage emergency
            contacts.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <Link to="/send-alert" className="card group text-center">
            <Send className="h-12 w-12 text-fuchsia-600 mb-4 mx-auto group-hover:scale-110 transition-transform group-hover:text-gray-600" />
            <h2 className="text-xl font-semibold mb-2">Send Alert</h2>
            <p className="text-gray-600">
              Quickly send emergency alerts with your location
            </p>
          </Link>

          <Link to="/alert-history" className="card group text-center">
            <History className="h-12 w-12 text-gray-600 mb-4 mx-auto group-hover:scale-110 transition-transform group-hover:text-fuchsia-600" />
            <h2 className="text-xl font-semibold mb-2">Alert History</h2>
            <p className="text-gray-600">
              View your past alerts and their status
            </p>
          </Link>

          <Link to="/contacts" className="card group text-center">
            <UserPlus className="h-12 w-12 text-gray-600 mb-4 mx-auto group-hover:scale-110 transition-transform group-hover:text-fuchsia-600" />
            <h2 className="text-xl font-semibold mb-2">Manage Contacts</h2>
            <p className="text-gray-600">Add and manage emergency contacts</p>
          </Link>

          <Link to="/profile" className="card group text-center">
            <Shield className="h-12 w-12 text-gray-600 mb-4 mx-auto group-hover:scale-110 transition-transform group-hover:text-fuchsia-600" />
            <h2 className="text-xl font-semibold mb-2">Profile</h2>
            <p className="text-gray-600">Update your personal information</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
