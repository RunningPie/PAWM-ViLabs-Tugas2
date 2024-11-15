import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import '../styles/register-style.css';  // Import custom CSS for the register page

const Register = () => {
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate(); //for redirect navigation

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/register/`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData),
        });

        const result = await response.json();

        if (response.ok) {
            // Store the JWT token in localStorage
            const token = result.token; // Assuming the token is returned in result.token
            localStorage.setItem('jwtToken', token);

            // Redirect or navigate to login or next page as needed
            navigate('/login'); 
        } else {
            // Display error message if registration fails
            setError(result.error || 'Registration failed. Please try again.');
        }
    } catch (error) {
        console.error('Error during registration:', error);
        setError('An error occurred. Please try again later.');
    }
};


  return (
    <div className="register-container">
      <h1 className="register-header">Register</h1>
      {error && (
          <div className="error-message">
            {error}
          </div>
        )}
      <form className="register-form" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
