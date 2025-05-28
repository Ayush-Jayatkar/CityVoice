import React from 'react';
import './AboutUs.css';

const AboutUs = () => {
  return (
    <div className="about-container">
      <div className="about-content">
        <h1>About CityVoice</h1>
        <p>
          <strong>CityVoice</strong> is a digital citizen engagement platform designed to bridge the gap between city authorities and residents.
          Our mission is to make civic communication more transparent, responsive, and effective.
        </p>
        <p>
          Whether it’s reporting a pothole, a broken streetlight, or sharing community suggestions,
          CityVoice empowers every citizen to raise issues that matter and track their resolution.
        </p>
        <p>
          We aim to enhance public participation in governance and simplify issue redressal through technology.
        </p>
        
        <h2>Our Mission</h2>
        <ul>
          <li>📢 Give every citizen a voice</li>
          <li>🛠️ Enable real-time issue tracking & resolution</li>
          <li>💡 Promote community-driven improvements</li>
        </ul>

        <h2>Our Team</h2>
        <p>
          A group of developers, designers, and urban enthusiasts committed to building smarter and more connected cities.
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
