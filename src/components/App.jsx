import React, { useEffect, useMemo, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";

const STORAGE_KEY = "keeper-notes";

function loadSavedNotes() {
  try {
    const savedNotes = localStorage.getItem(STORAGE_KEY);
    const parsedNotes = savedNotes ? JSON.parse(savedNotes) : [];

    return Array.isArray(parsedNotes) ? parsedNotes : [];
  } catch {
    return [];
  }
}

function createId() {
  if (crypto.randomUUID) {
    return crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function App() {
  const [notes, setNotes] = useState(loadSavedNotes);
  const [query, setQuery] = useState("");

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
  }, [notes]);

  function addNote(newNote) {
    const title = newNote.title.trim();
    const content = newNote.content.trim();

    if (!title && !content) {
      return;
    }

    setNotes((prevNotes) => {
      return [
        {
          id: createId(),
          title,
          content,
          color: newNote.color,
          pinned: false,
          updatedAt: new Date().toISOString(),
        },
        ...prevNotes,
      ];
    });
  }

  function deleteNote(id) {
    setNotes((prevNotes) => {
      return prevNotes.filter((noteItem) => {
        return noteItem.id !== id;
      });
    });
  }

  function updateNote(id, updates) {
    setNotes((prevNotes) => {
      return prevNotes.map((noteItem) => {
        if (noteItem.id !== id) {
          return noteItem;
        }

        return {
          ...noteItem,
          ...updates,
          updatedAt: new Date().toISOString(),
        };
      });
    });
  }

  function togglePinned(id) {
    setNotes((prevNotes) => {
      return prevNotes.map((noteItem) => {
        if (noteItem.id !== id) {
          return noteItem;
        }

        return {
          ...noteItem,
          pinned: !noteItem.pinned,
          updatedAt: new Date().toISOString(),
        };
      });
    });
  }

  const filteredNotes = useMemo(() => {
    const searchTerm = query.trim().toLowerCase();

    return notes
      .filter((noteItem) => {
        if (!searchTerm) {
          return true;
        }

        return `${noteItem.title} ${noteItem.content}`
          .toLowerCase()
          .includes(searchTerm);
      })
      .sort((a, b) => {
        if (a.pinned !== b.pinned) {
          return a.pinned ? -1 : 1;
        }

        return new Date(b.updatedAt) - new Date(a.updatedAt);
      });
  }, [notes, query]);

  return (
    <div className="app-shell">
      <Header />
      <main>
        <section className="workspace-header" aria-label="Notes overview">
          <div>
            <p className="eyebrow">Personal notes</p>
            <h2>Capture ideas before they wander off.</h2>
          </div>
          <div className="stats" aria-label="Note count">
            <strong>{notes.length}</strong>
            <span>{notes.length === 1 ? "note" : "notes"}</span>
          </div>
        </section>

        <CreateArea onAdd={addNote} />

        <section className="toolbar" aria-label="Search notes">
          <input
            aria-label="Search notes"
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search by title or content"
            type="search"
            value={query}
          />
          {query && (
            <button type="button" onClick={() => setQuery("")}>
              Clear
            </button>
          )}
        </section>

        {filteredNotes.length > 0 ? (
          <section className="notes-grid" aria-label="Saved notes">
            {filteredNotes.map((noteItem) => {
              return (
                <Note
                  key={noteItem.id}
                  note={noteItem}
                  onDelete={deleteNote}
                  onPin={togglePinned}
                  onUpdate={updateNote}
                />
              );
            })}
          </section>
        ) : (
          <section className="empty-state" aria-live="polite">
            <h3>{notes.length ? "No matching notes" : "Your board is clear"}</h3>
            <p>
              {notes.length
                ? "Try a different search term or clear the filter."
                : "Add your first thought, task, or reminder above."}
            </p>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
}

export default App;