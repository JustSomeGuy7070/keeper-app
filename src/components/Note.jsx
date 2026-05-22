import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import PushPinIcon from "@mui/icons-material/PushPin";
import PushPinOutlinedIcon from "@mui/icons-material/PushPinOutlined";
import SaveIcon from "@mui/icons-material/Save";

function Note(props) {
  const { note, onDelete, onPin, onUpdate } = props;
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState({
    title: note.title,
    content: note.content,
  });

  function saveNote() {
    onUpdate(note.id, {
      title: draft.title.trim(),
      content: draft.content.trim(),
    });
    setIsEditing(false);
  }

  function cancelEditing() {
    setDraft({
      title: note.title,
      content: note.content,
    });
    setIsEditing(false);
  }

  function handleChange(event) {
    const { name, value } = event.target;

    setDraft((prevDraft) => {
      return {
        ...prevDraft,
        [name]: value,
      };
    });
  }

  return (
    <article className="note" style={{ backgroundColor: note.color }}>
      <div className="note-actions">
        <button
          aria-label={note.pinned ? "Unpin note" : "Pin note"}
          onClick={() => onPin(note.id)}
          type="button"
        >
          {note.pinned ? <PushPinIcon /> : <PushPinOutlinedIcon />}
        </button>
        {isEditing ? (
          <>
            <button aria-label="Save note" onClick={saveNote} type="button">
              <SaveIcon />
            </button>
            <button aria-label="Cancel editing" onClick={cancelEditing} type="button">
              <CloseIcon />
            </button>
          </>
        ) : (
          <>
            <button
              aria-label="Edit note"
              onClick={() => setIsEditing(true)}
              type="button"
            >
              <EditIcon />
            </button>
            <button
              aria-label="Delete note"
              onClick={() => onDelete(note.id)}
              type="button"
            >
              <DeleteIcon />
            </button>
          </>
        )}
      </div>

      {isEditing ? (
        <div className="note-editor">
          <input
            aria-label="Edit note title"
            name="title"
            onChange={handleChange}
            placeholder="Title"
            value={draft.title}
          />
          <textarea
            aria-label="Edit note content"
            name="content"
            onChange={handleChange}
            placeholder="Note"
            rows="5"
            value={draft.content}
          />
        </div>
      ) : (
        <>
          <h3>{note.title || "Untitled note"}</h3>
          <p>{note.content}</p>
        </>
      )}
    </article>
  );
}

export default Note;
