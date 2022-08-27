import React from "react";
import { AnimatePresence } from "framer-motion";
import Modal from "../../Modal";
import Editor from "../Editor";

export const EditorModal = ({
  handleModalClose,
  modalOpenState,
  selectedNoteId,
  updateNoteTitles,
}) => {
  return (
    <AnimatePresence initial={false} exitBeforeEnter={true}>
      {modalOpenState && (
        <Modal handleClose={handleModalClose}>
          <Editor
            selectedNoteId={selectedNoteId}
            updateNoteTitles={updateNoteTitles}
          />
        </Modal>
      )}
    </AnimatePresence>
  );
};
