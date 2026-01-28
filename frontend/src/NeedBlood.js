import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./NeedBlood.css";

const NeedBlood = () => {
  const [form, setForm] = useState({
    bloodGroup: "",
    reason: ""
  });

  const [donors, setDonors] = useState([]);
  const [results, setResults] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted:", form);

    try {
      // ✅ Updated URL to fetch only admin-accepted donors
      const response = await fetch(
        `http://localhost:4000/api/donate/accepted/${form.bloodGroup}`
      );
      const data = await response.json();
      setDonors(data);
      setResults(true);
    } catch (error) {
      console.error("Error fetching donors:", error);
      setDonors([]);
      setResults(true);
    }
  };

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar">
        <ul>
          <li><Link to="/home">Home</Link></li>
          <li><Link to="/donate">Donate Blood</Link></li>
          <li><Link to="/request">Request Blood</Link></li>
          <li><Link to="/profile">Profile</Link></li>
          <li><Link to="/">Logout</Link></li>
        </ul>
      </nav>

      {/* Page Content */}
      <div className="need-container">
        <h2>Need Blood</h2>
        <form className="need-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label>
                Blood Group<span className="required">*</span>
              </label>
              <select
                name="bloodGroup"
                value={form.bloodGroup}
                onChange={handleChange}
                required
              >
                <option value="">Select</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
              </select>
            </div>

            <div className="form-group">
              <label>
                Reason, why do you need blood?<span className="required">*</span>
              </label>
              <textarea
                name="reason"
                rows="2"
                value={form.reason}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <button type="submit" className="search-btn">Search</button>
        </form>

        {/* Search Results */}
        {results && (
          <div className="results">
            <h3>Available Donors</h3>
            {donors.length > 0 ? (
              <ul>
                {donors.map((donor, index) => (
                  <li key={index}>
                    <strong>{donor.fullName}</strong> <br />
                    Contact: {donor.mobileNumber}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No donors found for {form.bloodGroup}</p>
            )}
          </div>
        )}
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
};

export default NeedBlood;
