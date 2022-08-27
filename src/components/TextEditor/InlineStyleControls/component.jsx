import React from "react";
import clsx from "clsx";
import classes from "./style.module.css";

const INLINE_STYLES = [
  { style: "BOLD", iconClass: "fa-solid fa-bold" },
  { style: "ITALIC", iconClass: "fa-solid fa-italic" },
  { style: "UNDERLINE", iconClass: "fa-solid fa-underline" },
  { style: "CODE", iconClass: "fa-solid fa-code" },
  { style: "STRIKETHROUGH", iconClass: "fa-solid fa-strikethrough" },
];

export const InlineStyleControls = (props) => {
  const currentStyle = props.editorState.getCurrentInlineStyle();
  return (
    <div className="RichEditor-controls">
      {INLINE_STYLES.map((type) => (
        <button
          key={type.style}
          className={clsx([
            classes.editorToggle,
            currentStyle.has(type.style) && classes["editorToggle--active"],
          ])}
          onClick={() => props.onToggle(type.style)}
        >
          <i className={type.iconClass} />
        </button>
      ))}
    </div>
  );
};
