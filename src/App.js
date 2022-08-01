import { useCallback, useEffect, useState } from "react";
import List from "./Lists/List";
import AddList from "./Lists/AddList";
import "./styles/App.css";
import "./styles/List.css";

function App() {
  const [lists, setLists] = useState([]);

  const fetchLists = useCallback(() => {
    fetch("http://localhost:3001/list", {
      method: "GET",
      credentials: "include",
    })
      .then((data) => data.json())
      .then((data) => setLists(data));
  }, []);

  useEffect(() => {
    fetchLists();
  }, [fetchLists]);

  return (
    <div className="App">
      {lists.map(({ cards, title, _id }) => (
        <List
          key={_id}
          title={title}
          tickets={cards}
          id={_id}
          fetchLists={fetchLists}
        />
      ))}

      <AddList fetchLists={fetchLists} />
    </div>
  );
}

export default App;
