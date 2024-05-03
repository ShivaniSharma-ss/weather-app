import React from "react";
import { useState } from "react";
import "./signUp.css";
import { Link } from "react-router-dom";


const SignUp = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
  });
  function handleChange(e) {
    let name = e.target.name;
    let value = e.target.value;
    setUser((prev) => {
      return { ...prev, [name]: value };
    });
  }
  function handleSignUp(e) {
    e.preventDefault();
    let userBody = {
      name: user.username,
      email: user.email,
    };
    const reqArray = [
      fetch(`http://localhost:4000/addUser`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userBody),
      }),
      fetch(`http://localhost:4000/send-email?email=${user.email}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      }),
    ];
    Promise.all(reqArray)
      .then((res) => res.json())
      .then((data) => console.log(data[0], data[1]))
      .catch((e) => console.log(e));
    // .then((res) => console.log(res))
    // .catch((e) => console.log(e));
  }

  return (
    <>
      <div className="main-div">
        <div className="card">
          <div className="container">
            <form className="form-class" onSubmit={handleSignUp}>
              <input
                onChange={handleChange}
                type="text"
                name="username"
                value={user.username}
                placeholder="Enter username"
              />
              <input
                name="email"
                onChange={handleChange}
                type="text"
                value={user.email}
                placeholder="Enter Email"
              />
              <Link to="/signIn">
                Already have an account? Click here to sign In
              </Link>
              <button type="submit">Sign Up</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
