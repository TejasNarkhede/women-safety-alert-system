import { useState } from "react";
import { Mail } from "lucide-react";
import axios from "axios";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // "success" or "error"

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await axios.post("http://localhost:8080/users/forgot-password", {
        email,
      });
      setMessageType("success");
      setMessage("Password reset instructions sent to your email!");
      setEmail("");
    } catch (error) {
      setMessageType("error");
      setMessage(error.response?.data || "Something went wrong!");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-medium text-gray-900">
          Forgot Password
        </h2>
        <p className="mt-2 text-center text-base text-gray-600">
          Enter your email address and we'll send you password reset instructions.
        </p>
      </div>

      <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <div className="mt-1 relative">
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="form-input pl-10 w-full border rounded px-3 py-2"
                  placeholder="Enter your email"
                />
                <Mail className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              </div>
            </div>

            {message && (
              <p className={`text-sm text-center ${
                messageType === "success" ? "text-green-600" : "text-red-600"
              }`}>
                {message}
              </p>
            )}

            <div>
              <button
                type="submit"
                disabled={loading}
                className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                  loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-fuchsia-600 hover:bg-fuchsia-700"
                }`}
              >
                {loading ? "Sending..." : "Reset Password"}
              </button>
            </div>

            <div className="text-sm text-center">
              <Link to="/login" className="font-medium text-gray-600 hover:text-gray-500">
                Back to Login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword; 