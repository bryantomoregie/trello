import React from "react";
import { useAuth } from "../Login/AuthenticationProvider";
import { useNavigate } from "react-router-dom";

import "./index.css";

export default function Nav() {
  const { logout, loggedIn } = useAuth();
  const navigate = useNavigate();

  const logOut = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="navigation">
      {loggedIn ? <button onClick={logOut}>Log Out</button> : null}
    </div>
  );
}
