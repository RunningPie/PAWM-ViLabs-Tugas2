// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './hooks/authContext';

import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/home';
import AboutUs from './pages/aboutus';
import Login from './pages/login';
import Courses from './pages/courses';
import Profile from './pages/profile';
import ComingSoon from './pages/comingsoon';
import Register from './pages/register';
import Decomposition from './pages/decom';
import ProtectedRoute from './components/ProtectedRoute'; // Import ProtectedRoute
import './App.css';

function App() {
    return (
        <div id="app-body">
            <AuthProvider>
                <Router>
                    <Header />
                  <main className="main-content">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/aboutus" element={<AboutUs />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/comingsoon" element={<ComingSoon />} />

                        {/* Protect these routes */}
                        <Route path="/courses" element={<ProtectedRoute element={Courses} />} />
                        <Route path="/profile" element={<ProtectedRoute element={Profile} />} />
                        <Route path="/decom" element={<ProtectedRoute element={Decomposition} />} />
                    </Routes>
                    </main>
                    <Footer />
                </Router>
            </AuthProvider>
        </div>
    );
}

export default App;
