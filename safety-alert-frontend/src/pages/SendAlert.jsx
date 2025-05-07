import { useState, useEffect } from "react";
import { MapPin, Send } from "lucide-react";
import axios from "axios";
import { API_URL } from "../config";

const SendAlert = () => {
  const [contacts, setContacts] = useState([]);
  const [message, setMessage] = useState("Emergency! Please help!");
  const [loading, setLoading] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (user) fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await axios.get(`${API_URL}/contacts/${user.id}`);
      setContacts(response.data);
    } catch (error) {
      console.error("Error fetching contacts", error);
    }
  };

  const sendAlert = (e) => {
    e.preventDefault();
    setLoading(true);

    const sendAlertWithLocation = async (locationUrl = "Location could not be obtained") => {
      try {
        await axios.post(`${API_URL}/alerts/email`, {
          userId: user.id,
          message: `${message}\nLocation: ${locationUrl}`,
        });

        alert("Emergency alert sent successfully!");
      } catch (error) {
        console.error("Error sending alert", error);
        alert("Failed to send alert. Please try again.");
      }
      setLoading(false);
    };

    if (!navigator.geolocation) {
      sendAlertWithLocation("Location services not available");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const locationUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;
        sendAlertWithLocation(locationUrl);
      },
      () => {
        // Even if location access is denied, still send the alert
        sendAlertWithLocation("Location access was denied");
      }
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-lg mx-auto px-4">
        <div className="bg-white rounded-xl shadow-xl p-6">
          <h1 className="text-2xl font-bold text-center mb-8">Send Emergency Alert</h1>

          <form onSubmit={sendAlert} className="space-y-6">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start">
             <MapPin className="h-5 w-5 text-red-600 mt-0.5" />
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">Turn on Location Services</h3>
                
                <p className="text-sm text-red-700">
                  Your current location will be automatically included
                </p>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Emergency Message
              </label>
              <textarea
                className="form-input min-h-[120px] w-full px-3 py-2 border rounded"
                placeholder="Describe your emergency situation..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full flex justify-center items-center gap-2 text-white font-medium py-2 px-4 rounded 
                ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-red-600 hover:bg-red-700"}`}
            >
              <Send className="h-5 w-5" />
              {loading ? "Sending..." : "Send Emergency Alert"}
            </button>

            <p className="text-sm text-center text-gray-500">
              This will alert all your emergency contacts immediately
            </p>
          </form>

          {/* Contact List */}
          <div className="mt-8">
            <h3 className="text-lg font-bold mb-2">Emergency Contacts:</h3>
            <ul className="space-y-2">
              {contacts.map((contact) => (
                <li
                  key={contact.id}
                  className="flex justify-between items-center bg-gray-100 p-2 rounded text-sm text-gray-700"
                >
                  <span>{contact.contactName}</span>
                  <span className="text-gray-500">{contact.contactEmail}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SendAlert;
