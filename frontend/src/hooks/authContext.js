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
        try {
            const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/check-auth/`, {
                credentials: 'include',
            });
            const data = await response.json();
            
            if (response.ok && data.isAuthenticated) {
                setIsLoggedIn(true);
                setUserProfile(data.userProfile);
            } else {
                setIsLoggedIn(false);
                setUserProfile(null);
            }
        } catch (error) {
            console.error('Error checking auth status:', error);
            setIsLoggedIn(false);
            setUserProfile(null);
        } finally {
            setLoading(false);
        }
    };

    const getCSRFToken = async () => {
        console.log("getting CSRFToken");
        
        // First check if we already have the token
        const existingCsrfCookie = document.cookie.split('; ').find(row => row.startsWith('csrftoken='));
        if (existingCsrfCookie) {
            return existingCsrfCookie.split('=')[1];
        }
    
        // Test cookie support
        try {
            // First attempt to get CSRF token
            const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/get-csrf-token/`, {
                method: 'GET',
                credentials: 'include',
                mode: 'cors',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Origin': `${process.env.REACT_APP_ORIGIN}`
                },
            });
    
            if (!response.ok) {
                throw new Error(`Failed to fetch CSRF token: ${response.status}`);
            }
    
            // Wait briefly for cookie to be set
            await new Promise(resolve => setTimeout(resolve, 100));
    
            // Check if cookie was successfully set
            const newCsrfCookie = document.cookie.split('; ').find(row => row.startsWith('csrftoken='));
            
            if (!newCsrfCookie) {
                console.error('Third-party cookies appear to be blocked by the browser');
                // You could show a user-friendly message here
                alert('Please enable third-party cookies in your browser settings to use this application. This is required for security purposes.');
                return null;
            }
    
            return newCsrfCookie.split('=')[1];
        } catch (error) {
            console.error('Error fetching CSRF token:', error);
            return null;
        }
    };

    const login = async (username, password, next = '/') => {
        const csrfToken = await getCSRFToken();
        const formData = { username, password, next };
        
        // console.log(csrfToken);
        try {
            const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/login/`, {
                method: 'POST',
                credentials: 'include',
                mode: 'cors',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrfToken,
                    'Origin': `${process.env.REACT_APP_ORIGIN}`
                },
                body: JSON.stringify(formData),
            });

            const result = await response.json();
            
            if (response.ok) {
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
        const csrfToken = await getCSRFToken();

        try {
            const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/logout/`, {
                method: 'POST',
                credentials: 'include',
                mode: 'cors',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrfToken,
                    'Origin': `${process.env.REACT_APP_ORIGIN}`
                },
            });
            
            if (response.ok) {
                setIsLoggedIn(false);
                setUserProfile(null);
            }
        } catch (error) {
            console.error('Error during logout:', error);
        }
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