import { useState } from "react";
import axios from "axios";

const Profile = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [name, setName] = useState(user?.name || "");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put("http://localhost:8080/users/update", {
        email: user.email,
        name,
        password,
      });
      setMessage("Profile updated successfully!");
      const updatedUser = { ...user, name };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setUser(updatedUser);
      setMessage(res.data);
    } catch (error) {
      setMessage("Error updating profile.");
    }
  };
  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-bold mb-4">Profile</h2>
      {message && <p className="text-center text-purple-600 mt-2">{message}</p>}

      <form onSubmit={handleUpdate} className="space-y-4">
        <div className="mb-4">
          <label className="font-medium">Email</label>
          <input
            type="email"
            placeholder="Email"
            value={user.email}
            disabled
            className="w-full px-4 py-2 border rounded bg-gray-100"
          />
        </div>

        <div className="mb-4">
          <label className="block font-medium">Name</label>
          <input
            type="text"
            value={name}
            placeholder="Enter Name"
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border rounded bg-grey-100"
          />
        </div>

        <div className="mb-4">
          <label className="block font-medium">New Password (optional)</label>
          <input
            type="password"
            value={password}
            placeholder="Enter Password"
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700"
        >
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default Profile;
