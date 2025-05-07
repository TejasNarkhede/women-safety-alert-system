import { useState } from "react";
import { Mail, Lock } from "lucide-react";
import { Link } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../config";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(`${API_URL}/users/login`, {
        email,
        password,
      });
      // alert("Login successful!");
      localStorage.setItem("user", JSON.stringify(response.data));
      window.location.href = "/contacts";
    } catch (err) {
      console.error(err);
      setError("Invalid email or password");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-medium text-gray-900">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-base text-gray-600">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="font-medium text-fuchsia-600 hover:text-fuchsia-500"
          >
            Register
          </Link>
        </p>
      </div>

      <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
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

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="mt-1 relative">
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="form-input pl-10 w-full border rounded px-3 py-2"
                  placeholder="Enter your password"
                />
                <Lock className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              </div>
              <div className="text-sm text-right mt-2">
                <Link to="/forgot-password" className="font-medium text-gray-600 hover:text-gray-500">
                  Forgot your password?
                </Link>
              </div>
            </div>

            {error && (
              <p className="text-sm text-red-600 text-center -mt-2">{error}</p>
            )}

            <div>
              <button
                type="submit"
                disabled={loading}
                className={`w-full flex justify-center py-2 px-4 rounded-md shadow-sm text-sm font-medium text-white 
                  ${
                    loading
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-fuchsia-600 hover:bg-fuchsia-700"
                  }`}
              >
                {loading ? "Logging in..." : "Sign in"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
