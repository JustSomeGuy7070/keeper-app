import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { Fab, Zoom } from "@mui/material";

const NOTE_COLORS = ["#fff8d6", "#e8f7ef", "#e8f0ff", "#ffe9e0", "#f3e8ff"];

function CreateArea(props) {
  const [isExpanded, setExpanded] = useState(false);

  const [note, setNote] = useState({
    title: "",
    content: "",
    color: NOTE_COLORS[0],
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setNote((prevNote) => {
      return {
        ...prevNote,
        [name]: value,
      };
    });
  }

  function submitNote(event) {
    event.preventDefault();

    props.onAdd(note);
    setNote({
      title: "",
      content: "",
      color: NOTE_COLORS[0],
    });
  }

  function expand() {
    setExpanded(true);
  }

  return (
    <div>
      <form className="create-note" onSubmit={submitNote}>
        {isExpanded && (
          <input
            aria-label="Note title"
            name="title"
            onChange={handleChange}
            value={note.title}
            placeholder="Title"
          />
        )}

        <textarea
          aria-label="Note content"
          name="content"
          onClick={expand}
          onFocus={expand}
          onChange={handleChange}
          value={note.content}
          placeholder="Take a note..."
          rows={isExpanded ? 3 : 1}
        />
        {isExpanded && (
          <div className="color-picker" aria-label="Choose note color">
            {NOTE_COLORS.map((color) => {
              return (
                <button
                  aria-label={`Use color ${color}`}
                  className={note.color === color ? "selected" : ""}
                  key={color}
                  onClick={() => setNote({ ...note, color })}
                  style={{ backgroundColor: color }}
                  type="button"
                />
              );
            })}
          </div>
        )}
        <Zoom in={isExpanded}>
          <Fab aria-label="Add note" type="submit">
            <AddIcon />
          </Fab>
        </Zoom>
      </form>
    </div>
  );
}

export default CreateArea;
