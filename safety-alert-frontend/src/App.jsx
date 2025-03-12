import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Contacts from "./pages/Contacts";
import SendAlert from "./pages/SendAlert";
import AlertHistory from "./pages/AlertHistory";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-slate-700">
        <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/send-alert" element={<SendAlert />} />
        <Route path="/history" element={<AlertHistory />} />
      </Routes>
      </div>
      <Footer/>
    </Router>
  );
};

export default App;
