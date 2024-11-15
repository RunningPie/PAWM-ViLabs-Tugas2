import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Use useNavigate instead of useHistory
import { useAuth } from '../hooks/authContext.js';
import '../styles/login-style.css';  // Import the custom CSS
import { Alert, AlertDescription } from "@/components/ui/alert";

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [next, setNext] = useState('/');
  const [showCookieWarning, setShowCookieWarning] = useState(true);
  
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

  const handleAcceptCookies = () => {
    setShowCookieWarning(false);
    // Store cookie consent in localStorage to persist the choice
    localStorage.setItem('cookieConsent', 'true');
  };

  return (
    <div className="login-container">
      {showCookieWarning && (
        <Alert className="bg-blue-50 border-blue-200">
          <AlertDescription className="flex items-center justify-between">
            <span>
              This site uses cookies to enhance your experience. By continuing to use this site, 
              you agree to our use of cookies.
            </span>
            <button
              onClick={handleAcceptCookies}
              className="ml-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
            >
              Accept
            </button>
          </AlertDescription>
        </Alert>
      )}
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
