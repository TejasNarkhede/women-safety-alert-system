import { useState } from "react";
import axios from "axios";
import { User, Mail, Shield, Save } from "lucide-react";
import { API_URL } from "../config";

const Profile = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [name, setName] = useState(user?.name || "");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(`${API_URL}/users/update`, {
        email: user.email,
        name,
        password,
      });

      const updatedUser = { ...user, name };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setUser(updatedUser);
      setMessage("Profile updated successfully!");
    } catch (error) {
      setMessage("Error updating profile.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg">
          <form onSubmit={handleUpdate} className="px-4 py-5 sm:p-6 space-y-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Profile Settings
            </h1>

            {message && (
              <p className="text-center text-purple-600 font-medium -mt-4">
                {message}
              </p>
            )}

            {/* Personal Information Section */}
            <div className="border-b border-gray-200 pb-8">
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                Personal Information
              </h2>

              <div className="grid grid-cols-1 gap-6">
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Full Name
                  </label>
                  <div className="mt-1 relative">
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="form-input pl-10 w-full border rounded px-3 py-2"
                      placeholder="Enter your name"
                    />
                    <User className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  </div>
                </div>

                {/* Email (disabled) */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <div className="mt-1 relative">
                    <input
                      type="email"
                      value={user.email}
                      disabled
                      className="form-input pl-10 w-full border rounded bg-gray-100 px-3 py-2"
                    />
                    <Mail className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  </div>
                </div>
              </div>
            </div>

            {/* Security Section */}
            <div className="border-b border-gray-200 pb-8">
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                Security
              </h2>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    New Password (optional)
                  </label>
                  <div className="mt-1 relative">
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="form-input pl-10 w-full border rounded px-3 py-2"
                      placeholder="Enter new password"
                    />
                    <Shield className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  </div>
                </div>
              </div>
            </div>

            {/* Save Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                className="flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-fuchsia-600 hover:bg-fuchsia-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-fuchsia-500"
              >
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
