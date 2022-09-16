import { useState } from "react";
import "./styles/cardEditor.css";

export default function CardEditor({
  title,
  visible,
  setEditTitle,
  index,
  listId,
  fetchLists,
}) {
  const [cardTitle, setCardTitle] = useState(title);

  if (!visible) return null;

  const handleSave = (e) => {
    e.preventDefault();
    setEditTitle(false);
    fetch(`http://localhost:3001/list/update-list/${listId}/card/${index}`, {
      method: "PUT",
      body: JSON.stringify({ description: cardTitle }),
      headers: { "Content-Type": "application/json" },
    }).then(() => fetchLists());
  };

  const updateCardTitle = (value) => {
    setCardTitle(value);
  };

  return (
    <form
      className="card-editor"
      onClick={(e) => e.stopPropagation()}
      onSubmit={handleSave}
    >
      <div className="card-editor__save" onClick={handleSave}></div>
      <div className="card-editor__text-area">
        <textarea
          style={{ width: "100%" }}
          rows={8}
          value={cardTitle}
          onChange={(e) => updateCardTitle(e.target.value)}
          autoFocus
        />
        <button type="submit">Save</button>
      </div>
    </form>
  );
}
