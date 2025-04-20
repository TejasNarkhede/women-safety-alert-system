import { useState, useEffect } from "react";
import axios from "axios";
import { Calendar, MapPin, MessageSquare } from "lucide-react";

const AlertHistory = () => {
  const [alerts, setAlerts] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (user) fetchAlertHistory();
  }, []);

  const fetchAlertHistory = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/alerts/history/${user.id}`
      );
      setAlerts(response.data);
    } catch (error) {
      console.error("Error fetching alert history", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">Alert History</h1>

        {alerts.length === 0 ? (
          <p className="text-center text-gray-600">No alerts sent yet.</p>
        ) : (
          <div className="space-y-6">
            {alerts.map((alert) => (
              <div
                key={alert.id}
                className="bg-white rounded-lg shadow-md p-6 border-l-4 border-red-500"
              >
                <div className="flex flex-wrap gap-6">
                  {/* Timestamp */}
                  <div className="flex items-center text-gray-600 text-sm">
                    <Calendar className="h-5 w-5 mr-2" />
                    {new Date(alert.timestamp).toLocaleString()}
                  </div>

                  {/* Location Link */}
                  {alert.message.includes("https://www.google.com/maps") && (
                    <div className="flex items-center text-gray-600 text-sm">
                      <MapPin className="h-5 w-5 mr-2" />
                      <a
                        href={
                          alert.message.match(
                            /https:\/\/www\.google\.com\/maps\?q=[^\s]+/g
                          )?.[0]
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-fuchsia-600 hover:underline"
                      >
                        View Location
                      </a>
                    </div>
                  )}

                  {/* Message */}
                  <div className="flex items-center text-gray-700">
                    <MessageSquare className="h-5 w-5 mr-2" />
                    <span>{alert.message.split("\n")[0]}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AlertHistory;
