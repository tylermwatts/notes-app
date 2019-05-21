import React, { useEffect, useState } from "react";
import NoteForm from "./components/NoteForm";

const App = () => {
  const initialNotes = () => JSON.parse(localStorage.getItem("notes")) || [];
  const [notes, setNotes] = useState(initialNotes);

  const saveToStorage = () => {
    localStorage.setItem("notes", JSON.stringify(notes));
  };

  useEffect(() => {
    window.addEventListener("beforeunload", saveToStorage);
    return () => {
      window.removeEventListener("beforeunload", saveToStorage);
    };
  }, [notes]);

  return <NoteForm notes={notes} setNotes={setNotes} />;
};

export default App;
