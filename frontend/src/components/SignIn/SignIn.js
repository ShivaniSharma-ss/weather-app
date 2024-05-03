import React from "react";
import { useState, useEffect } from "react";
import "./signIn.css";
import Toast from "../toast/Toast";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const SignIn = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState({
    isError: false,
    msg: "",
  });
  const [showToast, setShowToast] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("userEmail");
    if (token) {
      navigate("/");
    }
  }, [navigate]);

  function handleChange(e) {
    let name = e.target.name;
    let value = e.target.value;
    setUser((prev) => {
      return { ...prev, [name]: value };
    });
  }
  function handleSignIn(e) {
    e.preventDefault();
    let email = e.target[0].value;
    let password = e.target[1].value;
    let passwordFromDb;
    fetch(`http://localhost:4000/getUserByEmail?email=${email}`)
      .then((res) => res.json())
      .then((data) => {
        passwordFromDb = data[0].password;
        if (password === passwordFromDb) {
          console.log("Signed In Successfully");

          setShowToast(true);
          localStorage.setItem("userEmail", email);
        } else {
          setError({ isError: true, msg: "Please check email or password" });
        }
      })
      .catch((e) => {
        console.log(e);
        setError({
          isError: true,
          msg: "User does not exist.Please sign up for creating new user",
        });
      });
  }

  if (showToast) {
    setTimeout(() => {
      navigate("/");
    }, 2000);
  }
  return (
    <>
      {showToast && <Toast message="Signed In successfully" />}
      <div className="main-div">
        <div className="card">
          <div className="container">
            <form className="form-class" onSubmit={handleSignIn}>
              <input
                name="email"
                onChange={handleChange}
                type="text"
                value={user.email}
                placeholder="Enter email"
              />
              <input
                name="password"
                onChange={handleChange}
                type="password"
                value={user.password}
                placeholder="Enter password"
              />
              {error && <span className="error">{error.msg}</span>}
              <span>
                Not Existing User?{" "}
                <Link to="/signUp">Click here to sign up</Link>
              </span>
              <button type="submit">Sign In </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;
