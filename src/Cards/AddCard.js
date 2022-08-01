import { useState } from "react";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../styles/AddCard.css";

export default function AddCard({ listId, fetchLists }) {
  const [showTextArea, setShowTextArea] = useState(false);
  const [textAreaValue, setTextAreaValue] = useState("");

  const addTextArea = () => {
    if (textAreaValue) {
      fetch(`http://localhost:3001/list/update-list/${listId}/card`, {
        method: "POST",
        body: JSON.stringify({ description: textAreaValue }),
        headers: { "Content-Type": "application/json" },
      }).then(() => fetchLists());
      setTextAreaValue("");
    }
  };

  const hideTextArea = () => {
    setShowTextArea(false);
  };

  const handleClick = () => {
    setShowTextArea(true);
  };

  return showTextArea ? (
    <>
      <textarea
        value={textAreaValue}
        rows={2}
        onChange={(e) => setTextAreaValue(e.target.value)}
      />
      <div style={{ display: "flex" }}>
        <button onClick={addTextArea} className="add-card">
          Add card
        </button>
        <button onClick={hideTextArea}>
          <FontAwesomeIcon icon={faX} />
        </button>
      </div>
    </>
  ) : (
    <button onClick={handleClick}>Add a card</button>
  );
}
