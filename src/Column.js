import Card from "./Card";
import AddCard from "./AddCard";

export default function Column({ title, tickets, setTickets }) {
  return (
    <div
      style={{
        width: "20vw",
        border: "2px solid black",
        padding: "1em",
        backgroundColor: "#ebecf0",
        borderRadius: "5px",
      }}
    >
      <h3>{title}</h3>
      {tickets.map((card) => (
        <Card {...card} />
      ))}
      <AddCard setTickets={setTickets} />
    </div>
  );
}
