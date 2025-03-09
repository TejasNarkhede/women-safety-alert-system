import { React, useState } from "react";

const SendAlert = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResponse(null);

    if (!/^[0-9]{10,15}$/.test(phoneNumber)) {
      setError("Invalid phone number. It should be 10-15 digits.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(
        `http://localhost:8080/sos/whatsapp?phoneNumber=${encodeURIComponent(
          phoneNumber
        )}&message=${encodeURIComponent(message)}`,
        {
          method: "POST",
        }
      );

      const data = await res.text(); // backend returns plain text, not JSON

      if (!res.ok) {
        throw new Error(data || "Failed to send alert");
      }
      setResponse(data);
    } catch (error) {
      setError(error.message);
    }
    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-bold mb-4">Send Emergency Alert</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          className="w-full p-2 border rounded"
          placeholder="Enter Phone Number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          required
        />
        <textarea
          className="w-full p-2 border rounded"
          placeholder="Enter Message"
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
      {error && <p className="mt-4 text-red-600">{error}</p>}
      {response && <p className="mt-4 text-green-600">{response}</p>}
    </div>
  );
};

export default SendAlert;
