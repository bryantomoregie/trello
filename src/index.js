import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import Login from "./Login/Login";
import Register from "./Register";
import { AuthenticationProvider } from "./Login/AuthenticationProvider";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "./Nav";
import NotFound from "./404";
import ProtectedRoute from "./Login/ProtectedRoute";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthenticationProvider>
        <Nav />
        <Routes>
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/login" element={<Login />} />
          <Route
            exact
            path="/"
            element={
              <ProtectedRoute>
                <App />
              </ProtectedRoute>
            }
          />
          <Route element={<NotFound />} />
        </Routes>
      </AuthenticationProvider>
    </BrowserRouter>
  </React.StrictMode>
);
