import React from 'react';
import '../styles/aboutus-style.css';

const AboutUs = () => {
    return (
        <div id="content-body">
            <section className="aboutus-head">
                <h1>About Us</h1>
                <p>Learn more about our team, our values, and our vision.</p>
            </section>

            <section className="about-section">
                <div className="about-card">
                    <img src="/static/img/target.webp" alt="Mission" className="about-img" />
                    <h2>Our Mission</h2>
                    <p>Our mission is to provide an engaging, accessible, and interactive environment where learners can practice and master computational thinking. We aim to inspire creativity, logical reasoning, and effective problem decomposition, preparing individuals to excel in various fields that rely on digital problem-solving skills.</p>
                </div>

                <div className="about-card">
                    <img src="/static/img/star.webp" alt="Vision" className="about-img" />
                    <h2>Our Vision</h2>
                    <p>To be a leading platform in fostering critical thinking and problem-solving abilities through computational thinking, preparing learners for the challenges of tomorrow's digital world.</p>
                </div>
            </section>

            <section className="team-section">
                <h2>Meet Our Team</h2>
                <div className="team-container">
                    <div className="team-member">
                        <img src="/static/img/foto-dama.png" alt="Member" className="team-img" />
                        <h3>Dama D. Daliman</h3>
                        <p>#BegadangDemiPAWM</p>
                    </div>
                    <div className="team-member">
                        <img src="https://via.placeholder.com/100" alt="Member" className="team-img" />
                        <h3>John Doe</h3>
                        <p>Project Manager</p>
                    </div>
                    <div className="team-member">
                        <img src="https://via.placeholder.com/100" alt="Member" className="team-img" />
                        <h3>Jane Smith</h3>
                        <p>UI/UX Designer</p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AboutUs;
