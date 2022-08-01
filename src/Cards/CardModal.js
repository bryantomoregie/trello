import React from "react";
import ReactDOM from "react-dom";

export default function CardModal({ setDisplayModal }) {
  return ReactDOM.createPortal(
    <>
      <div
        onClick={() => setDisplayModal(false)}
        style={{
          height: "100vh",
          width: "100vw",
          position: "absolute",
          top: 0,
          left: 0,
          backgroundColor: "rgb(4, 7, 11)",
          opacity: 0.5,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      ></div>
      <div
        style={{
          border: "black 2px solid",
          position: "absolute",
          top: "50%",
          left: "50%",
          height: 100,
          width: 100,
          zIndex: 1000,
          backgroundColor: "black",
          color: "white",
        }}
      >
        CardModal
      </div>
    </>,
    document.getElementById("portal")
  );
}
