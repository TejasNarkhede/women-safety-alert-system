import { useState, useEffect } from "react";
import axios from "axios";

const SendAlert = () => {
  const [contacts, setContacts] = useState([]);
  const [message, setMessage] = useState("Emergency! Please help!");
  const [loading, setLoading] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (user) {
      fetchContacts();
    }
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/contacts/${user.id}`);
      setContacts(response.data);
    } catch (error) {
      console.error("Error fetching contacts", error);
    }
  };

  const sendAlert = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post("http://localhost:8080/alerts/email", {
        userId: user.id,
        message,
      });
      alert("Emergency alert sent successfully!");
    } catch (error) {
      console.error("Error sending alert", error);
    }
    setLoading(false);
  };


  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-bold mb-4">Send Emergency Alert</h2>
      <form onSubmit={sendAlert} className="space-y-4">
        <textarea
          className="w-full p-2 border rounded"
          placeholder="Enter Emergency Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />
        <button
          type="submit"
          className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700"
          disabled={loading}
        >
          {loading ? "Sending..." : "Send Alert"}
        </button>
      </form>
      <h3 className="text-lg font-bold mt-6">Emergency Contacts:</h3>
      <ul className="mt-4 space-y-2">
        {contacts.map((contact) => (
          <li key={contact.id} className="bg-gray-100 p-2 rounded">
            {contact.contactName} - {contact.contactEmail}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SendAlert;
