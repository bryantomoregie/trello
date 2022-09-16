import { useState } from "react";
import CreateList from "./CreateList";
import "./styles/addList.css";

export default function AddList({ fetchLists }) {
  const [showAddList, setShowAddList] = useState(true);

  return (
    <div className={showAddList ? "add-list" : "list"}>
      {showAddList ? (
        <button onClick={() => setShowAddList(false)}>Add a list</button>
      ) : (
        <CreateList fetchLists={fetchLists} setShowAddList={setShowAddList} />
      )}
    </div>
  );
}
