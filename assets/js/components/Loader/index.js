import { setLinkStyles } from "../../helpers/navigation.js";

setLinkStyles(import.meta.url)
const Loader = {
    loader: (target, position = "afterbegin") => {
        let spinner = "<div class='component-loader'></div>";

        return target.insertAdjacentHTML(position, spinner);
    },

    hideLoader: (parentTarget) => {
        let child = parentTarget?.querySelector(".component-loader");

        if (child) {
            parentTarget?.removeChild(child);
        }
        else {
            child = document.querySelector(".component-loader");
            child.remove();

        }
    },
}

export default Loader;