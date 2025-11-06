import React from "react";
import { useNavigate, Link } from "react-router-dom";
import "./login.css";

function Login() {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const response = await fetch("http://localhost:4000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }) // Send login data to backend
      });

      const data = await response.json();

      if (response.ok) {
        alert("Login successful!");
        localStorage.setItem("token", data.token); // Save JWT token
        navigate("/home"); // Navigate to home page
      } else {
        alert(data.error || "Invalid email or password");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Server error. Please try again later.");
    }
  };

  return (
    <div className="login-page">
      {/* Background Image */}
      <img src="/login_image.jpg" alt="Background" className="login-bg" />

      {/* Overlay Content */}
      <div className="overlay">
        <h1 className="title">
          Blood Bank & Management <br />
          <span>User Login Portal</span>
        </h1>

        <div className="login-box">
          <form onSubmit={handleSubmit}>
            <label htmlFor="email">
              <em>Email</em><span className="required">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              required
            />

            <label htmlFor="password">
              <em>Password</em><span className="required">*</span>
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              required
            />

            <button type="submit" className="login-btn">
              LOGIN
            </button>
          </form>

          {/* Register Text */}
          <p className="register-text">
            Don't have an account? <Link to="/register">Register here.</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
