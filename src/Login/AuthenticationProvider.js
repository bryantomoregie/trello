import React, { createContext, useState, useEffect } from "react";
import { useContext } from "react";

const authContext = createContext();

function Authentication() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3001/user/check-credentials", {
      credentials: "include",
      mode: "cors",
    })
      .then((res) => res.json())
      .then((res) => {
        if (!res.error) {
          setLoggedIn(true);
          setLoading(false);
        } else {
          throw new Error(res.error.statusMessage);
        }
      })
      .catch((err) => {
        console.log({ err });
        setLoading(false);
      });
  }, []);

  // useEffect(() => {
  //   fetch("http://localhost:3001/user/delete-users", {
  //     method: "DELETE",
  //   })
  //     .then(() => setLoading(false))
  //     .catch((err) => console.log(err));
  // }, []);

  const login = (email, password) => {
    return fetch("http://localhost:3001/user/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
      mode: "cors",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((res) => {
        if (!res.error) {
          setLoggedIn(true);
        } else {
          console.log({ res });
          throw new Error(res.error.statusMessage);
        }
      })
      .catch((error) => console.log({ error }));
  };

  const logout = () => {
    return fetch("http://localhost:3001/user/logout", {
      method: "get",
      credentials: "include",
    })
      .then((res) => {
        setLoggedIn(false);
      })
      .catch((error) => console.warn(error));
  };

  return {
    loggedIn,
    loading,
    login,
    logout,
  };
}

export function AuthenticationProvider({ children }) {
  const auth = Authentication();

  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export function useAuth() {
  return useContext(authContext);
}
