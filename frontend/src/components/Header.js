// src/components/Header.js
import React from 'react';
import { useAuth } from '../hooks/authContext.js';
import { useNavigate } from 'react-router-dom'; // Use useNavigate instead of useHistory
import '../styles/header.css'; // Import any header-specific styles

function Header() {
    const { isLoggedIn, userProfile, logout } = useAuth();
    const navigate = useNavigate();


    const handleLogout = async () => {
        if (window.confirm('Are you sure you want to log out?')) {
            await logout();
            navigate('/login');
        }
    };

    return (
        <header>
            <div className="container">
                <div className="logo">
                    <a href="/">
                        <h1>ViLabs</h1>
                    </a>
                </div>
                <nav>
                    <input type="checkbox" id="check" />
                    <label htmlFor="check" className="menu-btn">
                        <i className="fa fa-bars"></i>
                    </label>
                    <ul>
                        <li><a href="/">Home Page</a></li>
                        <li><a href="/aboutus">About Us</a></li>
                        <li><a href="/courses">Courses Offered</a></li>
                        {isLoggedIn ? (
                            <>
                                <li>
                                    <a href="/profile">
                                        <img 
                                            className="header-profile" 
                                            src={userProfile?.profilePicture || '/static/img/default-profile.png'} 
                                            alt="Profile" 
                                        />
                                    </a>
                                </li>
                                <li>
                                    <button
                                        onClick={handleLogout}
                                        type="button"
                                        className="getstarted-btn"
                                    >
                                        Logout
                                    </button>
                                </li>
                            </>
                        ) : (
                            <li>
                                <button 
                                    onClick={() => navigate('/login')} 
                                    type="button" 
                                    className="getstarted-btn"
                                >
                                    Get Started
                                </button>
                            </li>
                        )}
                    </ul>
                </nav>
            </div>
        </header>
    );
}

export default Header;