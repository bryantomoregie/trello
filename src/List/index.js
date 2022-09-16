import { useState, useEffect } from "react";
import useDropdownMenu from "react-accessible-dropdown-menu-hook";

import { faEllipsis, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Card from "../Card";
import AddCard from "../Card/AddCard";

import "./styles/index.css";

export default function List({ title, tickets, id, fetchLists }) {
  const { buttonProps, itemProps, isOpen, setIsOpen } = useDropdownMenu(1);
  const [showTitleInput, setShowTitleInput] = useState(false);
  const [listTitle, setListTitle] = useState(title);
  const [buttonHover, setButtonHover] = useState(false);

  useEffect(() => {
    setShowTitleInput(false);
    setListTitle(title);
  }, [title]);

  const handleClick = () => {
    fetch(`http://localhost:3001/list/delete-list/${id}`, {
      method: "DELETE",
      credentials: "include",
    }).then(() => fetchLists());
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

  const editTitle = () => {
    setShowTitleInput(true);
  };

  const updateListTitle = (text) => {
    setListTitle(text);
  };

  const editListTitle = async () => {
    await fetch(`http://localhost:3001/list/update-list/${id}`, {
      method: "PUT",
      body: JSON.stringify({ title: listTitle }),
      headers: { "Content-Type": "application/json" },
    });
    setShowTitleInput(false);
    await fetchLists();
  };

  const updateTitle = (e) => {
    if (e.code === "Enter") {
      editListTitle();
    }
  };

  return (
    <div className="list">
      <div className="list__header">
        {showTitleInput ? (
          <input
            value={listTitle}
            onChange={(e) => updateListTitle(e.target.value)}
            onBlur={editListTitle}
            onKeyDown={(e) => updateTitle(e)}
            autoFocus
          />
        ) : (
          <h3 onClick={editTitle}>{title}</h3>
        )}

        <div className="list__actions">
          <button
            className="list__actions__button"
            {...buttonProps}
            onMouseOver={() => setButtonHover(true)}
            onMouseLeave={() => setButtonHover(false)}
            style={{
              backgroundColor: buttonHover ? "#D8D8D8" : "inherit",
            }}
          >
            <FontAwesomeIcon icon={faEllipsis} />
          </button>
          <div
            className="list__actions__options"
            style={{
              display: isOpen ? "block" : "none",
            }}
            role="menu"
          >
            <div style={{ width: 304, textAlign: "center", display: "flex" }}>
              <span style={{ marginLeft: "auto", marginRight: "auto" }}>
                List Actions
              </span>
              <button onClick={closeDropdown}>
                <FontAwesomeIcon icon={faX} />
              </button>
            </div>
            <a
              style={{ cursor: "pointer" }}
              {...itemProps[0]}
              onClick={handleClick}
            >
              Archive this list
            </a>
          </div>
        </div>
      </div>
      {tickets.map((card, index) => (
        <Card
          key={index}
          {...card}
          index={index}
          listId={id}
          fetchLists={fetchLists}
        />
      ))}
      <AddCard listId={id} fetchLists={fetchLists} />
    </div>
  );
}
