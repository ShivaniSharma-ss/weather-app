import React from "react";
import "./navbar.css";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate, Link } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();
  return (
    <nav class="navbar navbar-expand-lg navbar-light bg-dark">
      <Link class="navbar-brand">
        Navbar
      </Link>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavDropdown"
        aria-controls="navbarNavDropdown"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavDropdown">
        <ul class="navbar-nav">
          {localStorage.getItem("userEmail") && (
            <li class="nav-item active d-flex">
              <Link class="nav-link" to="/">
                Home
              </Link>
            </li>
          )}
          {!localStorage.getItem("userEmail") && (
            <li class="nav-item d-flex">
              &&
              <Link class="nav-link" to="/signIn">
                Sign In
              </Link>
            </li>
          )}
          {!localStorage.getItem("userEmail") && (
            <li class="nav-item d-flex">
              <Link class="nav-link" to="/signUp">
                Sign Up
              </Link>
            </li>
          )}

          {localStorage.getItem("userEmail") && (
            <li class="nav-item d-flex">
              <Link to="/weather" className="nav-link">
                Weather App
              </Link>
            </li>
          )}
        </ul>
      </div>
      {localStorage.getItem("userEmail") && (
        <div className="right">
          <ul className="navbar-nav">
            <li class="nav-item dropdown d-flex">
              <Link
                class="nav-link dropdown-toggle"
                to="#"
                id="navbarDropdownMenuLink"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <FontAwesomeIcon icon={faUser} /> {/* User icon */}
                <p>{localStorage.getItem("userEmail")}</p>
              </Link>
              <div
                class="dropdown-menu"
                aria-labelledby="navbarDropdownMenuLink"
              >
                <span
                  onClick={() => {
                    localStorage.removeItem("userEmail");
                    navigate("/signIn");
                  }}
                  class="dropdown-item"
                  style={{cursor: 'pointer'}}
                >
                  Logout
                </span>
              </div>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
