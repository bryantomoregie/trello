import { useState } from "react";
import Column from "./Column";

function App() {
  const [tickets, setTickets] = useState([
    { description: "React" },
    { description: "Node" },
  ]);
  return (
    <div className="App">
      <Column title="Study" tickets={tickets} setTickets={setTickets} />
    </div>
  );
}

export default App;
