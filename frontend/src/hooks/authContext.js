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
            const response = await fetch('/api/check-auth/', {
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
        const csrfCookie = document.cookie.split('; ').find(row => row.startsWith('csrftoken='));
        if (csrfCookie) {
            return csrfCookie.split('=')[1];
        }
        try {
            await fetch('/api/get-csrf-token/', { credentials: 'include' });
            const newCsrfCookie = document.cookie.split('; ').find(row => row.startsWith('csrftoken='));
            return newCsrfCookie ? newCsrfCookie.split('=')[1] : null;
        } catch (error) {
            console.error('Error fetching CSRF token:', error);
            return null;
        }
    };

    const login = async (username, password, next = '/') => {
        const csrfToken = await getCSRFToken();
        const formData = { username, password, next };
        
        try {
            const response = await fetch('/api/login/', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrfToken,
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
            const response = await fetch('/api/logout/', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrfToken,
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