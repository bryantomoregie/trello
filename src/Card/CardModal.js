import React from "react";
import ReactDOM from "react-dom";

import "./styles/cardModal.css";

export default function CardModal({ setDisplayModal }) {
  return ReactDOM.createPortal(
    <>
      <div
        className="modal__overlay"
        onClick={() => setDisplayModal(false)}
      ></div>
      <div className="modal__card">CardModal</div>
    </>,
    document.getElementById("portal")
  );
}
