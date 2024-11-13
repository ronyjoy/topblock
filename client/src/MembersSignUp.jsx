import React, { useState, useEffect, useRef } from 'react';
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
  
  // Create a reference for the name input field
  const nameInputRef = useRef(null);

  // Focus on the name input field when the component mounts
  useEffect(() => {
    nameInputRef.current.focus();
  }, []);

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
      const response = await fetch(`/api/greet`, {
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

    // Reset form and refocus on the name input
    setFormData({ name: '', email: '' });
    setMemberData(null);
    setUseEnteredValue(false);
    nameInputRef.current.focus(); // Refocus on the name input after form submission
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
          ref={nameInputRef} // Attach the reference to the name input
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

      {/* Cards container with rows */}
      <div className="cards-container">
        {signUps.map((signUp, index) => (
          <div key={index} className="card">
            <button className="delete-btn" onClick={() => handleDelete(index)}>X</button>
            <>{signUp.name}-{signUp.email}</>
          </div>
        ))}
      </div>
    </>
  );
};

export default MembersSignUp;
