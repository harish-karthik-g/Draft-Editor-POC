import React, { useEffect, useState } from "react";
import { NotesList, TextEditor } from "./components";
import { useToggle } from "./hooks";

const App = () => {
  const [modalOpenState, , modalOpen, modalClose] = useToggle();
  const [selectedNoteId, setSelectedNoteId] = useState("");
  const [noteTitles, setNoteTitles] = useState([]);
  const handleEditClick = (id) => {
    setSelectedNoteId(id);
    modalOpen();
  };
  const handleModalClose = () => {
    modalClose();
    setSelectedNoteId("");
  };

  const updateNoteTitles = (title, id) => {
    const updatedNoteTitles = noteTitles.filter((note) => note.id !== id);
    updatedNoteTitles.push({ title, id });
    setNoteTitles(updatedNoteTitles);
  };

  useEffect(() => {
    setNoteTitles(() => {
      const titleAndIds = [];
      for (let count = 0; count < localStorage.length; count++) {
        const id = localStorage.key(count);
        const { title } = JSON.parse(localStorage.getItem(id));
        titleAndIds.push({ id, title });
      }
      return titleAndIds;
    });
  }, []);
  return (
    <>
      <NotesList
        handleEditClick={handleEditClick}
        modalOpen={modalOpen}
        noteTitles={noteTitles}
      />
      <TextEditor
        handleModalClose={handleModalClose}
        selectedNoteId={selectedNoteId}
        modalOpenState={modalOpenState}
        updateNoteTitles={updateNoteTitles}
      />
    </>
  );
};

export default App;
