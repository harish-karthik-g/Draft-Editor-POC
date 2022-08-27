import React from "react";
import classes from "./style.module.css";
import clsx from "clsx";

export const Button = ({ children, onClick, variant = "fill", classNames }) => {
  const btnClass = clsx([
    classes.button,
    variant === "fill" && classes["button--fill"],
    variant === "outline" && classes["button--outline"],
    classNames,
  ]);
  return (
    <button className={btnClass} onClick={onClick}>
      {children}
    </button>
  );
};
