// src/MembersSignUp.jsx
import React, { useState, useEffect } from 'react';
import './MembersSignUp.css';

const MembersSignUp = ({ setPlayerCount }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });
  
  const [signUps, setSignUps] = useState([]);
  const [memberData, setMemberData] = useState(null);
  const [error, setError] = useState("");
  const [useEnteredValue, setUseEnteredValue] = useState(false);

  useEffect(() => {
    if (formData.name) {
      const timeoutId = setTimeout(() => {
        fetchMemberData(formData.name);
      }, 500);
      return () => clearTimeout(timeoutId);
    }
  }, [formData.name]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setUseEnteredValue(false);
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

    setSignUps((prevSignUps) => {
      const updatedSignUps = [...prevSignUps, { name: finalName, email: finalEmail }];
      
      // Update player count in App component
      setPlayerCount(updatedSignUps.length);
      
      return updatedSignUps;
    });

    setFormData({ name: '', email: '' });
    setMemberData(null);
    setUseEnteredValue(false);
  };

  const handleDelete = (indexToDelete) => {
    setSignUps((prevSignUps) => {
      const updatedSignUps = prevSignUps.filter((_, index) => index !== indexToDelete);

      // Update player count when a player is removed
      setPlayerCount(updatedSignUps.length);

      return updatedSignUps;
    });
  };

  return (
    <>
     {error && <p>Error: {error}</p>}

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
