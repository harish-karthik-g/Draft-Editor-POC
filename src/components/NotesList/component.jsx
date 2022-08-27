import React from "react";
import Button from "../Button";
import classes from "./style.module.css";

export const NotesList = ({ noteTitles, handleEditClick, modalOpen }) => {
  return (
    <div className={classes.notes__container}>
      {noteTitles.length > 0 ? (
        noteTitles.map(({ title, id }) => (
          <article className={classes.notes__card} key={id}>
            <h1 className={classes.notes__title}>{title}</h1>
            <Button variant="outline" onClick={() => handleEditClick(id)}>
              <i className={`fa-solid fa-pen-to-square`} />
            </Button>
          </article>
        ))
      ) : (
        <p>Please add some notes</p>
      )}
      <div className={classes.notes__action}>
        <Button onClick={modalOpen}>
          add
          <i className="fa-solid fa-plus" />
        </Button>
      </div>
    </div>
  );
};
