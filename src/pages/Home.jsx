import React from "react";
import { useNavigate } from 'react-router-dom';
import "./Home.css"; // Import the separate CSS file

const Home = () => {
  const navigate = useNavigate();

  const handleScroll = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    navigate('/admin-dash');
  };

  return (
    <div className="home-container">
      {/* Navigation Bar */}
      <header className="header">
        <div className="nav-container">
          <h1 className="logo-text">CityVoice</h1>
          <nav className="main-nav">
            <ul className="nav-list">
              <li><a href="#" className="nav-link">AboutUs</a></li>
              <li><a href="#" className="nav-link" onClick={() => handleScroll('services-section')}>Services</a></li>
              <li><a href="#" className="nav-link">News</a></li>
              <li><a href="#" className="nav-link" onClick={() => handleScroll('contact-section')}>Contact</a></li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-container">
          <div className="hero-content">
            <h2 className="hero-title">Digital Citizen Engagement Platform</h2>
            <p className="hero-description">
              Streamline your city's communication with residents. Connect, respond, and resolve civic problems efficiently for a better urban experience.
            </p>
            <button className="report-button" onClick={() => navigate('/file-complain')}>
              Report an Issue
            </button>
          </div>
          <div className="hero-image-container">
            <img 
              src="/images/Home1.png" // Change this path to your new image
              alt="City park with people walking" 
              className="hero-image"
            />
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services-section" className="services-section">
        <div className="services-container">
          <h3 className="section-title">Our Services</h3>
          
          <div className="services-grid">
            {/* Service 1 */}
            <div className="service-card">
              <img src="/images/Home4.png" alt="Issue Reporting" className="service-image" />
              <h4 className="service-title">Issue Reporting</h4>
              <p className="service-description">
                Easily submit infrastructure problems, service requests, and public facility issues
              </p>
            </div>
            
            {/* Service 2 */}
            <div className="service-card">
              <img src="/images/Home3.png" alt="Service Tracking" className="service-image" />
              <h4 className="service-title">Service Tracking</h4>
              <p className="service-description">
                Monitor the status of your requests in real-time with transparent updates on progress and estimated completion times.
              </p>
            </div>
            
            {/* Service 3 */}
            <div className="service-card">
              <img src="/images/Home2.png" alt="Community Feedback" className="service-image" />
              <h4 className="service-title">Community Feedback</h4>
              <p className="service-description">
                Share your ideas, participate in community discussions, and vote on proposed initiatives to help shape your city.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="features-container">
          <h3 className="features-title">Simplify Citizen Issue Management</h3>
          
          <div className="features-grid">
            {/* Feature cards */}
            <div className="feature-card">
              <h4 className="feature-heading">"Efficient Complaint Resolution"</h4>
              <p className="feature-text">Streamline the process of addressing city complaints with swift and effective resolutions.</p>
            </div>
            
            <div className="feature-card">
              <h4 className="feature-heading">"User Friendly Interface"</h4>
              <p className="feature-text">Navigate our portal effortlessly with a design focused on ease of use for all users.</p>
            </div>
            
            <div className="feature-card">
              <h4 className="feature-heading">"Real-Time Issue Tracking"</h4>
              <p className="feature-text">Stay updated on the status of your complaint with continuous real-time tracking.</p>
            </div>
            
            <div className="feature-card">
              <h4 className="feature-heading">"Community Feedback Forum"</h4>
              <p className="feature-text">Engage with other citizens, share experiences, and collaborate on solutions.</p>
            </div>
            
            <div className="feature-card">
              <h4 className="feature-heading">"Transparent Communication"</h4>
              <p className="feature-text">Receive clear and timely updates on your complaint's progress. We value keeping you informed every step of the way.</p>
            </div>
            
            <div className="feature-card highlight">
              <h4 className="feature-heading">"Dedicated Support Team"</h4>
              <p className="feature-text">Our responsive team is here to assist you with any questions or concerns. We are committed to providing helpful and efficient support.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section id="contact-section" className="contact-section">
        <div className="contact-container">
          <div className="contact-layout">
            <div className="form-container">
              <h3 className="contact-title">Contact me</h3>
              
              <form className="contact-form" onSubmit={handleContactSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">First name</label>
                    <input type="text" placeholder="John" className="form-input" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Last name</label>
                    <input type="text" placeholder="Smithson" className="form-input" />
                  </div>
                </div>
                
                <div className="form-group">
                  <label className="form-label">Email address</label>
                  <input type="email" placeholder="email@citydomain.net" className="form-input" />
                </div>
                
                <div className="form-group">
                  <label className="form-label">Your message</label>
                  <textarea placeholder="Enter your question or message" rows="4" className="form-textarea"></textarea>
                </div>
                
                <button className="submit-button">Submit</button>
              </form>
            </div>
            
            <div className="contact-image-container">
              <img 
                src="/images/Home5.png" // Change this path to your new image
                alt="Customer service person with headset" 
                className="contact-image"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;