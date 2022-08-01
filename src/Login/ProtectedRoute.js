import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthenticationProvider";

export default function ProtectedRoute({ children }) {
  const { loggedIn } = useAuth();

  return loggedIn ? children : <Navigate to="/login" replace />;
}
