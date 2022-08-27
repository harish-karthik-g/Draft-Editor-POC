import { motion } from "framer-motion";
import Backdrop from "./Backdrop";
import classes from "./style.module.css";
import Button from "../Button";

const dropIn = {
  hidden: {
    y: "-100vh",
    opacity: 0,
  },
  visible: {
    y: "0",
    opacity: 1,
    transition: {
      duration: 0.1,
      type: "spring",
      damping: 25,
      stiffness: 500,
    },
  },
  exit: {
    y: "100vh",
    opacity: 0,
  },
};

export const Modal = ({ handleClose, children }) => {
  const handleClick = (event) => {
    event.stopPropagation();
  };
  return (
    <Backdrop onClick={handleClose}>
      <motion.div
        onClick={handleClick}
        className={classes.modal}
        variants={dropIn}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <Button
          classNames={classes.modal__closeButton}
          variant="outline"
          onClick={handleClose}
        >
          <i className="fa-solid fa-xmark"></i>
        </Button>
        {children}
      </motion.div>
    </Backdrop>
  );
};
