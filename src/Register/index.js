import React from "react";
import { useNavigate, Link } from "react-router-dom";

import RegisterOrLogin from "../RegisterOrLogin";

export default function Register() {
  const { navigate } = useNavigate();

  const handleSubmit = (e, { name, email, password }) => {
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

  return <RegisterOrLogin register handleSubmit={handleSubmit} />;
}

//https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement/reportValidity
//https://expressjs.com/en/api.html#res.end
