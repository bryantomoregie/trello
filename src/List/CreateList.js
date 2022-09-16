import { useState } from "react";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function CreateList({ fetchLists, setShowAddList }) {
  const [value, setValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const headers = new Headers({ "Content-Type": "application/json" });

    (async () => {
      try {
        const res = await fetch("http://localhost:3001/list/create-list", {
          method: "POST",
          body: JSON.stringify({ title: value }),
          headers: headers,
          credentials: "include",
        });
        if (res.status !== 200) {
          throw new Error(res.statusText);
        }
        await fetchLists();
        setValue("");
      } catch (err) {
        console.log(err);
      }
    })();
  };

  const handleClick = () => {
    setShowAddList(true);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="title"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        required
      ></input>
      <button value="Add List" type="submit">
        Add list
      </button>
      <button onClick={handleClick} type="button">
        <FontAwesomeIcon icon={faX} />
      </button>
    </form>
  );
}

//formdata
//urlencoded
//json strigifying the body
//cors, calling middleware matters
//useCallback
