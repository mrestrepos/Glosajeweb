// import {useSignalJs} from "../helpers/index.js";
import useSignalJs from "../../helpers/useSignalJs.js";
import { setLinkStyles } from "../../helpers/navigation.js";

const CloseButton = () => {
  const button = document.createElement("button");
  button.classList.add("hoverAnimation", "onCloseButton")
  button.textContent = "X";

  setLinkStyles(import.meta.url);

  const onClose = useSignalJs({});

  button.onclick = (event) => {
    event.stopPropagation()
    onClose.current = {
      ...onClose.current,
      event,
      type: "close"
    };
  };

  return {
    onClose,
    button
  };
};

export default CloseButton;
