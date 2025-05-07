import { useState, useEffect } from "react";
import axios from "axios";
import { Phone, Mail, Trash2, UserPlus } from "lucide-react";
import { API_URL } from "../config";

const Contacts = () => {
  const [contacts, setContacts] = useState([]);
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (user) fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/contacts/${user.id}`
      );
      setContacts(response.data);
    } catch (error) {
      console.error("Error fetching contacts", error);
    }
  };

  const addContact = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(`${API_URL}/contacts/add`, {
        userId: user.id,
        contactName,
        contactEmail,
      });
      setContactName("");
      setContactEmail("");
      fetchContacts();
    } catch (error) {
      console.error("Error adding contact", error);
    }
    setLoading(false);
  };

  const deleteContact = async (id) => {
    try {
      await axios.delete(`${API_URL}/contacts/delete/${id}`);
      fetchContacts();
    } catch (error) {
      console.error("Error deleting contact", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">
            Emergency Contacts
          </h1>
        </div>

        {/* Add Contact Form */}
        <form onSubmit={addContact} className="mb-10 grid md:grid-cols-3 gap-4">
          <input
            type="text"
            className="p-2 border rounded w-full"
            placeholder="Contact Name"
            value={contactName}
            onChange={(e) => setContactName(e.target.value)}
            required
          />
          <input
            type="email"
            className="p-2 border rounded w-full"
            placeholder="Contact Email"
            value={contactEmail}
            onChange={(e) => setContactEmail(e.target.value)}
            required
          />
          <button
            type="submit"
            disabled={loading}
            className={`flex items-center justify-center gap-2 bg-fuchsia-600 text-white px-4 py-2 rounded hover:bg-fuchsia-700 transition-colors w-full ${
              loading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            <UserPlus className="h-5 w-5" />
            {loading ? "Adding..." : "Add Contact"}
          </button>
        </form>

        {/* Contact List */}
        <div className="grid gap-6">
          {contacts.length === 0 ? (
            <p className="text-gray-600 text-center">No contacts added yet.</p>
          ) : (
            contacts.map((contact) => (
              <div
                key={contact.id}
                className="bg-white rounded-lg shadow-md p-6"
              >
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">
                      {contact.contactName}
                    </h3>
                    <div className="mt-1 text-gray-600 flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      <span>{contact.contactEmail}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => deleteContact(contact.id)}
                    className="text-red-600 hover:text-red-700"
                    title="Delete Contact"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Contacts;
