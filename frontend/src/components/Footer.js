// src/components/Footer.js
import React from 'react';
import '../styles/footer.css'; // Import any footer-specific styles

function Footer() {
    return (
        <footer>
            <div className="container">
                <div className="footer-logo">
                    <a href="/">
                        <h1>ViLabs</h1>
                    </a>
                </div>
                <div className="footer-content">
                    <div className="newsletter">
                        <h2>Subscribe to our newsletter</h2>
                        <p>Stay updated with the latest features and updates.</p>
                        <form action="#">
                            <input type="email" placeholder="Your email here" required />
                            <button type="submit">Join</button>
                        </form>
                    </div>
                    <div className="footer-links">
                        <div className="resources">
                            <h2>Resources</h2>
                            <ul>
                                <li><a href="/aboutus">About Us</a></li>
                                <li><a href="/courses">Courses</a></li>
                            </ul>
                        </div>
                        <div className="connect">
                            <h2>Stay Updated</h2>
                            <ul>
                                <li><a href="https://www.instagram.com">Instagram</a></li>
                                <li><a href="https://www.youtube.com">YouTube</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="footer-legal">
                    <p>&copy; 2024 ViLabs. All Rights Reserved. <a href="/">Terms of Service</a></p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
