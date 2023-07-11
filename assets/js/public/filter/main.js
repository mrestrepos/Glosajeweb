import { Filter } from "../../components/index.js";
import { getPath, setLinkStyles } from "../../helpers/navigation.js";
import getFilterOps from "./getFilterOps.js";
import callReducer from "./reducer.js";

const filterOps = {
  componentBodyHTML: async (insert, {filterId, formTypes, target}) => {
    try {
      const request = await fetch(getPath(".html", import.meta.url));
      const HTMLtoText = await request.text();
      const path = location.pathname
      const HTML = HTMLtoText.replace(/id=""/g, `id="${filterId}"`).replace(/action=""/g, `action=${path}`)

      setLinkStyles(import.meta.url)
      insert(HTML);

      const {filtersRequired: price} = await getFilterOps(target, "getMinAndMaxPrice")
      const getPrice = price[0]
      formTypes().forEach(el => {

        const input = el?.querySelector("input")
        if (!input) return
        input.min = getPrice[0]
        input.max = getPrice[1]
        input.oninput = (event) => {
          event.stopPropagation();
          const {target} = event

          target.parentNode.querySelector("#rangeValue").textContent = target.value
        }
      })

    } catch {
      insert("<h2>Hubo un error</h2>");
    }
  },

  initFilter: false
};

const filter = new Filter(filterOps);

export const categoryKeeper = () => filter.getBodyChildren().find(el => el.dataset.type === "selectedCategory")
filter.onContentClick.__current__ = ({dataset, target}, event) => {

  const type = dataset?.type || target.closest("[data-type]")?.dataset?.type
  callReducer({type, target, event, categoryKeeper})
}
