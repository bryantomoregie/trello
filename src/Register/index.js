import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

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

  return (
    <form onSubmit={handleClick}>
      <input
        placeholder="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      ></input>
      <input
        placeholder="email"
        value={email}
        type="email"
        onChange={(e) => setEmail(e.target.value)}
      ></input>
      <input
        placeholder="password"
        value={password}
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      ></input>
      <button>Sign Up</button>
    </form>
  );
}
