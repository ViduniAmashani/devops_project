import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./register.css";

function Register() {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    let email = e.target.email.value;
    const name = e.target.name.value;
    const password = e.target.password.value;
    const confirmPassword = e.target["confirm-password"].value;

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    if (!email || !name || !password) {
      alert("All fields are required!");
      return;
    }

    // ✅ convert email to lowercase to avoid login issues
    email = email.trim().toLowerCase();

    try {
      const res = await fetch("http://3.110.214.84:4000/api/auth/register", { 
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, password, email }),
      });

      const data = await res.json();

      if (res.ok) {
        alert(data.message);
        navigate("/"); // redirect to login
      } else {
        alert(data.error || "Registration failed");
      }
    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  };

  return (
    <div className="register-page">
      <img src="/login_image.jpg" alt="Background" className="register-bg" />
      <div className="overlay">
        <h1 className="title">
          Blood Bank & Management <br />
          <span>User Registration Portal</span>
        </h1>

        <div className="register-box">
          <form onSubmit={handleSubmit}>
            <label htmlFor="email">
              <em>Email</em><span className="required">*</span>
            </label>
            <input type="email" id="email" placeholder="Enter your email" required />

            <label htmlFor="name">
              <em>Username</em><span className="required">*</span>
            </label>
            <input type="text" id="name" placeholder="Choose a username" required />

            <label htmlFor="password">
              <em>Password</em><span className="required">*</span>
            </label>
            <input type="password" id="password" placeholder="Create a password" required />

            <label htmlFor="confirm-password">
              <em>Confirm Password</em><span className="required">*</span>
            </label>
            <input type="password" id="confirm-password" placeholder="Re-enter your password" required />

            <button type="submit" className="register-btn">REGISTER</button>
          </form>

          <p className="login-text">
            Already have an account? <Link to="/">Login here.</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
