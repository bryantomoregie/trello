import React, { useState, useRef, useMemo } from "react";
import { Link } from "react-router-dom";

import "./index.css";

export default function RegisterOrLogin({ register, handleSubmit }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const form = useRef();

  const formValid = useMemo(() => {
    return form.current?.reportValidity();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name, email, password]);

  return (
    <div className="form-container">
      <img
        alt="Trello"
        src="https://d2k1ftgv7pobq7.cloudfront.net/meta/c/p/res/images/trello-header-logos/167dc7b9900a5b241b15ba21f8037cf8/trello-logo-blue.svg"
        height={43}
        style={{ marginTop: "3rem" }}
      ></img>
      <form
        ref={form}
        className="form"
        onSubmit={(e) => handleSubmit(e, { name, email, password })}
      >
        <p>{register ? "Sign up for your account" : "Log in to Trello"}</p>
        {register ? (
          <input
            onInvalid={(e) => e.preventDefault()}
            placeholder="Enter Name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></input>
        ) : null}
        <input
          placeholder="Enter Email"
          required
          value={email}
          type="email"
          onInvalid={(e) => e.preventDefault()}
          onChange={(e) => setEmail(e.target.value)}
        ></input>
        <input
          onInvalid={(e) => e.preventDefault()}
          placeholder="Enter Password"
          // minLength={4}
          // maxLength={8}
          required
          value={password}
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <button
          type="submit"
          className={formValid ? "button-success" : "button"}
          disabled={!formValid}
        >
          {register ? "Sign Up" : "Log In"}
        </button>
        <hr />
        <Link className="login-link" to={register ? "/login" : "/register"}>
          {register
            ? "Already have an account? Log in"
            : "Sign up for an account"}
        </Link>
      </form>
    </div>
  );
}
