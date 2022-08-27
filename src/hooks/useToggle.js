import { useCallback, useState } from "react";

const useToggle = (initial = false) => {
  const [open, setOpen] = useState(initial);
  const toggle = useCallback(() => setOpen((prevOpen) => !prevOpen), []);
  const onOpen = useCallback(() => setOpen(true), []);
  const onClose = useCallback(() => setOpen(false), []);
  return [open, toggle, onOpen, onClose];
};

export default useToggle;
