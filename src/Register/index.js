import React, { useState, useRef, useMemo } from "react";
import { useNavigate, Link } from "react-router-dom";

import "./index.css";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const form = useRef();
  const navigate = useNavigate();

  const formValid = useMemo(() => {
    return form.current?.reportValidity();
  }, [name, email, password]);

  const handleClick = (e) => {
    e.preventDefault();
    fetch(`http://localhost:3001/user/register`, {
      method: "POST",
      body: JSON.stringify({ name, email, password }),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => console.log(response))
      .then(() => navigate("/login"))
      .catch(() => console.log("Help"));
  };

  console.log(formValid);
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        backgroundColor: "#f9fafc",
      }}
    >
      <img
        alt="Trello"
        src="https://d2k1ftgv7pobq7.cloudfront.net/meta/c/p/res/images/trello-header-logos/167dc7b9900a5b241b15ba21f8037cf8/trello-logo-blue.svg"
        height={43}
        style={{ marginTop: "3rem" }}
      ></img>
      <form
        ref={form}
        className="register-form"
        onSubmit={handleClick}
        style={{
          display: "flex",
          flexDirection: "column",
          width: "30%",
          height: 400,
          marginTop: "3rem",
          boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
          padding: "25px 40px",
          backgroundColor: "white",
          gap: "1rem",
        }}
      >
        <p style={{ color: "#5e6e84", textAlign: "center" }}>
          Sign up for your account
        </p>
        <input
          onInvalid={(e) => e.preventDefault()}
          placeholder="Enter Name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{
            padding: "6px 3px",
            border: "2px solid #dfe1e6",
            borderRadius: 3,
          }}
        ></input>
        <input
          placeholder="Enter Email"
          required
          value={email}
          type="email"
          onInvalid={(e) => e.preventDefault()}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            padding: "6px 3px",
            border: "2px solid #dfe1e6",
            borderRadius: 3,
          }}
        ></input>
        <input
          onInvalid={(e) => e.preventDefault()}
          placeholder="Enter Password"
          required
          value={password}
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          style={{
            padding: "6px 3px",
            border: "2px solid #dfe1e6",
            borderRadius: 3,
          }}
        ></input>
        <button
          className={formValid ? "button-success" : "button"}
          disabled={formValid}
        >
          Sign Up
        </button>
        <hr />
        <Link className="login-link" to="/login">
          Already have an account? Log in
        </Link>
      </form>
    </div>
  );
}

//https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement/reportValidity
//https://expressjs.com/en/api.html#res.end
