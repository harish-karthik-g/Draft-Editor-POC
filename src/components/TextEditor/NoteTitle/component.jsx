import React from "react";
import classes from "./style.module.css";

export const NoteTitle = ({ title, noteTitleChange }) => {
  return (
    <div className={classes.title__inputContainer}>
      {title.length < 1 && (
        <label htmlFor="noteTitle" className={classes.title__inputLabel}>
          Please enter the title
        </label>
      )}
      <input
        className={classes.title__input}
        value={title}
        type="text"
        onChange={noteTitleChange}
        name="noteTitle"
        id="noteTitle"
      />
    </div>
  );
};
