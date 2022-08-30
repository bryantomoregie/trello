import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthenticationProvider";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, loading, loggedIn } = useAuth();

  if (loading) return <div>Loading</div>;

  if (loggedIn) {
    navigate("/");
  }

  const handleClick = (e) => {
    e.preventDefault();

    login(email, password).then(() => {
      navigate("/");
    });
  };

  const register = () => {
    navigate("/register");
  };

  return (
    <>
      <form onSubmit={handleClick}>
        <label>
          <input
            value={email}
            placeholder="email"
            onChange={(e) => setEmail(e.target.value)}
          ></input>
        </label>
        <label>
          <input
            value={password}
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          ></input>
        </label>
        <button>Log In</button>
      </form>
      <button onClick={register}>Regiter</button>
    </>
  );
}
