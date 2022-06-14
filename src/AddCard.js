import { useState } from "react";
import "./styles/AddCard.css";

export default function AddCard({ setTickets }) {
  const [showTextArea, setShowTextArea] = useState(false);
  const [textAreaValue, setTextAreaValue] = useState("");

  const addTextArea = () => {
    if (!showTextArea) {
      setShowTextArea(true);
      return;
    }
    if (textAreaValue) {
      const newTicket = { description: textAreaValue };

      setTickets((tickets) => {
        return [...tickets, newTicket];
      });
      setTextAreaValue("");
      setShowTextArea(false);
    }
  };

  return (
    <>
      <textarea
        value={textAreaValue}
        style={{ display: showTextArea ? "block" : "none" }}
        rows={2}
        onChange={(e) => setTextAreaValue(e.target.value)}
      />
      <div className="add-card" onClick={addTextArea}>
        Add a card
      </div>
    </>
  );
}
