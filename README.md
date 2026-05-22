# 📝 Keeper App

A modern React notes application built with Vite, Material UI, and browser persistence.

Keeper lets users create, search, pin, edit, delete, and color-code notes. Notes are saved in the browser with `localStorage`, so they stay available between sessions.

---

## 🚀 Live Demo

Coming soon.

---

## 📌 Features

- 📝 Create notes with a title and content
- 🎨 Choose a color for each note
- 📌 Pin important notes to the top
- 🔍 Search notes by title or content
- ✏️ Edit existing notes
- 🗑️ Delete notes
- 💾 Save notes permanently with `localStorage`
- 📱 Responsive grid layout
- 🧭 Empty and filtered states
- ♿ Accessible labels for icon-only controls

---

## 🛠️ Tech Stack

- React 19
- Vite 8
- Material UI 9
- JavaScript
- HTML5
- CSS3
- ESLint

---

## ⚙️ How It Works

- React state stores the current notes and search query
- New notes are given stable unique IDs
- Notes are saved to `localStorage` whenever they change
- Saved notes are loaded again when the app opens
- Search filters notes by matching the title or content
- Pinned notes are sorted above regular notes
- Material UI icons provide the note action controls
- Custom CSS handles the responsive portfolio-style layout

---

## 🧰 Local Setup

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm run dev
```

Then open:

```text
http://127.0.0.1:5173/
```

---

## ✅ Quality Checks

Run linting:

```bash
npm run lint
```

Create a production build:

```bash
npm run build
```

Run both checks together:

```bash
npm run check
```

---

## 💡 What I Learned

- Modernizing a React project from an older tutorial-style setup
- Upgrading dependencies across React, Vite, and Material UI
- Using controlled forms for note creation and editing
- Persisting user data with `localStorage`
- Creating stable IDs instead of relying on array indexes
- Filtering and sorting UI data with React state
- Designing a responsive notes layout with custom CSS
- Improving accessibility for icon-only buttons

---

## 👨‍💻 Author

Built as part of my self-taught full-stack development journey.
