import React, { useState } from "react";
import "./navbar.css";
import Logo from "../images/logo-bg.png";

function NavBar({ page }) {
  // State to manage menu toggle
  const [menuOpen, setMenuOpen] = useState(false);

  // Toggle function
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="navbar">
      <div className="navbar-left">
        <a href="/">
          <img src={Logo} alt="logo" className="logo" />
        </a>
        <svg height="80" width="2" className="line">
          <line
            x1="0"
            y1="0"
            x2="0"
            y2="50"
            style={{ stroke: "#222", strokeWidth: "0.15vw" }}
          />
        </svg>
        <p className="alumni">{page === "student" ? "Student" : "Alumni"}</p>
      </div>

      {/* Hamburger button for mobile */}
      <button className="navbar-toggle" onClick={toggleMenu}>
        <span className={`hamburger ${menuOpen ? "open" : ""}`}></span>
        <span className={`hamburger ${menuOpen ? "open" : ""}`}></span>
        <span className={`hamburger ${menuOpen ? "open" : ""}`}></span>
      </button>

      {/* Navigation items */}
      <div className={`navbar-right ${menuOpen ? "open" : ""}`}>
        <div className="nav">
          {page === "home" ? (
            <>
              <a href="/class">
                <p className="nav-item">Class</p>
              </a>
              <a href="/connect">
                <p className="nav-item">Network</p>
              </a>
              <a href="#">
                <p className="nav-item">Events</p>
              </a>
              <a href="/student">
                <p className="nav-item">Student</p>
              </a>
              <a href="/alumni">
                <p className="nav-item">Alumni</p>
              </a>
            </>
          ) : (
            <>
              <br />
              <a href="/">
                <p className="nav-item">Return Home</p>
              </a>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default NavBar;
