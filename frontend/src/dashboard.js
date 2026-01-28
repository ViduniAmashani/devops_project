import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // <-- for navigation
import "./dashboard.css";

const AdminDashboard = () => {
  const [donors, setDonors] = useState([]);
  const navigate = useNavigate(); // navigation hook

  // Load all donors
  const loadDonors = async () => {
    try {
      const res = await fetch("http://localhost:4000/api/donate");
      const data = await res.json();
      setDonors(data);
    } catch (error) {
      console.error("Error fetching donors:", error);
    }
  };

  useEffect(() => {
    loadDonors();
  }, []);

  // Accept donor
  const acceptDonor = async (id) => {
    try {
      await fetch(`http://localhost:4000/api/donate/${id}/accept`, {
        method: "PUT",
      });
      loadDonors();
    } catch (error) {
      console.error("Error accepting donor:", error);
    }
  };

  // Delete donor
  const deleteDonor = async (id) => {
    try {
      await fetch(`http://localhost:4000/api/donate/${id}`, {
        method: "DELETE",
      });
      loadDonors();
    } catch (error) {
      console.error("Error deleting donor:", error);
    }
  };

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("adminToken"); // remove your login token
    navigate("/"); // redirect to login page
  };

  return (
    <div className="admin-dashboard">
      <div className="dashboard-header">
        <h1>Admin Dashboard</h1>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Full Name</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>Age</th>
            <th>Gender</th>
            <th>Blood Group</th>
            <th>Address</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {donors.map((d) => (
            <tr key={d._id}>
              <td>{d.fullName}</td>
              <td>{d.email || "-"}</td>
              <td>{d.mobileNumber}</td>
              <td>{d.age}</td>
              <td>{d.gender}</td>
              <td>{d.bloodGroup}</td>
              <td>{d.address}</td>
              <td>{d.status}</td>
              <td>
                {d.status === "pending" && (
                  <button
                    className="accept-btn"
                    onClick={() => acceptDonor(d._id)}
                  >
                    Accept
                  </button>
                )}
                <button
                  className="delete-btn"
                  onClick={() => deleteDonor(d._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
