import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userProfile, setUserProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    // Check auth status on mount
    useEffect(() => {
        checkAuthStatus();
    }, []);

    const checkAuthStatus = async () => {
        setLoading(true);
        const token = localStorage.getItem('jwtToken');
        if (!token) {
            setIsLoggedIn(false);
            setUserProfile(null);
            setLoading(false);
            return;
        }

        try {
            const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/check-auth/`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json();

            if (response.ok && data.isAuthenticated) {
                setIsLoggedIn(true);
                setUserProfile(data.userProfile);
            } else {
                setIsLoggedIn(false);
                setUserProfile(null);
                localStorage.removeItem('jwtToken');
            }
        } catch (error) {
            console.error('Error checking auth status:', error);
            setIsLoggedIn(false);
            setUserProfile(null);
            localStorage.removeItem('jwtToken');
        } finally {
            setLoading(false);
        }
    };

    const login = async (username, password, next = '/') => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/login/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });

            const result = await response.json();

            if (response.ok) {
                const token = result.tokens.access; // JWT token from backend
                localStorage.setItem('jwtToken', token);
                setIsLoggedIn(true);
                setUserProfile(result.user_profile);
                return { success: true, next: next || '/' };
            } else {
                return { success: false, error: result.error || 'Login failed. Please try again.' };
            }
        } catch (error) {
            console.error('Login error:', error);
            return { success: false, error: 'An error occurred. Please try again later.' };
        }
    };

    const logout = async () => {
        localStorage.removeItem('jwtToken');
        setIsLoggedIn(false);
        setUserProfile(null);
    };

    return (
        <AuthContext.Provider value={{ 
            isLoggedIn, 
            userProfile, 
            login, 
            logout,
            checkAuthStatus,
            loading 
        }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
