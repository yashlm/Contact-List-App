import React, { useState, useEffect } from "react";
import { db } from "./firebase";
import './App.css';

const ContactForm = ({ initialContact }) => {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (initialContact) {
      setName(initialContact.name || "");
      setMobile(initialContact.mobile || "");
      setEmail(initialContact.email || "");
    }
  }, [initialContact]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!name || !mobile || !email) {
      alert("Please fill in all required fields.");
      return;
    }

    setIsLoading(true);

    try {
      let contact = {
        name,
        mobile,
        email,
      };

      if (initialContact) {
        await db.collection("contact-list").doc(initialContact.id).update(contact);
        alert("Contact updated successfully.");
      } else {
        await db.collection("contacts").add(contact);
        alert("Contact added successfully.");
      }

      setName("");
      setMobile("");
      setEmail("");
    } catch (error) {
      console.error("Error adding/updating contact: ", error);
      alert("An error occurred. Please try again later.");
    }

    setIsLoading(false);
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <label>
        Name: <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </label>
      <label>
        Mobile:{" "}
        <input
          type="text"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
        />
      </label>
      <label>
        Email: <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
      </label>
      <button type="submit" disabled={isLoading}>
        {isLoading ? "Saving Contact..." : "Save Contact"}
      </button>
    </form>
  );
};

export default ContactForm;
