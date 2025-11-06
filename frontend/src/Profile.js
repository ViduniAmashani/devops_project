import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Profile.css";

function Profile({ currentUser }) {
  // Default empty user for new users
  const emptyUser = {
    type: "donor",
    name: "",
    age: "",
    gender: "",
    bloodGroup: "",
    contact: "",
    address: "",
    donationHistory: [],
    requestHistory: [],
    nextEligibleDate: "",
  };

  const [user, setUser] = useState(currentUser || emptyUser);
  const [isEditing, setIsEditing] = useState(!currentUser); // start editing for new users
  const [form, setForm] = useState({ ...user });

  // ✅ Fetch profile on component mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const response = await fetch("http://localhost:4000/api/profile", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        if (response.ok) {
          setUser(data);
          setForm(data);
          setIsEditing(false);
        } else {
          console.error(data.error);
        }
      } catch (err) {
        console.error("Error loading profile:", err);
      }
    };

    fetchProfile();
  }, []);

  useEffect(() => {
    if (currentUser) {
      setUser(currentUser);
      setForm({ ...currentUser });
      setIsEditing(false);
    }
  }, [currentUser]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    setForm({ ...user });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Please login first");
        return;
      }

      const response = await fetch("http://localhost:4000/api/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (response.ok) {
        setUser(data.user);
        setIsEditing(false);
        alert(data.message);
      } else {
        alert(data.error || "Failed to save profile");
      }
    } catch (err) {
      console.error(err);
      alert("Error connecting to server");
    }
  };

  return (
    <div className="profile-page">
      <nav className="navbar">
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/donate">Donate Blood</Link></li>
          <li><Link to="/request">Request Blood</Link></li>
          <li><Link to="/profile">Profile</Link></li>
          <li><Link to="/logout">Logout</Link></li>
        </ul>
      </nav>

      <div className="profile-container">
        <h1>{currentUser ? "My Profile" : "Create Profile"}</h1>

        {!isEditing && (
          <button className="edit-btn" onClick={handleEditToggle}>
            Edit Profile
          </button>
        )}

        <form onSubmit={handleSave}>
          <div className="profile-section">
            <h3>Personal Information</h3>

            <p>
              <strong>Name:</strong>{" "}
              {isEditing ? (
                <input type="text" name="name" value={form.name} onChange={handleChange} required />
              ) : (
                user.name
              )}
            </p>

            <p>
              <strong>Age:</strong>{" "}
              {isEditing ? (
                <input type="number" name="age" value={form.age} onChange={handleChange} required />
              ) : (
                user.age
              )}
            </p>

            <p>
              <strong>Gender:</strong>{" "}
              {isEditing ? (
                <select name="gender" value={form.gender} onChange={handleChange} required>
                  <option value="">Select</option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              ) : (
                user.gender
              )}
            </p>

            <p>
              <strong>Blood Group:</strong>{" "}
              {isEditing ? (
                <select name="bloodGroup" value={form.bloodGroup} onChange={handleChange} required>
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
              ) : (
                user.bloodGroup
              )}
            </p>

            <p>
              <strong>Contact:</strong>{" "}
              {isEditing ? (
                <input type="text" name="contact" value={form.contact} onChange={handleChange} required />
              ) : (
                user.contact
              )}
            </p>

            <p>
              <strong>Address:</strong>{" "}
              {isEditing ? (
                <textarea name="address" value={form.address} onChange={handleChange} rows="2" required />
              ) : (
                user.address
              )}
            </p>
          </div>

          {form.type === "donor" ? (
            <>
              <div className="profile-section">
                <h3>Donation History</h3>
                {user.donationHistory?.length > 0 ? (
                  <ul>
                    {user.donationHistory.map((d, i) => (
                      <li key={i}>{d.date} - {d.location}</li>
                    ))}
                  </ul>
                ) : (
                  <p>No donation history yet.</p>
                )}
              </div>
              <div className="profile-section">
                <h3>Eligibility Status</h3>
                <p>Next eligible donation date: {user.nextEligibleDate || "N/A"}</p>
              </div>
            </>
          ) : (
            <div className="profile-section">
              <h3>Request History</h3>
              {user.requestHistory?.length > 0 ? (
                <ul>
                  {user.requestHistory.map((r, i) => (
                    <li key={i}>
                      {r.date} - Blood Group: {r.bloodGroup} - Status: {r.status}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No request history yet.</p>
              )}
            </div>
          )}

          {isEditing && (
            <div className="edit-buttons">
              <button type="submit" className="save-btn">Save</button>
              <button type="button" className="cancel-btn" onClick={handleEditToggle}>Cancel</button>
            </div>
          )}
        </form>
      </div>

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

export default Profile;
