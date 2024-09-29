// src/MembersSignUp.jsx
import React, { useState, useEffect } from 'react';
import './MembersSignUp.css';
import Header from './Header';  // Import the updated Header component

const MembersSignUp = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });
  
  const [signUps, setSignUps] = useState([]);
  const [memberData, setMemberData] = useState(null);
  const [error, setError] = useState(null);
  const [useEnteredValue, setUseEnteredValue] = useState(false);

  useEffect(() => {
    if (formData.name) {
      const timeoutId = setTimeout(() => {
        fetchMemberData(formData.name);
      }, 500); // Debounce by waiting 500ms after typing stops
      return () => clearTimeout(timeoutId); // Clean up the timeout on component update
    }
  }, [formData.name]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setUseEnteredValue(false); // Reset flag when user types again
  };

  const fetchMemberData = async (name) => {
    try {
      const response = await fetch(`https://api.usatt.org/members?name=${name}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch member data');
      }

      const data = await response.json();

      if (data && data.length > 0) {
        setMemberData(data[0]);
        setError(null);
      } else {
        setUseEnteredValue(true);
        setMemberData(null);
      }
    } catch (err) {
      setError(err.message);
      setUseEnteredValue(true);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const finalName = useEnteredValue ? formData.name : memberData?.name || formData.name;
    const finalEmail = formData.email;

    setSignUps((prevSignUps) => [...prevSignUps, { name: finalName, email: finalEmail }]);

    setFormData({ name: '', email: '' });
    setMemberData(null);
    setUseEnteredValue(false);
  };

  const handleDelete = (indexToDelete) => {
    setSignUps(signUps.filter((_, index) => index !== indexToDelete));
  };

  return (
    <>
      {/* Pass player count as a prop to the Header */}
      <Header playerCount={signUps.length} />

      {/* Sign-Up form */}
      <form className="signup-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter name"
          required
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter email"
          required
        />
        <button type="submit">Add</button>
      </form>

      {error && <p>Error: {error}</p>}

      <h2>Fetched Member Data</h2>
      {memberData && (
        <div>
          <p>Member Name: {memberData.name}</p>
          <p>Member Rating: {memberData.rating}</p>
        </div>
      )}

      <h2>Sign Up List</h2>
      <div className="cards-container">
        {signUps.map((signUp, index) => (
          <div key={index} className="card">
            <button className="delete-btn" onClick={() => handleDelete(index)}>X</button>
            <h3>{signUp.name}</h3>
            <p>{signUp.email}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default MembersSignUp;
