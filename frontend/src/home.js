import React from "react";
import { Link, useNavigate } from "react-router-dom"; // <-- added useNavigate
import "./home.css";

function Home() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear login/session data (if any)
    localStorage.removeItem("userToken"); // adjust key if needed
    // Navigate to login page
    navigate("/");
  };

  return (
    <div className="home-container">
      {/* Top Bar */}
      <div className="top-bar">
        <nav className="nav-links">
          <ul>
            <li><Link to="/home">Home</Link></li>
            <li><Link to="/donate">Donate Blood</Link></li>
            <li><Link to="/request">Request Blood</Link></li>
            <li><Link to="/profile">Profile</Link></li>
            <li>
              <button onClick={handleLogout} className="logout-button">
                Logout
              </button>
            </li>
          </ul>
        </nav>
      </div>

      {/* Hero Section */}
      <div className="hero-section">
        <h2 className="did-you-know">DID YOU KNOW?</h2>
        <img src="/home_image.png" alt="Blood Donation" className="hero-img" />
        <h3 className="donation-text">
          One blood donation <br /> <span>could save up to three lives</span>
        </h3>
      </div>

      {/* Welcome Section */}
      <div className="welcome-section">
        <h1>Welcome to BloodBank & Donor Management System</h1>

        <div className="info-boxes">
          {/* Box 1 */}
          <div className="info-box">
            <h3>The need for blood</h3>
            <p>
              There are many reasons patients need blood. A common misunderstanding
              about blood usage is that accident victims are the patients who use the
              most blood.
            </p>
          </div>

          {/* Box 2 */}
          <div className="info-box">
            <h3>Blood Tips</h3>
            <p>1) You must be in good health.</p>
            <p>2) Hydrate and eat a healthy meal before your donation.</p>
            <p>3) You're never too old to donate blood.</p>
          </div>

          {/* Box 3 */}
          <div className="info-box">
            <h3>Who you could Help</h3>
            <p>
              Every 2 seconds, someone in the World needs blood. Donating blood can
              help:
            </p>
            <p>1) People who go through disasters or emergency situations.</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <p>Blood Bank & Management</p>
          <p>Email: support@bloodbank.com | Phone: +94 77 123 4567</p>
          <p>Follow us on:
            <a href="#" className="footer-link"> Facebook</a> |
            <a href="#" className="footer-link"> Twitter</a> |
            <a href="#" className="footer-link"> Instagram</a>
          </p>
          <p>© 2025 All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default Home;
