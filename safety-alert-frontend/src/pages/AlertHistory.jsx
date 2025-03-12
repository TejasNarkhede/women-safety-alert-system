import { useState, useEffect } from "react";
import axios from "axios";

const AlertHistory = () => {
  const [alerts, setAlerts] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (user) {
      fetchAlertHistory();
    }
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
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-bold mb-4">Alert History</h2>
      {alerts.length === 0 ? (
        <p className="text-gray-600">No alerts sent yet.</p>
      ) : (
        <ul className="mt-4 space-y-2">
          {alerts.map((alert) => (
            <li key={alert.id} className="bg-gray-100 p-2 rounded">
              <p>
                <strong>Message:</strong> {alert.message}
              </p>
              <p className="text-sm text-gray-500">
                {new Date(alert.timestamp).toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AlertHistory;
