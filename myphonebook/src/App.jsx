import React, { useState, useEffect } from 'react';
import './App.css';

const countryCodes = [
  { code: '+1', country: 'USA' },
  { code: '+44', country: 'UK' },
  { code: '+91', country: 'India' },
  { code: '+61', country: 'Australia' },
  // Add more country codes as needed
];

const categories = ["Family", "Friends", "Work", "Other"];
const saveLocations = ["Email", "SIM", "Mobile"];

function App() {
  const [contacts, setContacts] = useState([]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [countryCode, setCountryCode] = useState(countryCodes[0].code);
  const [category, setCategory] = useState(categories[0]);
  const [saveLocation, setSaveLocation] = useState(saveLocations[0]);
  const [searchTerm, setSearchTerm] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);
  const [formVisible, setFormVisible] = useState(false);
  const [containerVisible, setContainerVisible] = useState(false);

  useEffect(() => {
    // Trigger container animation after a delay
    setTimeout(() => {
      setContainerVisible(true);
    }, 100);

    // Trigger form animation after a delay
    setTimeout(() => {
      setFormVisible(true);
    }, 300);
  }, []);

  const handleAddContact = (e) => {
    e.preventDefault();
    const phoneNumberDigitsOnly = phoneNumber.replace(/\D/g, ''); // Remove non-digit characters
    if (firstName && lastName && phoneNumberDigitsOnly.length === 10) {
      const fullPhoneNumber = `${countryCode} ${phoneNumber}`;
      if (editingIndex !== null) {
        // Edit existing contact
        const updatedContacts = contacts.map((contact, index) =>
          index === editingIndex ? { firstName, lastName, phoneNumber: fullPhoneNumber, category, saveLocation } : contact
        );
        setContacts(updatedContacts);
        setEditingIndex(null);
      } else {
        // Add new contact
        setContacts([...contacts, { firstName, lastName, phoneNumber: fullPhoneNumber, category, saveLocation }]);
      }
      setFirstName('');
      setLastName('');
      setPhoneNumber('');
      setCountryCode(countryCodes[0].code);
      setCategory(categories[0]);
      setSaveLocation(saveLocations[0]);
      setErrorMessage('');
    } else {
      setErrorMessage('Please fill all fields and ensure the phone number is 10 digits long.');
    }
  };

  const handleEditContact = (index) => {
    const contact = contacts[index];
    const [code, number] = contact.phoneNumber.split(' ');
    setFirstName(contact.firstName);
    setLastName(contact.lastName);
    setPhoneNumber(number);
    setCountryCode(code);
    setCategory(contact.category);
    setSaveLocation(contact.saveLocation);
    setEditingIndex(index);
  };

  const handleDeleteContact = (index) => {
    const updatedContacts = contacts.filter((_, i) => i !== index);
    setContacts(updatedContacts);
  };

  const filteredContacts = contacts.filter(contact =>
    `${contact.firstName} ${contact.lastName} ${contact.phoneNumber} ${contact.category} ${contact.saveLocation}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={`container ${containerVisible ? 'show' : ''}`}>
      <h1 className={formVisible ? 'show' : ''}>Phone Book</h1>
      <div>
        <form onSubmit={handleAddContact} className={formVisible ? 'show' : ''}>
          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <select
              value={countryCode}
              onChange={(e) => setCountryCode(e.target.value)}
              className="country-code"
            >
              {countryCodes.map((code, index) => (
                <option key={index} value={code.code}>{`${code.country} (${code.code})`}</option>
              ))}
            </select>
            <input
              type="text"
              placeholder="Phone Number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              pattern="\d{10}"
              maxLength="10"
              title="Please enter a 10-digit phone number"
              style={{ width: 'calc(50% - 15px)', marginLeft: '8px' }}
            /> 
            vibhu srivastava
          </div>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)} 
            className="category-select"
            style={{ marginTop: '8px' }}
          >  
            {categories.map((cat, index) => (
              <option key={index} value={cat}>{cat}</option>
            ))}
          </select>
          <select
            value={saveLocation}
            onChange={(e) => setSaveLocation(e.target.value)}
            className="save-location-select"
            style={{ marginTop: '8px' }}
          >
            {saveLocations.map((location, index) => (
              <option key={index} value={location}>{location}</option>
            ))}
          </select>
          <button type="submit">{editingIndex !== null ? 'Update' : 'Save'}</button>
        </form>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <input
          type="text"
          placeholder="Search contacts..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-box"
        />
        <ul className="list">
          {filteredContacts.map((contact, index) => (
            <li key={index} className="list-item">
              <div>
                <span className="contact-name">{contact.firstName} {contact.lastName}</span><br />
                <span className="contact-phone">{contact.phoneNumber}</span><br />
                <span className="contact-category">{contact.category}</span><br />
                <span className="contact-save-location">{contact.saveLocation}</span>
              </div>
              <div>
                <button className="edit-button" onClick={() => handleEditContact(index)}>Edit</button>
                <button className="delete-button" onClick={() => handleDeleteContact(index)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;