import React, { useState, useEffect } from "react";
import { db } from "./firebase";
import ContactForm from "./ContactForm";
import './App.css';

const ContactList = () => {
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);

  useEffect(() => {
    const unsubscribe = db.collection("contact-list").onSnapshot((snapshot) => {
      const contactsData = [];
      snapshot.forEach((doc) => {
        const contact = {
          id: doc.id,
          ...doc.data(),
        };
        contactsData.push(contact);
      });
      setContacts(contactsData);
    });

    return () => unsubscribe();
  }, []);

  const handleDeleteContact = async (id) => {
    if (window.confirm("Are you sure you want to delete this contact?")) {
      try {
        await db.collection("contact-list").doc(id).delete();
        alert("Contact deleted successfully.");
      } catch (error) {
        console.error("Error deleting contact: ", error);
        alert("An error occurred. Please try again later.");
      }
    }
  };

  const handleUpdateContact = async (id, updatedFields) => {
    try {
      await db.collection("contact-list").doc(id).update(updatedFields);
      alert("Contact updated successfully.");
      setSelectedContact(null); 
    } catch (error) {
      console.error("Error updating contact: ", error);
      alert("An error occurred. Please try again later.");
    }
  };

  const handleEditContact = (contact) => {
    setSelectedContact(contact);
  };

  const handleCancelEdit = () => {
    setSelectedContact(null);
  };

  return (
    <div className="list">
      <h2>Contact List</h2>
      <ul className="contacts">
        {contacts.map((contact) => (
          <li key={contact.id}>
            <strong>Name:</strong> {contact.name} <br />
            <strong>Mobile:</strong> {contact.mobile} <br />
            <strong>Email:</strong> {contact.email} <br />
            <button onClick={() => handleDeleteContact(contact.id)}>Delete</button>
            <button onClick={() => handleEditContact(contact)}>Edit</button>
          </li>
        ))}
      </ul>

      {selectedContact && (
        <div>
          <h2>Edit Contact</h2>
          <ContactForm
            initialContact={selectedContact}
            onUpdateContact={(updatedFields) =>
              handleUpdateContact(selectedContact.id, updatedFields)
            }
          />
          <button onClick={handleCancelEdit}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default ContactList;
