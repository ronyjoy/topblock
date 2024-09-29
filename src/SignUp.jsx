// src/SignUp.jsx
import React, { useState } from 'react';
import './SignUp.css';

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });

  const [signUps, setSignUps] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Append the current form data to the sign-up list
    setSignUps((prevSignUps) => [...prevSignUps, formData]);

    // Clear the form fields after submission
    setFormData({ name: '', email: '' });
  };

  const handleDelete = (indexToDelete) => {
    // Filter out the sign-up entry that matches the index
    setSignUps(signUps.filter((_, index) => index !== indexToDelete));
  };

  return (
    <>
      <h1>League Sign Up</h1>

      {/* Sign-Up form wrapped inside <form> to handle Enter key */}
      <form onSubmit={handleSubmit}>
      <div class="form-group">
        <input
          className='form-control'
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
        </div>
      </form>

      <h2>Sign Up List</h2>
      <div className="cards-container">
        {/* Render the sign-up list as cards */}
        {signUps.length > 0 &&
          signUps.map((signUp, index) => (
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

export default SignUp;
