import {useState, useEffect} from 'react'
import axios from 'axios';

const Contacts = () => {

    const [contacts, setContacts] = useState([]);
    const [contactName, setContactName] = useState("");
    const [contactEmail, setContactEmail] = useState("");
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
  
    const addContact = async (e) => {
      e.preventDefault();
      setLoading(true);
      try {
        await axios.post("http://localhost:8080/contacts/add", {
          userId: user.id,
          contactName,
          contactEmail,
        });
        setContactName("");
        setContactEmail("");
        fetchContacts(); // Refresh contacts
      } catch (error) {
        console.error("Error adding contact", error);
      }
      setLoading(false);
    };
  
    const deleteContact = async (id) => {
      try {
        await axios.delete(`http://localhost:8080/contacts/delete/${id}`);
        fetchContacts(); // Refresh contacts
      } catch (error) {
        console.error("Error deleting contact", error);
      }
    };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-bold mb-4">Emergency Contacts</h2>
      <form onSubmit={addContact} className="space-y-4">
        <input
          type="text"
          className="w-full p-2 border rounded"
          placeholder="Contact Name"
          value={contactName}
          onChange={(e) => setContactName(e.target.value)}
          required
        />
        <input
          type="email"
          className="w-full p-2 border rounded"
          placeholder="Contact Email"
          value={contactEmail}
          onChange={(e) => setContactEmail(e.target.value)}
          required
        />
        <button
          type="submit"
          className="w-full bg-purple-600 text-white py-2 rounded hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? "Adding..." : "Add Contact"}
        </button>
      </form>
      <ul className="mt-6 space-y-2">
        {contacts.map((contact) => (
          <li key={contact.id} className="flex justify-between bg-gray-100 p-2 rounded">
            <span>{contact.contactName} - {contact.contactEmail}</span>
            <button
              onClick={() => deleteContact(contact.id)}
              className="text-purple-500 hover:underline"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Contacts;