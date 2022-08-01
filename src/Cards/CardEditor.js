import { useState } from "react";

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
    <form onClick={(e) => e.stopPropagation()} onSubmit={handleSave}>
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, .7)",
          zIndex: 1000,
        }}
        onClick={handleSave}
      ></div>
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 1000,
          width: "100%",
        }}
      >
        <textarea
          style={{ width: "100%" }}
          rows={4}
          value={cardTitle}
          onChange={(e) => updateCardTitle(e.target.value)}
          autoFocus
        />
        <button type="submit">Save</button>
      </div>
    </form>
  );
}
