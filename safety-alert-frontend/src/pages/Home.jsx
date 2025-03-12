import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="text-center mt-50">
      <h1 className="text-3xl text-white font-bold">Welcome to Safety Alert</h1>
      <p className="text-white mt-2">A simple and effective way to send emergency alerts.</p>
      <div className="mt-6 space-x-4">
        <Link to="/send-alert" className="bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-700">Send Alert</Link>
        <Link to="/contacts" className="bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-700">Manage Contacts</Link>
      </div>
    </div>
  );
};

export default Home;
