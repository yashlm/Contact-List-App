import React from "react";
import ContactForm from "./ContactForm";
import ContactList from "./ContactList";

const App = () => {
  return (
    <div className="app">
      <h1>Contact List Application</h1>
      <div className="add">
      <h2>Add Contact</h2>
        <ContactForm />
        </div>
      <ContactList />
    </div>
  );
};

export default App;
