import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useState, useEffect } from "react";

import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Contacts from "./pages/Contacts";
import SendAlert from "./pages/SendAlert";
import AlertHistory from "./pages/AlertHistory";
import Profile from "./pages/Profile";
import ForgotPassword from "./pages/ForgotPassword";
// import NotFound from "./pages/NotFound";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const App = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  useEffect(() => {
    const handleStorageChange = () => {
      setUser(JSON.parse(localStorage.getItem("user")));
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar user={user} setUser={setUser} />

        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login setUser={setUser} />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />

            {/* Protected Routes */}
            <Route
              path="/contacts"
              element={
                <ProtectedRoute user={user}>
                  <Contacts />
                </ProtectedRoute>
              }
            />
            <Route
              path="/send-alert"
              element={
                <ProtectedRoute user={user}>
                  <SendAlert />
                </ProtectedRoute>
              }
            />
            <Route
              path="/alert-history"
              element={
                <ProtectedRoute user={user}>
                  <AlertHistory />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute user={user}>
                  <Profile />
                </ProtectedRoute>
              }
            />
            {/* <Route path="*" element={<NotFound />} /> */}
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
};

export default App;

function ProtectedRoute({ user, children }) {
  return user ? children : <Navigate to="/login" replace />;
}
