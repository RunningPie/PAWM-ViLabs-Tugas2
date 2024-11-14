import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Use useNavigate instead of useHistory
import { useAuth } from '../hooks/authContext.js';
import '../styles/login-style.css';  // Import the custom CSS

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [next, setNext] = useState('/');
  
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { success, error: loginError } = await login(username, password, next);
    
    if (success) {
      navigate(next);
    } else {
      setError(loginError);
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h1>Login</h1>
        {error && (
          <div className="error-message">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          {/* Username input */}
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          
          {/* Password input */}
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          
          {/* Submit button */}
          <button className="login-button" type="submit">
            Login
          </button>

          {/* Sign-up link */}
          <p>
            Don't have an account? <a href="/register">Sign Up</a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
