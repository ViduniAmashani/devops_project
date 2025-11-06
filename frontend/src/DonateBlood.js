import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./DonateBlood.css";

const DonateBlood = () => {
  const [form, setForm] = useState({
    fullName: "",
    mobileNumber: "",
    email: "",
    age: "",
    gender: "",
    bloodGroup: "",
    address: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitted(false);

    try {
      const response = await fetch("http://localhost:4000/api/donate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitted(true);
        setForm({
          fullName: "",
          mobileNumber: "",
          email: "",
          age: "",
          gender: "",
          bloodGroup: "",
          address: "",
        });
      } else {
        setError(data.message || "Failed to submit donor details.");
      }
    } catch (err) {
      console.error("Error submitting donor:", err);
      setError("Failed to submit donor details.");
    }
  };

  return (
    <div className="donate-page">
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

      {/* Donate Blood Container */}
      <div className="donate-container">
        <h1 className="form-title">Donate Blood</h1>
        <hr />

        {submitted && <p className="success-msg">Donor details submitted successfully!</p>}
        {error && <p className="error-msg">{error}</p>}

        <form className="donate-form" onSubmit={handleSubmit}>
          {/* First Row */}
          <div className="form-row">
            <div className="form-group">
              <label>Full Name<span className="required">*</span></label>
              <input
                type="text"
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Mobile Number<span className="required">*</span></label>
              <input
                type="text"
                name="mobileNumber"
                value={form.mobileNumber}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Email Id</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Second Row */}
          <div className="form-row">
            <div className="form-group">
              <label>Age<span className="required">*</span></label>
              <input
                type="number"
                name="age"
                value={form.age}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Gender<span className="required">*</span></label>
              <select
                name="gender"
                value={form.gender}
                onChange={handleChange}
                required
              >
                <option value="">Select</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>

            <div className="form-group">
              <label>Blood Group<span className="required">*</span></label>
              <select
                name="bloodGroup"
                value={form.bloodGroup}
                onChange={handleChange}
                required
              >
                <option value="">Select</option>
                <option>A+</option>
                <option>A-</option>
                <option>B+</option>
                <option>B-</option>
                <option>O+</option>
                <option>O-</option>
                <option>AB+</option>
                <option>AB-</option>
              </select>
            </div>
          </div>

          {/* Third Row - Address */}
          <div className="form-group">
            <label>Address<span className="required">*</span></label>
            <textarea
              name="address"
              rows="2"
              value={form.address}
              onChange={handleChange}
              required
            />
          </div>

          {/* Submit Button */}
          <button type="submit" className="donate-btn">Submit</button>
        </form>
      </div>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <p>Blood Bank & Management</p>
          <p>Email: support@bloodbank.com | Phone: +94 77 123 4567</p>
          <p>
            Follow us on:
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

export default DonateBlood;
