import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useState, useEffect } from "react";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Contacts from "./pages/Contacts";
import SendAlert from "./pages/SendAlert";
import AlertHistory from "./pages/AlertHistory";
import Profile from "./pages/Profile"
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
      <div className="min-h-screen bg-slate-700">
        <Navbar user={user} setUser={setUser} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
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
            path="/history"
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
        </Routes>
      </div>
      <Footer />
    </Router>
  );
};

export default App;

function ProtectedRoute({ user, children }) {
  return user ? children : <Navigate to="/login" replace />;
}
