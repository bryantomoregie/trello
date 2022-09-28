import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthenticationProvider";

import RegisterOrLogin from "../RegisterOrLogin";

export default function Login() {
  const [error, setError] = useState();

  const navigate = useNavigate();
  const { login, loading, loggedIn } = useAuth();

  if (loading) return <div>Loading</div>;

  if (loggedIn) {
    navigate("/");
  }

  const handleSubmit = (e, { email, password }) => {
    e.preventDefault();
    login(email, password)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return <RegisterOrLogin submit={handleSubmit} error={error} />;
}
