import React, { createContext, useState } from "react";
import { useContext } from "react";

const authContext = createContext();

function Authentication() {
  const [loggedIn, setLoggedIn] = useState(false);

  const login = (email, password) => {
    return fetch("http://localhost:3001/user/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
      mode: "cors",
      credentials: "include",
    })
      .then(() => setLoggedIn(true))
      .catch((error) => console.log(error));
  };

  return {
    loggedIn,
    login,
    // login() {
    //   return new Promise((res) => {
    //     setLoggedIn(true);
    //     res();
    //   });
    // },
    logout() {
      return new Promise((res) => {
        setLoggedIn(false);
        res();
      });
    },
  };
}

export function AuthenticationProvider({ children }) {
  const auth = Authentication();

  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export function useAuth() {
  return useContext(authContext);
}
