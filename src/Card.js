export default function Card({ description }) {
  return (
    <div
      style={{
        padding: "1em",
        backgroundColor: "white",
        marginBottom: "1em",
        borderRadius: "5px",
      }}
    >
      <strong>{description}</strong>
    </div>
  );
}
