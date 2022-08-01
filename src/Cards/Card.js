import { useState } from "react";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CardEditor from "./CardEditor";
import CardModal from "./CardModal";
import "../styles/Card.css";

export default function Card({ description, index, listId, fetchLists }) {
  const [hovered, setHovered] = useState(false);
  const [iconHovered, setIconHovered] = useState(false);
  const [editTitle, setEditTitle] = useState(false);
  const [displayModal, setDisplayModal] = useState(false);

  const turnHoverOn = () => {
    setHovered(true);
  };

  const turnHoverOff = () => {
    setHovered(false);
  };

  const updateIconHoveredState = () => {
    setIconHovered((boolean) => !boolean);
  };

  const openEditTextArea = (e) => {
    e.stopPropagation();
    setEditTitle(true);
  };

  return (
    <>
      <div
        className="card"
        onClick={() => setDisplayModal(true)}
        onMouseEnter={turnHoverOn}
        onMouseLeave={turnHoverOff}
        style={{
          padding: "1em",
          marginBottom: "1em",
          borderRadius: "5px",
          cursor: "pointer",
          position: "relative",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <strong>{description}</strong>
          {hovered ? (
            <FontAwesomeIcon
              onMouseEnter={updateIconHoveredState}
              onMouseLeave={updateIconHoveredState}
              style={{ backgroundColor: iconHovered ? "#DCDCDC" : "initial" }}
              icon={faPen}
              onClick={openEditTextArea}
            />
          ) : null}
          <CardEditor
            title={description}
            visible={editTitle}
            setEditTitle={setEditTitle}
            index={index}
            listId={listId}
            fetchLists={fetchLists}
          />
        </div>
      </div>
      {displayModal ? <CardModal setDisplayModal={setDisplayModal} /> : null}
    </>
  );
}
