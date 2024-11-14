// src/pages/Home.js
import React, {useEffect} from 'react';
import '../styles/home.css'; // Import CSS specific to this page
import { indexScript } from '../scripts/index-script';

function Home() {
    useEffect(() => {
        indexScript();
    }, []);
    return (
        <div id="content-body">
            {/* Hero Section */}
            <section className="hero animate__animated animate__fadeIn">
                <div className="hero-content animate__animated animate__backInLeft">
                    <h2>Unlock Your Potential with Virtual Labs</h2>
                    <p>Dive into our interactive online virtual labs designed to enhance your computational thinking skills.</p>
                    <div className="cta-buttons">
                        <a href="/courses" className="btn">Get Started</a>
                    </div>
                </div>
            </section>

            {/* Steps Section */}
            <section className="steps animate__animated animate__fadeIn">
                <div className="container">
                    <h2>Discover the Power of Virtual Labs</h2>
                    <p>Our interactive virtual labs provide an immersive learning experience.</p>
                    <div className="steps-grid">
                        <div className="step">
                            <img src="/static/img/step-1-select.svg" alt="Step 1" />
                            <h3>Step 1: Choose Your Lab</h3>
                            <p>Select from a variety of engaging labs.</p>
                        </div>
                        <div className="step">
                            <img src="/static/img/step-2-guide.svg" alt="Step 2" />
                            <h3>Step 2: Follow Guided Instructions</h3>
                            <p>Receive step-by-step instructions for each activity.</p>
                        </div>
                        <div className="step">
                            <img src="/static/img/step-3-experiment.svg" alt="Step 3" />
                            <h3>Step 3: Experiment and Learn</h3>
                            <p>Engage in hands-on experiments to deepen your understanding.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Call-to-Action Section */}
            <section className="cta-section">
                <div className="container">
                    <h2>Unlimited Learning with Our Free Platform</h2>
                    <p>Hands-on virtual labs, designed to enhance your computational skills. All for free, forever!</p>
                    <div className="cta-buttons">
                        <a href="/login" className="btn">Get Started</a>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="features-section">
                <div className="container">
                    <h2>App Features</h2>
                    <p>Explore the unique features of our virtual labs platform.</p>
                    <div className="features-grid">
                        <div className="feature">
                            <img src="/static/img/interactive.gif" alt="Interactive Labs" />
                            <h3>Interactive Labs</h3>
                            <p>Engage with immersive hands-on labs tailored for various skill levels.</p>
                        </div>
                        <div className="feature">
                            <img src="/static/img/real-world.png" alt="Real-World Scenarios" />
                            <h3>Real-World Scenarios</h3>
                            <p>Work on real-world problems that enhance your practical skills.</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Home;
