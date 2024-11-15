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

    async function getCSRFToken() {
      // First, try to get from cookie
      const csrfCookie = document.cookie.split('; ').find(row => row.startsWith('csrftoken='));
      if (csrfCookie) {
        return csrfCookie.split('=')[1];
      }
      
      // If no cookie, fetch it from the server
      try {
        await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/get-csrf-token/`, {
          method: 'GET',
          credentials: 'include',
          mode: 'cors',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Origin': `${process.env.REACT_APP_ORIGIN}`
          },
        });
        const newCsrfCookie = document.cookie.split('; ').find(row => row.startsWith('csrftoken='));
        return newCsrfCookie ? newCsrfCookie.split('=')[1] : null;
      } catch (error) {
        console.error('Error fetching CSRF token:', error);
        return null;
      }
    }

    try {
      const csrfToken = await getCSRFToken();
      const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Origin': `${process.env.REACT_APP_ORIGIN}`,
        ...(csrfToken && { 'X-CSRFToken': csrfToken }),
      };
      // Replace with your Django backend API URL for login
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/register/`, {
        method: 'POST',
        credentials : 'include',
        mode: 'cors',
        headers: headers,
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        // If login is successful, navigate or redirect as needed
        navigate('/login'); // Redirect to "next" or the homepage
      } else {
        // Display error message if login fails
        setError(result.error || 'Login failed. Please try again.');
      }
    } catch (error) {
      setError('An error occurred. Please try again later.');
    }


    // Handle form submission logic here
    // console.log(formData); // Example: log the form data to the console
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
